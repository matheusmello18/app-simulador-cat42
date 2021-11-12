import PropTypes from "prop-types";

const cadastrarType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  titulo: PropTypes.string,
  texto: PropTypes.string
});

export default cadastrarType;
