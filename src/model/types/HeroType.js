import PropTypes from "prop-types";

const HeroType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  imgText: PropTypes.string,
  linkText: PropTypes.string
});

export default HeroType;
