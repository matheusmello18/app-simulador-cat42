import PropTypes from "prop-types";

const centralOperacaoType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  endereco: PropTypes.string,
  telefones: PropTypes.string
});

const centralComercialType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  endereco: PropTypes.string,
  telefones: PropTypes.string
});

const footType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  quemSomos: PropTypes.string,
  facebook: PropTypes.string,
  linkedin: PropTypes.string,
  instagram: PropTypes.string,
  centralOperacao: centralOperacaoType,
  centralComercial: centralComercialType
});

export default footType;
