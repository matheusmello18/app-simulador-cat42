import React from "react";
import { Box, Paper, Typography } from '@material-ui/core';
import { sectionType } from "model";
import Section from "components/atoms/Section";

const SobreNos = (props) => {
  const { sectionData } = props;

  return (
    <Section {...props} id={sectionData.link} texto={sectionData.texto} inverse={sectionData.inverse}>
      <Box style={{
        padding: "16px",
        textAlign: 'center',
        color: "#2b74a9"
      }}>
        <Typography variant="h5">{sectionData.sobreData.titulo}</Typography>
      </Box>
      <Paper elevation={3} style={{
        padding: "16px",
        textAlign: 'left',
        color: "#000"
      }}> 
        <p style={{fontSize:"0.975rem", fontWeight:"400", padding:"0"}} dangerouslySetInnerHTML= {{__html: sectionData.sobreData.texto}}></p> 
      </Paper>
    </Section>
  )
};

SobreNos.defaultProps = {
  sectionData: {}
};

SobreNos.propTypes = {
  sectionData: sectionType,
};

export default SobreNos;
