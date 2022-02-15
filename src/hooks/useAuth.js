import { useContext } from 'react';

// auth provider
 import UserContext from 'context/UserContext';

// ===========================|| AUTH HOOKS ||=========================== //
const useAuth = () => useContext(UserContext);

export default useAuth;
