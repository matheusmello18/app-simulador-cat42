import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import  { Card, Box, Container, Tabs, Tab, Typography, Chip, Divider, Grid, Paper, Button } from '@mui/material';
import { StepLabel, Step, Stepper } from '@mui/material';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
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
  
  const [etapas, setEtapas] = React.useState(dataEtapas);
  const [value, setValue] = React.useState(0);
  

  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    dataEtapas[activeStep].DS_STATUS = 'SUCESSO';
    setEtapas(dataEtapas);
    setValue(activeStep + 1);
  };

/*  const handleReset = () => {
    setActiveStep(0);
  };
  */

  //--------------------------------------------//

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
/**
 * <Box
  sx={{
    // some styles
    '& . ChildSelector': {
      bgcolor: 'primary.main',
    },
  }}
>
 */
  const SxbyStatus = (etapa) => {
    if (etapa.DS_STATUS === 'SUCESSO'){
      return {
        '&.Mui-selected': {
          color: `success.light`
        },
        color: `success.light`,
        justifyContent: 'flex-start',
        alignItems: `flex-start`
      };
    } else if (etapa.DS_STATUS === 'ERRO'){
      return {
        '&.Mui-selected': {
          color: `error.light`
        },
        color: `error.light`,
        justifyContent: 'flex-start',
        alignItems: `flex-start`
      };      
    } else if (etapa.DS_STATUS === 'PENDENCIA'){
      return {
        '&.Mui-selected': {
          color: `warning.light`
        },
        color: `warning.light`,
        justifyContent: 'flex-start',
        alignItems: `flex-start`
      };
    } else {
      return {
        '&.Mui-selected': {
          color: `info.light`
        },
        color: `info.light`,
        justifyContent: 'flex-start',
        alignItems: `flex-start`
      };
    }
  }

  useEffect(() => {
    const load = () => {
      dataEtapas.forEach((element, index) => {
        if (element.DS_STATUS === 'SUCESSO'){
          setActiveStep(index + 1);
          setValue(index  + 1);
        }
      });
    }

    setEtapas(dataEtapas);
    load();
  }, [dataEtapas])

  return (
    <>
      <Container sx={{py:4}}>        
        <Card sx={{margin:0}}>
          <Divider sx={{my: 3}}>
            <Chip label="Importações" />
          </Divider>
        </Card>


        <Box sx={{ width: '100%', pt:4 }}>
          <Stepper activeStep={activeStep}>
            {etapas.map((etapa, index) => {
              const stepProps = {};

              return (
                <Step key={index}  {...stepProps}>
                  <StepLabel></StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>


        <Grid container spacing={2} sx={{mt: 3}}>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
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
                    return (
                      <Tab 
                        key={index} 
                        label={<Typography variant="button" display="block" gutterBottom>
                                 {etapa.DS_ETAPA}
                               </Typography>}
                        icon= {etapa.DS_STATUS === 'SUCESSO' ? (<CheckCircleOutlineIcon />) : 
                          etapa.DS_STATUS === 'ERRO' ? (<HighlightOffIcon />) : 
                          etapa.DS_STATUS === 'PENDENCIA' ? (<ErrorOutlineIcon />) : (<PlayCircleOutlineIcon sx={{color:"info.light"}} />)}
                        iconPosition="start"
                        sx={SxbyStatus(etapa)}
                        {...a11yProps(index)} 
                      />
                    )
                  }))
                }
              </Tabs>
            </Paper>
          </Grid>
          
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
            <>
              {activeStep === etapas.length && (
                <Paper><h1>Finalizou com sucesso fora</h1></Paper>
              )}
              <Paper>
                {etapas !== null && 
                  (etapas.map((etapa, index) => {
                    return (
                      <TabPanel key={index} value={value} index={index}>
                        <Typography>{etapa.DS_ACAO}</Typography>

                        {activeStep === etapas.length ? (<><h1>Finalizou com sucesso dentro</h1></>) : (
                          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button onClick={handleNext}>
                              {activeStep === etapas.length - 1 ? 'Finalizar' : 'Próximo'}
                            </Button>
                          </Box>
                        )}
                      </TabPanel>
                      
                    )
                  }))
                }
              </Paper>
            </>
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