import PropTypes from "prop-types";

const submenuType = PropTypes.shape({
  text: PropTypes.string,
  icone: PropTypes.string,
  to: PropTypes.string,
  disabled: PropTypes.bool
})

const menuType = PropTypes.shape({
  titulo: PropTypes.string,
  disabled: PropTypes.bool,
  submenus: PropTypes.arrayOf(submenuType)
});

const menusType = PropTypes.shape({
  menus: PropTypes.arrayOf(menuType)
});

export default menusType;
