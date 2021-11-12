import React from "react";
import { NavBarTools, NavBar, Hero, ComoFunciona, SobreNos, CadastroCliente, Portifolio, FooterMain } from "components";
import { homeType } from "model";

const Home = ({homeData}) => {

  const listItem = homeData.sectionsDatas.map((section) => {
    if (section.heroData !== undefined) {
      return <Hero key={section.id} sectionData={section}></Hero>;
    } else if (section.comoFuncionaData !== undefined) {
      return <ComoFunciona key={section.id} sectionData={section}></ComoFunciona>;
    } else if (section.sobreData !== undefined){
      return <SobreNos key={section.id} sectionData={section}></SobreNos>;
    } else if (section.cadastrarData !== undefined){
      return <CadastroCliente key={section.id} sectionData={section}></CadastroCliente>;
    } else if (section.casosSucessoData !== undefined){
      return <Portifolio key={section.id} sectionData={section}></Portifolio>;
    } else {
      return <></>;
    }  
  });
  
  return (
    <>
      <NavBar navBarData={homeData.navBarData}></NavBar>
      <NavBarTools navBarToolsData={homeData.navBarToolsData} />
      {listItem}
      <FooterMain footData={homeData.footData}></FooterMain>
    </>
  )
};

Home.defaultProps = {
  homeData: {},
};

Home.propTypes = {
  homeData: homeType.isRequired,
}

export default Home;
