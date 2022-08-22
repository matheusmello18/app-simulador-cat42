//import PropTypes from "prop-types";
import { Button, Chip, Container, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MD5 from "crypto-js/md5";
import axios from 'utils/axios';
import {Stack, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { userType } from "model";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserEdit = ({user}) => {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [msgAlert, setmsgAlert] = React.useState('');
  const [severidadeAlert, setseveridadegAlert] = React.useState('');

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const [nome, setNome] = React.useState(user.NM_CONTATO);
  const [empresa, setEmpresa] = React.useState(user.NM_EMPRESA);
  const [telefone, setTelefone] = React.useState(user.NR_TELEFONE);

  const [senhaAtual, setSenhaAtual] = React.useState('');
  const [senhaNova, setSenhaNova] = React.useState('');

  const handleChangeTelefone = (event) => {
    setTelefone(event.target.value);
  };

  const handleChangeNome = (event) => {
    setNome(event.target.value);
  };

  const handleChangeEmpresa = (event) => {
    setEmpresa(event.target.value);
  };

  const handleChangeSenhaAtual = (event) => {
    setSenhaAtual(event.target.value);
  };

  const handleChangeSenhaNova = (event) => {
    setSenhaNova(event.target.value);
  };

  const handleSaveDadosUsuario = async () => {
    if (senhaAtual === senhaNova){
      setmsgAlert('Senha atual é igual a senha nova. Por favor, modifique a senha nova.');
      setseveridadegAlert('error');
      setOpenAlert(true);
      return;
    }

    let calcSenhaSistema = ''
    let calcSenhaWeb = ''
    let calcSenhaWebAtual = ''

    if (senhaAtual.length > 0 && senhaNova.length > 0){
      calcSenhaSistema = MD5(user.NM_USUARIO.toUpperCase() + senhaNova).toString().slice(0, 10).toLowerCase();
      calcSenhaWeb = MD5(senhaNova).toString();
      calcSenhaWebAtual = MD5(senhaAtual).toString();
    }

    var data = {
      ID_USUARIO: user.ID_USUARIO,
      E_MAIL: user.E_MAIL,
      NM_USUARIO: user.NM_USUARIO,
      ID_SIMUL_CADASTRO: user.ID_SIMUL_CADASTRO,
      NM_CONTATO: nome,
      NM_EMPRESA: empresa,
      NR_TELEFONE: telefone,
      senhaSistema: calcSenhaSistema,
      senhaWeb: calcSenhaWeb, 
      senhaWebAtual: calcSenhaWebAtual
    };

    const response = await axios.post('/api/v1/cliente/edit', data);
    if (response.data.success === 'true'){
      setmsgAlert('Dados alterado com sucesso!');
      setseveridadegAlert('success');
      setSenhaNova('');
      setSenhaAtual('');
      user = response.data.user;
    }else{
      setmsgAlert(response.data.message);
      setseveridadegAlert('error');
    }

    setOpenAlert(true);
  }

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
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Typography component="h1" variant="h4" align="left" sx={{mb: 4}}>
                Dados do Usuário
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="nome_contato"
                    name="nome_contato"
                    label="Nome do Contato"
                    type="text"
                    fullWidth
                    value={nome}
                    defaultValue={nome}
                    onChange={handleChangeNome}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="nome_empresa"
                    name="nome_empresa"
                    label="Nome da Empresa"
                    type="text"
                    fullWidth
                    value={empresa}
                    defaultValue={empresa}
                    onChange={handleChangeEmpresa}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="cnpj"
                    name="cnpj"
                    label="CNPJ"
                    type="text"
                    fullWidth
                    disabled
                    defaultValue={user.NR_CNPJ}
                    value={user.NR_CNPJ}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="E-mail"
                    type="email"
                    fullWidth
                    value={user.DS_EMAIL}
                    defaultValue={user.DS_EMAIL}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="telefone"
                    name="telefone"
                    label="Telefone"
                    value={telefone}
                    onChange={handleChangeTelefone}
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} mt={2}>
                  <Divider>
                    <Chip label="Trocar a senha" />
                  </Divider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="senha"
                    name="senha"
                    label="Senha Atual"
                    type="password"
                    fullWidth
                    value={senhaAtual}
                    onChange={handleChangeSenhaAtual}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="nova_senha"
                    name="nova_senha"
                    label="Nova Senha"
                    type="password"
                    fullWidth
                    value={senhaNova}
                    onChange={handleChangeSenhaNova}
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={() => {handleSaveDadosUsuario()}}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Enviar
                </Button>
              </Box>

            </Paper>
          </Container>
        </Box>
      </Box>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={severidadeAlert} sx={{ width: '100%' }}>
            {msgAlert}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

UserEdit.defaultProps = {
  user: {},
}

UserEdit.propTypes = {
  user: userType.isRequired,
}

export default UserEdit;