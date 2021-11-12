import PropTypes from "prop-types";

const comoFuncionaType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  texto: PropTypes.string
});

export default comoFuncionaType;
