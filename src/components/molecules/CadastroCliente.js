import React from "react";
import PropTypes from "prop-types";
import MaskedInput from 'react-text-mask';
import {Typography, Box, TextField } from '@material-ui/core';
import axios from 'utils/axios';

import {Stack, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import {Section, Button} from "components";
import { sectionType } from "model";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TextMaskCNPJ(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}
TextMaskCNPJ.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function TextMaskTelefone(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskTelefone.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const CadastroCliente = (props) => {
  const [alert, setAlert] = React.useState({
    open: false,
    message: '',
    severidade: 'success'
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({...alert, open: false});
  };
  
  const { sectionData } = props;

  const [values, setValues] = React.useState({});

  const [erros, setErros] = React.useState({});

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const validate = () => {
    let objErro = {}
    objErro.nome_contato = values.nome_contato ? "" : "O campo é obrigatório o preenchimento";
    objErro.nome_empresa = values.nome_empresa ? "" : "O campo é obrigatório o preenchimento";
    objErro.email = values.email ? ( (/$^|.*@.*..*/).test(values.email) ? "" : "Valor do e-mail é invalido" ) : "O campo é obrigatório o preenchimento";
    objErro.telefone = values.telefone ? "" : "O campo é obrigatório o preenchimento";
    objErro.cnpj = values.cnpj ? "" : "O campo é obrigatório o preenchimento";

    setErros({...objErro});

    return Object.values(objErro).every(x => x === "");
  }

  const handleClick = (event) => {
    if (validate()){
      axios.post('/api/v1/cliente/add', { // trocar pelo ip externo ou nome do site
      //Axios.post('https://matilab.com.br/api/v1/cliente/index.php', {
        nome_contato: values.nome_contato,
        nome_empresa: values.nome_empresa,
        email: values.email,
        telefone: values.telefone,
        cnpj: values.cnpj
      })
      .then(function (response) {
        setAlert({...alert, open: true, message: response.data.message});

        const newValue = sectionData.cadastrarData.inputs.map((input) => {
          return values[input.field] = '';
        })
        setValues({ ...newValue })
        setErros({...newValue});
        console.log(response);
      })
      .catch(function (error) {
        setAlert({...alert, open: true, message: error.data.message, severidade: 'error'});
        console.log(error);
      });
    } 
    
    //validar - feito
    // enviar
    //pegar resposta
    //limpar
  }


  return (
    <Section {...props} id={sectionData.link} texto={sectionData.texto} inverse={sectionData.inverse}>
      <Box style={{
        padding: "16px",
        textAlign: 'center',
        color: "#2b74a9"
      }}>
        <Typography variant="h5" >{sectionData.cadastrarData.titulo}</Typography>
      </Box>
      <form noValidate autoComplete="off" width="100%" method={sectionData.cadastrarData.form.method} action={sectionData.cadastrarData.form.action}>
      {sectionData.cadastrarData.inputs.map((input) => {
        
        if (input.type === "button"){ 
          return (
            <Box key={input.id} style={{textAlign: 'right'}}>
              <Button onClick={handleClick} variant="contained" color="warning" >{input.label}</Button>
            </Box>)
        } else {
          return (
            <TextField
              key={input.id} 
              id={`outlined-${input.field}`}
              value={values[input.field]}
              onChange={handleChange(input.field)}
              labelWidth={60}
              type={input.type}
              InputProps = {{
                inputComponent: (input.mask === "tel" ? TextMaskTelefone : (input.mask === "cnpj" ? TextMaskCNPJ : "input"))
              }}
              label={input.label}
              variant="outlined"
              fullWidth
              style={{marginBottom:"16px"}}
              {...((erros[input.field] !== "" && erros[input.field] !== undefined) && {error:true, helperText: erros[input.field]})}
            />
          );
        }
      })}

      </form>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={alert.open} autoHideDuration={8000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={alert.severidade} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Stack>
    </Section>
  );
};

CadastroCliente.defaultProps = {
  sectionData: {},
};

CadastroCliente.propTypes = {
  sectionData: sectionType,
};

export default CadastroCliente;
