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
  signIn: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
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

  const login = async (usuario, password) => {
    const senha = MD5(usuario.toUpperCase() + password).toString().slice(0, 10).toLowerCase();
    console.log(usuario, password, senha);
    const response = await axios.post('/api/user/login', { usuario: usuario, senha: senha });
    const { success, user } = response.data;
    console.log(response.data);
    if (success === "true"){
      setCookie("usuario", usuario, 1); // 1 dia para expirar
      dispatch({
          type: LOGIN,
          payload: {
              user
          }
      });
    } else {
      console.log('usuario e senha invalido');
    }
  }

  const signIn = async (name, email, password) => {
      const response = await axios.post('/api/user/store', {name, email, password });
      const { user } = response.data;
      setCookie("usuario", email, 1); // 1 dia para expirar
      dispatch({
          type: LOGIN,
          payload: {
              user
          }
      });
  };

  const forgotPassword = async (password) => {

  };

  const logout = () => {
    deleteCookies()
    dispatch({ type: LOGOUT });
  };

  useEffect(() => {
    const init = async () => {
      try {
        if (checkCookie("email")) {
            const response = await axios.post('/api/user/account', {usuario : getCookie("usuario")});
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

  return <UserContext.Provider value={{ ...state, login, logout }}>{children}</UserContext.Provider>;

};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default UserContext;