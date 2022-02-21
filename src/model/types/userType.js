import PropTypes from "prop-types";

const userType = PropTypes.shape({
  DM_ATIVO: PropTypes.string,
  E_MAIL: PropTypes.string,
  HASH_RECOVERY: PropTypes.string,
  ID_USUARIO: PropTypes.number,
  NM_COMPLETO: PropTypes.string,
  NM_USUARIO: PropTypes.string,
});

export default userType;

