import PropTypes from "prop-types";

const userType = PropTypes.shape({
  ID_SIMUL_CADASTRO: PropTypes.number,
  DT_CADASTRO: PropTypes.string,
  NM_EMPRESA: PropTypes.string,
  NR_CNPJ: PropTypes.string,
  NM_CONTATO: PropTypes.string,
  NR_TELEFONE: PropTypes.string,
  DS_EMAIL: PropTypes.string,
  ID_ORGAO: PropTypes.number,
  DS_ORGAO: PropTypes.string,
  DM_ATIVO_SIMULADOR: PropTypes.string,
  DT_PERIODO: PropTypes.string,
  ID_USUARIO: PropTypes.number,
  NM_COMPLETO: PropTypes.string,
  E_MAIL: PropTypes.string,
  NM_USUARIO: PropTypes.string,
  DM_ATIVO_USUARIO: PropTypes.string,
  HASH_RECOVERY: PropTypes.string,
  ID_EMPRESA: PropTypes.number,
});

export default userType;