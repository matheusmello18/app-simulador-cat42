import React from 'react';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import Section from "components/atoms/Section";
import { sectionType } from "model";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "18px",
  },
  displayImage:{
    width:"80px",
    height: "80px",
    padding: "18px",
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


const Portifolio = (props) => {
  const { sectionData } = props;
  const classes = useStyles();

  return (
    <Section {...props} id={sectionData.link} texto={sectionData.texto} inverse={sectionData.inverse}>
      
      <Grid container justifyContent="center" alignItems="center">
        {sectionData.casosSucessoData.map((item) => (
          <Card key={item.id} className={classes.root}>
            <CardActionArea target="_blank" href={item.site}>
              <CardMedia
                component="img"
                alt={item.alt}
                height="140"
                image={item.image} 
                title={item.nome} 
              />
              <CardContent>
                <Typography gutterBottom variant="h6" >
                {item.author}
                </Typography>
                <Button target="_blank" href={item.site} size="small" color="primary">
                  {item.nome}
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

Portifolio.defaultProps = {
  sectionData: {},
};

Portifolio.propTypes = {
  sectionData: sectionType,
};

export default Portifolio;
