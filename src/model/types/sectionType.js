import PropTypes from "prop-types";
import { HeroType, comoFuncionaType, sobreType, cadastrarType, casoSucessoType } from "model";

const sectionType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  link: PropTypes.string,
  texto: PropTypes.string,
  inverse: PropTypes.bool,
  heroData: HeroType,
  comoFuncionaData: PropTypes.arrayOf(comoFuncionaType),
  sobreData: sobreType,
  cadastrarData: cadastrarType,
  casoSucessoData: casoSucessoType
});

export default sectionType;
