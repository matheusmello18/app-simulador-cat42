
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent,
  TimelineOppositeContent, TimelineDot } from '@material-ui/lab';
import { Paper, Box, Typography } from '@material-ui/core';

import RepeatIcon from '@material-ui/icons/Repeat';
import SvgUndrawSpreadsheetReCn18 from "draws/UndrawSpreadsheetReCn18";
import SvgUndrawAddFileReS4Qf from "draws/UndrawAddFileReS4Qf";
import SvgUndrawDataProcessingYrrv from "draws/UndrawDataProcessingYrrv";
import SvgUndrawServerStatus5Pbv from "draws/UndrawServerStatus5Pbv";
import SvgUndrawSuccessFactorsReCe93 from "draws/UndrawSuccessFactorsReCe93";
import SvgUndrawFinishLineKaterinaLimpitsouniXy20 from "draws/UndrawFinishLineKaterinaLimpitsouniXy20";

import Section from "components/atoms/Section";
import Button from 'components/atoms/Button';
import { sectionType } from "model";


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  primaryTail: {
    backgroundColor: theme.palette.primary.main,
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  imageContainer: {
    textAlign: "right",
  },
  svg: {
    width:"100%",
    height: "auto",
    maxWidth:"300px",
    minWidth:"100px",
    color: "#ffa000"
  }
}));

const ComoFunciona = (props) => {
  const { sectionData } = props;
  const classes = useStyles();
  

  return (
    <Section {...props} id={sectionData.link} texto={sectionData.texto} inverse={sectionData.inverse}>
      <Timeline align="alternate">
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textPrimary">
              Importar planilha dos produtos que serão analisados
            </Typography>
          </TimelineOppositeContent>

          <TimelineSeparator>
            <TimelineDot color="primary">
              <RepeatIcon />
            </TimelineDot>
            <TimelineConnector className={classes.primaryTail} />
          </TimelineSeparator>

          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography component="h4">
                Importar Produtos
              </Typography>
              <Box>
                <div className={classes.imageContainer}>
                  <SvgUndrawSpreadsheetReCn18 className={classes.svg} />
                </div>
              </Box>
            </Paper>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textPrimary">
              Importar Sped Fiscal do Período
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <RepeatIcon />
            </TimelineDot>
            <TimelineConnector className={classes.primaryTail}/>
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography component="h4">
                Importar Sped
              </Typography>
              <Box>
                <div className={classes.imageContainer}>
                  <SvgUndrawAddFileReS4Qf className={classes.svg} />
                </div>
              </Box>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textPrimary">
              Importar XML's: Cupons, NF Saída e Entrada
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <RepeatIcon />
            </TimelineDot>
            <TimelineConnector className={classes.primaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography component="h4">
                Importar Notas Fiscais
              </Typography>
              <Box>
                <div className={classes.imageContainer}>
                  <SvgUndrawDataProcessingYrrv className={classes.svg} />
                </div>
              </Box>
            </Paper>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textPrimary">
              Gerar a CAT42
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <RepeatIcon />
            </TimelineDot>
            <TimelineConnector className={classes.primaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography component="h4">
                Processando
              </Typography>
              <Box>
                <div className={classes.imageContainer}>
                  <SvgUndrawServerStatus5Pbv className={classes.svg} />
                </div>
              </Box>
            </Paper>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textPrimary">
              Relatório com valores da simulação
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <RepeatIcon />
            </TimelineDot>
            <TimelineConnector className={classes.primaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography component="h4">
                Relatório
              </Typography>
              <Box>
                <div className={classes.imageContainer}>
                  <SvgUndrawSuccessFactorsReCe93 className={classes.svg} />
                </div>
              </Box>
            </Paper>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textPrimary">
              Você chegou lá! Realize o seu cadastro e faça uma analise do seu crédito! <br/>
              <Button href="#cadastrar" color="warning" variant="contained">Cadastre</Button>
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <RepeatIcon />
            </TimelineDot>
            <TimelineConnector className={classes.primaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography component="h4">
                Sucesso!
              </Typography>
              <Box>
                <div className={classes.imageContainer}>
                  <SvgUndrawFinishLineKaterinaLimpitsouniXy20 className={classes.svg} />
                </div>
              </Box>
            </Paper>
          </TimelineContent>
        </TimelineItem>

      </Timeline>
    </Section>
  )
};

ComoFunciona.defaultProps = {
  sectionData: {},
};

ComoFunciona.propTypes = {
  sectionData: sectionType.isRequired,
};

export default ComoFunciona;
