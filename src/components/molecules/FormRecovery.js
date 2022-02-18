import  React, { useEffect } from 'react';
import { Avatar, Button, Box, Typography, Container, CssBaseline, TextField, FormHelperText } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { useParams, useNavigate } from "react-router-dom";
import useAuth from 'hooks/useAuth';

import AlertDialogSlide from "components/atoms/AlertDialogSlide";

const FormRecovery = () => {
  const [senha, setSenha] = React.useState('');
  const [resenha, setResenha] = React.useState('');
  const [senhaIguais, setSenhaIguais] = React.useState('');
  const [data, setData] = React.useState({success: "true", user: null});

  const { buscarPorHash, recovery } = useAuth();
  const navigate = useNavigate();
  
  const handleChangeSenha = (event) => {
    setSenha(event.target.value)
  }

  const handleChangeReSenha = (event) => {
    setSenhaIguais("");
    if (senha !== event.target.value)
      setSenhaIguais("As senhas devem serem iguais");
    setResenha(event.target.value)
  }

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const { success } = await recovery(data.user.ID_USUARIO, data.user.E_MAIL, data.user.NM_USUARIO, senha);
    if (success === "true"){
      setOpenModal(true);
      setTituloModal("Solicitação realizada com sucesso.");
      setSubtituloModal("Sua senha foi trocada com sucesso. Você será redirecionado em instantes.");
      await sleep(7000)
      navigate("/login");
    } else {
      setOpenModal(true);
      setTituloModal("Falha ao solicitar a recuperação de senha.");
      setSubtituloModal("Não conseguimos processar a recuperação de senha. Por favor refaça novamente a recuperação de senha.");
    }

    setSenha('')
    setResenha('')
  };

  /**
   * variaveis relacionados ao modal
   */
  const [openModal, setOpenModal] = React.useState(false);
  const [tituloModal, setTituloModal] = React.useState('');
  const [subtituloModal, setSubtituloModal] = React.useState('');
  const handleCloseModal = () => {
    setOpenModal(false);
  }

  let { hash } = useParams();
  
  useEffect(() => {
    const fetchBusca = async () => {
      let {success, user } = await buscarPorHash(hash);
      setData({success, user});
      
      if (success === "false"){
        setOpenModal(true);
        setTituloModal("Falha ao solicitar a recuperação de senha.");
        setSubtituloModal("Sua soliciação foi expirada. Por favor refaça uma nova solicitação.");
      }
    }
    fetchBusca();
    
  }, [hash, buscarPorHash]);



  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8, mb: 8
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Informe sua nova senha
          </Typography>
          <Box component="form" onSubmit={handleSubmit} id="formRecovery" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              type="password"
              label="Nova Senha"
              name="password"
              autoComplete="password"
              onChange={handleChangeSenha}
              value={senha}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="re-password"
              type="password"
              label="Confirmar a Senha"
              name="repassword"
              autoComplete="password"
              onChange={handleChangeReSenha}
              value={resenha}
              autoFocus
            />
            <FormHelperText id="component-helper-text">
              {senhaIguais}
            </FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={data.success === "false"}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Container>

      <AlertDialogSlide 
        onClose={handleCloseModal}
        titulo={tituloModal}
        subtitulo={subtituloModal}
        open={openModal}
      />
    </>
  );  
};


export default FormRecovery;