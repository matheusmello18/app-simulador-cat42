import React from "react";
//import PropTypes from "prop-types";

//import MenuDashboardChildren from "components/atoms/dashboard/DashboardChildren"
import { allEtapaType, userType } from "model";
import { Grid, Paper, Container, Box, Typography, 
         Button } from "@mui/material";
import { useNavigate  } from "react-router-dom";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent,
  TimelineOppositeContent, TimelineDot } from "@mui/lab";


import BusinessIcon from '@mui/icons-material/Business';
import { Check, Clear, Pause } from "@mui/icons-material";

import {green, orange, red} from '@material-ui/core/colors';


const DashboardChildren = ({dataEtapas, user}) => {
  console.log(user);
  let navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: 'flex'}}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
            <Grid container spacing={0}>
              {/* titulo */}
              <Grid item xs={12} md={12} lg={12} sx={{mb:4}}>
                <Paper sx={{p:2}}>
                  <Typography component="h2" variant="h6" sx={{ pl: 0 }} gutterBottom>
                    Dashboard
                  </Typography>
                </Paper>
              </Grid>
              {/* Bem vindo */}
              <Grid item xs={12} md={12} lg={12} sx={{mb:4}}>
                <Typography variant="h4" sx={{ pl: 0 }} gutterBottom>
                  Bem-vindo, {user.NM_CONTATO}
                </Typography>
              </Grid>
              {/* Chart */}
              <Grid item xs={12} md={4} lg={4} sx={{mb:4}}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <BusinessIcon color="action" />
                  <Typography variant="caption" sx={{fontWeight: '600'}} gutterBottom>
                  {user.NM_EMPRESA}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    CNPJ: {user.NR_CNPJ}
                  </Typography>
                </Paper>
              </Grid>

              {/* Chart 
              <Grid item xs={12} md={12} lg={12} sx={{mb:4}}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                  }}
                >
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Andamento da Geração Cat-42
                  </Typography>
                                
                  <Table size="small" sx={{mb:4}}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{fontWeight: 600}}>Etapa</TableCell>
                        <TableCell sx={{fontWeight: 600}}>Ação</TableCell>
                        <TableCell sx={{fontWeight: 600}}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataEtapas.map((row) => (
                        <TableRow key={row.DM_SEQUENCIA}>
                          <TableCell>{row.DS_ETAPA}</TableCell>
                          <TableCell>{row.DS_ACAO}</TableCell>
                          <TableCell>{row.DS_STATUS}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>        
                  <Button variant="outlined" onClick={() => { navigate("/dashboard/etapa") }}>Ir para Geração</Button>         
                </Paper>
              </Grid>
              */}
              {/* Time Line */}
              <Grid item xs={12} md={12} lg={12} sx={{mb:4}}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Linha do Tempo - Geração Cat-42
                  </Typography>

                  <Timeline align="left">
                    {dataEtapas.map((row) => {
                      let my_color;
                      if (row.DS_STATUS === 'SUCESSO')
                        my_color = green[500];
                      else if (row.DS_STATUS === 'PENDENCIA')
                        my_color = orange[500];
                      else
                        my_color = red[500];

                      return (
                        <TimelineItem>

                          <TimelineOppositeContent>
                            <Typography  variant="h6" color="textPrimary">
                              {row.DS_ETAPA}
                            </Typography>
                          </TimelineOppositeContent>

                          <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot sx={{bgcolor: (my_color)}}>
                              {row.DS_STATUS === 'SUCESSO' ? (<Check />) : 
                              row.DS_STATUS === 'PENDENCIA' ? (<Pause />) : (<Clear />)}
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>

                          <TimelineContent sx={{ py: '35px', px: 2 }}>
                              <Typography variant="subtitle1">
                                {row.DS_ACAO}
                              </Typography>
                          </TimelineContent>
                          
                        </TimelineItem>
                      )
                    })}
                  </Timeline>
                  
                  <Button variant="outlined" onClick={() => { navigate("/dashboard/etapa") }}>Ir para Geração</Button>         
                </Paper>
              </Grid>
              {/* Recent Orders */}
              {/*<Grid item xs={12} sx={{mb:4}}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>*/}
            </Grid>
          </Container>
        </Box>
      </Box>
      {/*<Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={3}>
              Bem vindo
            </Paper>
          </Grid>
        </Grid>
      </Container>*/}
   
    </>
  )
};

DashboardChildren.defaultProps = {
  dataEtapas: {},
  user: {},
  //setDashboardChildrens: null //para uma função
}

DashboardChildren.propTypes = {
  dataEtapas: allEtapaType.isRequired,
  user: userType.isRequired,
  //setDashboardChildrens: PropTypes.func // para uma função
}

export default DashboardChildren;