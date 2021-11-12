import PropTypes from "prop-types";

const metaType = PropTypes.shape({
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogTitle: PropTypes.string,
  ogImage: PropTypes.string,
  ogSiteName: PropTypes.string,
  ogDescription: PropTypes.string,
  ogLocale: PropTypes.string,
  title: PropTypes.string,
});

export default metaType;
