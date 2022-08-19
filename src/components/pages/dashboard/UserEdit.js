import PropTypes from "prop-types";
import { Button, Chip, Container, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MaskedInput from 'react-text-mask';

import { userType } from "model";


const UserEdit = ({user}) => {
  console.log(user);
  const [nome, setNome] = React.useState(user.NM_CONTATO);
  const [empresa, setEmpresa] = React.useState(user.NM_EMPRESA);
  const [telefone, setTelefone] = React.useState(user.NR_TELEFONE);

  const [senha, setSenha] = React.useState('');
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

  const handleChangeSenha = (event) => {
    setSenha(event.target.value);
  };

  const handleChangeSenhaNova = (event) => {
    setSenhaNova(event.target.value);
  };

  const handleSaveDadosUsuario = () => {
    //const senha = MD5(nm_usuario.toUpperCase() + password).toString().slice(0, 10).toLowerCase();
    //const senhaWeb = MD5(password).toString();
    //const response = await axios.post('/api/v1/user/recovery', {id: id, email: email, senhaWeb: senhaWeb, senha: senha });
    var data = {
      ID_SIMUL_CADASTRO: user.ID_SIMUL_CADASTRO,
      NM_CONTATO: nome,
      NM_EMPRESA: empresa,
      NR_TELEFONE: telefone,
    };

    console.log(data);
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
                    defaultValue={senha}
                    value={senha}
                    onChange={handleChangeSenha}
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
                    defaultValue={senhaNova}
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