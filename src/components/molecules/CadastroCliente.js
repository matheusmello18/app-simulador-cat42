import React from "react";
import PropTypes from "prop-types";
import MaskedInput from 'react-text-mask';
import {Typography, Box, TextField } from '@material-ui/core';
import Axios from "axios";

import {Section, Button} from "components";
import { sectionType } from "model";

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
      Axios.post('http://localhost:8081/api/v1/cliente/add', {
      //Axios.post('https://matilab.com.br/api/v1/cliente/index.php', {
        nome_contato: values.nome_contato,
        nome_empresa: values.nome_empresa,
        email: values.email,
        telefone: values.telefone,
        cnpj: values.cnpj
      })
      .then(function (response) {
        console.log(response);
        alert("Obrigado em breve entraremos em contato");
        //setValues({ ...{}});
      })
      .catch(function (error) {
        alert("Falha na transmissão");
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
              defaultValue={values[input.field]}              
              variant="outlined"
              fullWidth
              style={{marginBottom:"16px"}}
              {...((erros[input.field] !== "" && erros[input.field] !== undefined) && {error:true, helperText: erros[input.field]})}
            />
          );
        }
      })}

      </form>
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
