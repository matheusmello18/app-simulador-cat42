import PropTypes from "prop-types";

const NavBarType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  email: PropTypes.string,
  telefone: PropTypes.string,
  facebook: PropTypes.string,
  linkedin: PropTypes.string,
  instagram: PropTypes.string
});

export default NavBarType;
