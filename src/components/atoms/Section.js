import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Container } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "0"
  },
  paper: {
    backgroundColor: "#2b74a9",
    padding: theme.spacing(4),
    textAlign: 'center',
    color: "#ffa000",
  },
  inverseFalse: {
    backgroundColor: "#fff",
  },
  inverseTrue: {
    backgroundColor: "#f7f7f7",
  }
}));

const Section = (props) => {
  const classes = useStyles();
  const { children, texto, id, inverse } = props;

  return (
    <>
      <section className={classes.root} id={id}>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{paddingBottom: "0"}}>
            <Paper className={classes.paper}>
              <Typography variant="h4">
                {texto}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </section>
      <div className={( inverse ? classes.inverseTrue : classes.inverseFalse )} style={{padding:"38px"}}>
        <Container fixed>
          {children}
        </Container>
      </div>
    </>
  );
};

Section.defaultProps = {
  id: "",
  children: undefined,
  texto: "",
  inverse: false
};

Section.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  texto: PropTypes.string,
  inverse: PropTypes.bool,
};

export default Section;
