import PropTypes from "prop-types";

const NavBarMenuType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  menu: PropTypes.string,
  link: PropTypes.string
});

const NavBarImageType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.string,
  link: PropTypes.string
});

const NavBarToolsType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  images: PropTypes.arrayOf(NavBarImageType),
  menus: PropTypes.arrayOf(NavBarMenuType)
});

export default NavBarToolsType;
