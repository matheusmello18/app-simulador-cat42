import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import  { Card, Box, Container, Tabs, Tab, Typography, Chip, Divider, Grid, Paper, Button } from '@mui/material';
import { StepLabel, Step, Stepper } from '@mui/material';

import { allEtapaType } from "model";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{width:'75%'}}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Etapa = ({dataEtapas}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [etapas, setEtapas] = React.useState(dataEtapas);
  const [value, setValue] = React.useState(0);
  
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    dataEtapas[activeStep].DS_STATUS = 'SUCESSO';
    setEtapas(dataEtapas);
    setValue(activeStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //--------------------------------------------//

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setEtapas(dataEtapas);
  }, [dataEtapas])

  return (
    <>
      <Container sx={{py:4}}>        
        <Card sx={{margin:0}}>
          <Divider sx={{my: 3}}>
            <Chip label="Importações" />
          </Divider>
        </Card>


        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {etapas.map((etapa, index) => {
              const stepProps = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              
              return (
                <Step key={index}  {...stepProps}>
                  <StepLabel>{etapa.DS_ETAPA}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === etapas.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button onClick={handleNext}>
                  {activeStep === etapas.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>


        <Grid container spacing={2} sx={{mt: 3}}>
          <Grid item xs={4}>
            <Paper>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
              >
                {etapas !== null && 
                  (etapas.map((etapa, index) => {
                    return (<Tab key={index} label={etapa.DS_ETAPA} {...a11yProps(index)} disabled={etapa.DS_STATUS === 'SUCESSO'} />)
                  }))
                }
              </Tabs>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper>
              {etapas !== null && 
                (etapas.map((etapa, index) => {
                  return (

                    <TabPanel key={index} value={value} index={index}>
                      {etapa.DS_ACAO}

                      <Button onClick={() => {handleClickTeste(index)}} >Testar</Button>
                    </TabPanel>
                    
                  )
                }))
              }
            </Paper>
          </Grid>
        </Grid>
      </Container> 
    </>
  )
};

Etapa.defaultProps = {
  dataEtapas: {}
}

Etapa.propTypes = {
  dataEtapas: allEtapaType.isRequired
}

export default Etapa;