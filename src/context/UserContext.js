import React, {createContext, useEffect, useReducer } from "react";
import PropTypes from 'prop-types';
import Loader from 'components/atoms/Loader';
import MD5 from "crypto-js/md5";

import axios from 'utils/axios';

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
}

const setCookie = function (cname, cvalue, exdays){
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookies() {
  var allCookies = document.cookie.split(';');
  // The "expire" attribute of every cookie is 
  // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
  for (var i = 0; i < allCookies.length; i++)
      document.cookie = allCookies[i] + "=;expires="+ new Date(0).toUTCString();
}

const getCookie = function (cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(cname) {
  let value = getCookie(cname);
  if (value !== "") {
    return true;
  } else {
    return false;
  }
}


const UserContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  recovery: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
  buscarPorHash: () => Promise.resolver(),
  logout: () => {}
});

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ACCOUNT_INITIALIZE = 'ACCOUNT_INITIALIZE';

const accountReducer = (state, action) => {
    switch (action.type) {
        case ACCOUNT_INITIALIZE: {
            const { isLoggedIn, user } = action.payload;
            return {
                ...state,
                isLoggedIn,
                isInitialized: true,
                user
            };
        }
        case LOGIN: {
            const { user } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                user
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        }
        default: {
            return { ...state };
        }
    }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  const login = async (email, password) => {
    const senha = MD5(password).toString();
    const response = await axios.post('/api/v1/user/login', { email: email, senha: senha });
    const { success, user } = response.data;

    if (success === "true"){
      setCookie("email", email, 1); // 1 dia para expirar
      dispatch({
          type: LOGIN,
          payload: {
              user
          }
      });
      return true;
    }
    
    return false;    
  }

  const recovery = async (id, email, nm_usuario, password) => {
    const senha = MD5(nm_usuario.toUpperCase() + password).toString().slice(0, 10).toLowerCase();
    console.log(nm_usuario.toUpperCase(), password, senha);
    const senhaWeb = MD5(password).toString();
    const response = await axios.post('/api/v1/user/recovery', {id: id, email: email, senhaWeb: senhaWeb, senha: senha });
    const { success, user } = response.data;
    if (success === "true"){
      setCookie("email", email, 1); // 1 dia para expirar
    } 
    return { success, user };
    
  };

  const buscarPorHash = async (hash) => {
    const response = await axios.post('/api/v1/user/hash', {hash:hash});
    return response.data;
};

  const forgotPassword = async (email) => {
    const response = await axios.post('/api/v1/user/forget', {email: email });
    const { success } = response.data;

    if (success === "true")
      return true;
    
    return false;
  };

  const logout = () => {
    deleteCookies()
    dispatch({ type: LOGOUT });
  };

  useEffect(() => {
    const init = async () => {
      try {
        if (checkCookie("email")) {
          const response = await axios.post('/api/v1/user/account', {email : getCookie("email")});
          const { user } = response.data;
          dispatch({
              type: ACCOUNT_INITIALIZE,
              payload: {
                  isLoggedIn: true,
                  user
              }
          });
        } else {
          dispatch({
              type: ACCOUNT_INITIALIZE,
              payload: {
                  isLoggedIn: false,
                  user: null
              }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
            type: ACCOUNT_INITIALIZE,
            payload: {
                isLoggedIn: false,
                user: null
            }
        });
      }
    };

    init();
  }, []);

  if (!state.isInitialized) {
    return <Loader />;
  }

  return <UserContext.Provider value={{ ...state, login, logout, forgotPassword, recovery, buscarPorHash }}>{children}</UserContext.Provider>;

};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default UserContext;