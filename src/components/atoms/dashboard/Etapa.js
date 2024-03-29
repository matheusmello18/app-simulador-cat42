import React from "react";
import PropTypes from 'prop-types';

import { Card, Box, Container, Tabs, Tab, Typography, Chip, Divider, Grid, Paper } from '@mui/material';
import { Button, TextField , FormControl, FormHelperText } from '@mui/material';
import { StepLabel, Step, Stepper } from '@mui/material';
import { List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { Fade, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import AlertDialogSlide from "components/atoms/AlertDialogSlide";
import { allEtapaType, userType } from "model";
import { EnviarArquivo } from "hooks/EnviarArquivo";
import { SolicitaGeracao } from "hooks/SolicitaGeracao";
import config from 'config';

const columns = [
  {
    field: 'CD_PRODUTO',
    headerName: 'Código Produto',
    width: 150,
    hide: true
  },
  {
    field: 'CD_STATUS',
    headerName: 'Cód. Status',
    width: 110,
    hide: true
  },
  {
    field: 'DS_PRODUTO',
    headerName: 'Produto',
    width: 440,
  },
  {
    field: 'DS_STATUS',
    headerName: 'Desc. Status',
    width: 110,
  },
  {
    field: 'DT_STATUS',
    headerName: 'Dt. Status',
    width: 110,
    hide: true
  },
  { 
    field: 'ID_PRODUTO', 
    headerName: 'ID',
    type: 'number',
    width: 90,
    identity: true,
    hide: true
  },
  {
    field: 'ID_SIMUL_ETAPA',
    headerName: 'Id. Etapa',
    type: 'number',
    width: 110,
    hide: true
  },
  {
    field: 'ID_SIMUL_TP_STATUS',
    headerName: 'Tp Status',
    type: 'number',
    width: 110,
    hide: true
  }
];

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

const Etapa = ({dataEtapas, user, setEtapas}) => {
  /**
   * variaveis relacionados ao modal
   */
   const [openModal, setOpenModal] = React.useState(false);
   const [tituloModal, setTituloModal] = React.useState('');
   const [subtituloModal, setSubtituloModal] = React.useState('');
   const [loading, setLoading] = React.useState(false);
   const handleCloseModal = () => {
     setOpenModal(false);
   }

  const [uploadFile, setUploadFile] = React.useState('');
  const [uploadFileRequered, setUploadFileRequered] = React.useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const [value, setValue] = React.useState(0);

  const handleClickGerar = async (etapa) => {
    setLoading((prevLoading) => !prevLoading);

    var envio = await SolicitaGeracao(etapa.ID_SIMUL_ETAPA, user.ID_EMPRESA, user.ID_USUARIO, user.DT_PERIODO, user.NR_CNPJ, etapa.NM_METHOD, etapa.NM_PROCEDURE1, etapa.NM_PROCEDURE2, user.ID_ORGAO, user.ID_PROJETO, user.ID_MODULO);
    console.log(envio);
    const { success, message, row } = envio.data;

    setLoading((prevLoading) => !prevLoading);

    if (success === 'false'){
      setOpenModal(true);
      setTituloModal("Falha no processamento.");
      setSubtituloModal(message);
    } else {
      setOpenModal(true);
      setTituloModal("Processamento.");
      setSubtituloModal(message);
    }

    //etapa.DS_STATUS = 'PENDENCIA';
    const newEtapas =  [...dataEtapas];
 
    if (row !== null) {
      newEtapas[activeStep] = row;
      setEtapas(newEtapas);
    }

  }

  const handleClickEnviar = async (etapa) => {
    setUploadFileRequered('')
    if (uploadFile.length === 0){
      setUploadFileRequered('Preenchimento Obrigatório')
      return;
    }

    setLoading((prevLoading) => !prevLoading);

    var envio = await EnviarArquivo(etapa.ID_SIMUL_ETAPA, uploadFile, user.ID_EMPRESA, user.ID_USUARIO, user.DT_PERIODO, user.NR_CNPJ, etapa.NM_METHOD, etapa.NM_PROCEDURE1, etapa.NM_PROCEDURE2, user.ID_ORGAO, user.ID_PROJETO, user.ID_MODULO);
    const { success, message, row } = envio.data;

    setLoading((prevLoading) => !prevLoading);

    if (success === 'false'){
      setOpenModal(true);
      setTituloModal("Falha no processamento.");
      if (message.name !== undefined)
        setSubtituloModal(message.message);
      else
        setSubtituloModal(message);
    } else {
      setOpenModal(true);
      setTituloModal("Processamento.");
      setSubtituloModal(message);
    }

    //etapa.DS_STATUS = 'PENDENCIA';
    const newEtapas =  [...dataEtapas];
 
    if (row !== null) {
      newEtapas[activeStep] = row;
      setEtapas(newEtapas);
      setUploadFile('');
      setUploadFileRequered('');
      document.getElementById('outlined-basic').value = null;
    }
    
  }
  
  const handleNext = (e, etapa) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setValue((prevActiveStep) => prevActiveStep + 1);
  };

  //--------------------------------------------//

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setActiveStep(newValue);
  };

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


  React.useEffect(() => {
    const load = () => {
      setActiveStep((prevActiveStep) => prevActiveStep);
      setValue((prevActiveStep) => prevActiveStep);
      
      /*dataEtapas.forEach((element, index) => {
        if (element.DS_STATUS === 'SUCESSO'){
          setActiveStep(activeStep);
          setValue(activeStep);
        }
      });*/
    }

    load();
  }, [dataEtapas]); 


  return (
    <>
      <Container sx={{py:4}}>        
        <Card sx={{margin:0}}>
          <Divider sx={{my: 3}}>
            <Chip label={user.DS_ORGAO} />
          </Divider>
        </Card>


        <Box sx={{ width: '100%', pt:4 }}>
          <Stepper activeStep={activeStep}>
          {dataEtapas !== null && (
            dataEtapas.map((etapa, index) => {
                

                return (
                  <Step key={index}>
                    <StepLabel></StepLabel>
                  </Step>
                );
              })
            )}
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
                {dataEtapas !== null && 
                  (dataEtapas.map((etapa, index) => {
                    return (
                      <Tab 
                        key={index} 
                        label={<Typography variant="button" display="block" gutterBottom>
                                 {etapa.DS_ETAPA}
                               </Typography>}
                        icon= {etapa.DS_STATUS === 'SUCESSO'   ? (<CheckCircleOutlineIcon />) : 
                               etapa.DS_STATUS === 'ERRO'      ? (<HighlightOffIcon />) : 
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
              {dataEtapas !== null && 
                (dataEtapas.map((etapa, index) => {
                  let ableBtnEnviar = true; //desabilita
                  //let ableBtnEnviar = false; //habilita

                  if (etapa.DS_STATUS !== 'SUCESSO'){
                    ableBtnEnviar = false;
                    if (index > 0){
                      ableBtnEnviar = true;
                      if (dataEtapas[index-1].DS_STATUS === 'SUCESSO')
                        ableBtnEnviar = false;
                    }
                  }
                  if (etapa.DM_ACAO_ARQUIVO === 'D'){
                    return (
                      <React.Fragment key={index}>
                        <Paper>
                          <TabPanel value={value} index={index}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                            </Paper>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                              <Box sx={{ flex: '1 1 auto' }} />
                              <Button 
                                variant="contained" 
                                onClick={() => handleClickGerar(etapa)}
                                disabled={ableBtnEnviar} >Gerar
                              </Button>
                            </Box>
                          </TabPanel>
                        </Paper>

                        {etapa.STATUS.length > 0 && (
                          <TabPanel value={value} index={index}>
                            <Paper sx={{px: 3, py: 2}}>
        
                              <Divider sx={{mb: 3}}>
                                <Chip label="Status da Importação" />
                              </Divider>
                            
                              <Paper sx={{px: 3, py: 2}} variant="outlined">
                                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                  {etapa.STATUS.map((pStatus, pIndex) => (
                                    <React.Fragment key={pIndex}>
                                      <ListItem>
                                        <ListItemAvatar>
                                          {etapa.DS_STATUS === 'SUCESSO' ? (<CheckCircleOutlineIcon sx={{color: `success.light`}} />) : 
                                            etapa.DS_STATUS === 'ERRO'    ? (<HighlightOffIcon sx={{color: `error.light`}} />)         : 
                                                                              (<ErrorOutlineIcon sx={{color: `warning.light`}} />)}
                                        </ListItemAvatar>
                                        <ListItemText primary={pStatus.DS_TAREFA} secondary={"".concat("Data status: ",pStatus.DT_LOG)} />
                                      </ListItem>
                                      <Divider variant="inset" component="li" />
                                    </React.Fragment>
                                  ))}
                                </List>
                              </Paper>
                            
                            </Paper>
                          </TabPanel>
                        
                        )}
                      </React.Fragment>
                    )
                  } else {
                    return (
                      <React.Fragment key={index}>
                        <Paper>
                          <TabPanel value={value} index={index}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                              <div>
                                <FormControl fullWidth>
                                  <TextField  
                                    type="file" 
                                    id="outlined-basic" 
                                    label="Selecionar Arquivo"
                                    onChange={(e) => setUploadFile(e.target.files)} 
                                    focused
                                    aria-describedby={`component-error-text-${index}`}
                                  />
                                  <FormHelperText id={`component-error-text-${index}`} sx={{color: 'red'}}>{uploadFileRequered}</FormHelperText>
                                </FormControl>
                              </div>
                            </Paper>

                            {activeStep !== dataEtapas.length && (
                              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                
                                {etapa.NM_METHOD === 'ImportarArqExcel' && (
                                  <Button
                                    href= {`${config.baseUrlApi}/api/v1/etapas/download/?arquivo=${etapa.NM_METHOD}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    variant="contained"
                                    sx={{mr:2}}
                                  >Planilha Modelo
                                  </Button>
                                )}

                                <Box sx={{ height: 40, paddingRight: "15px" }}>
                                  <Fade
                                    in={loading}
                                    style={{
                                      transitionDelay: loading ? '800ms' : '0ms',
                                    }}
                                    unmountOnExit
                                  >
                                    <CircularProgress />
                                  </Fade>
                                </Box>

                                <Button 
                                  variant="contained" 
                                  onClick={() => handleClickEnviar(etapa)}
                                  disabled={ableBtnEnviar} 
                                > {loading ? 'Enviando' : 'Enviar'}
                                </Button>
                                <Button 
                                  variant="outlined" 
                                  onClick={(e) => handleNext(e, etapa)}
                                  sx={{ml:2}}
                                  disabled={etapa.DS_STATUS !== 'SUCESSO'}
                                > Próximo
                                </Button>

                              </Box>
                            )}
                          </TabPanel>
                        </Paper>

{/*
a lista abaixo aparecer para dm_lista_prod = n
montar a lista de produtos que terá seu próprios estatus
*/}
                        {etapa.DM_LISTA_PROD === 'S' && (
                          <TabPanel value={value} index={index}>
                            <Paper>
                              <div style={{ height: 400, width: '100%', pt: 1 }}>
                                <DataGrid
                                  rows={etapa.PRODS}
                                  columns={columns}
                                  pageSize={5}
                                  rowsPerPageOptions={[5]}
                                  getRowId={(row) => row.ID_PRODUTO}
                                  //onSelectionModelChange // GridSelectionModel
                                  //selectionModel //GridSelectionModel
                                />
                              </div>
                            </Paper>
                          </TabPanel>
                        )}

                        {etapa.STATUS.length > 0 && (
                          <TabPanel value={value} index={index}>
                            <Paper sx={{px: 3, py: 2}}>
        
                              <Divider sx={{mb: 3}}>
                                <Chip label="Status da Importação" />
                              </Divider>
                            
                              <Paper sx={{px: 3, py: 2}} variant="outlined">
                                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                  {etapa.STATUS.map((pStatus, pIndex) => (
                                    <React.Fragment key={pIndex}>
                                      <ListItem>
                                        <ListItemAvatar>
                                          {etapa.DS_STATUS === 'SUCESSO' ? (<CheckCircleOutlineIcon sx={{color: `success.light`}} />) : 
                                            etapa.DS_STATUS === 'ERRO'    ? (<HighlightOffIcon sx={{color: `error.light`}} />)         : 
                                                                              (<ErrorOutlineIcon sx={{color: `warning.light`}} />)}
                                        </ListItemAvatar>
                                        <ListItemText primary={pStatus.DS_TAREFA} secondary={"".concat("Data status: ",pStatus.DT_LOG)} />
                                      </ListItem>
                                      <Divider variant="inset" component="li" />
                                    </React.Fragment>
                                  ))}
                                </List>
                              </Paper>
                            
                            </Paper>
                          </TabPanel>
                        
                        )}
                      </React.Fragment>
                    )
                  }
                }))
              }
            </>
          </Grid>
        </Grid> 
      </Container>

      <AlertDialogSlide 
        onClose={handleCloseModal}
        titulo={tituloModal}
        subtitulo={subtituloModal}
        open={openModal}
      />
    </>
  )
};

Etapa.defaultProps = {
  dataEtapas: {},
  user: {},
  setEtapas: null
}

Etapa.propTypes = {
  dataEtapas: allEtapaType.isRequired,
  user: userType.isRequired,
  setEtapas: PropTypes.func
}

export default Etapa;