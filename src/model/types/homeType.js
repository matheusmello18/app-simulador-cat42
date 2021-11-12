import PropTypes from "prop-types";
import NavBarType from "./NavBarType";
import NavBarToolsType from "./NavBarToolsType";
import sectionType from "./sectionType";
import footType from "./footType";

const homeType = PropTypes.shape({
  navBarData: NavBarType,
  navBarToolsData: NavBarToolsType,
  sectionsDatas: PropTypes.arrayOf(sectionType),
  footData: footType
});

export default homeType;
