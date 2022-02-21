import React from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { sectionType } from "model";

const useStyles = makeStyles((theme) => ({
  Hero: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  HeroContent: {
    position: 'relative',
    
    padding: theme.spacing(6),
    paddingLeft: "0",
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
}));

const Hero = (props) => {
  const classes = useStyles();
  const { sectionData } = props;

  return (
    <Paper id={sectionData.link} className={classes.Hero} style={{ backgroundImage: `url(${sectionData.heroData.image})`, marginBottom: "0" }}>
      <div className={classes.overlay} />
      <Container fixed>
        <Grid container>
          <Grid item md={8}>
            <div className={classes.HeroContent}>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {sectionData.heroData.title} {}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {sectionData.heroData.description}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

Hero.defaultProps = {
  sectionData: {},
};

Hero.propTypes = {
  sectionData: sectionType,
};

export default Hero;
