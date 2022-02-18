import * as React from 'react';
import { Avatar, Button, Box, Typography, Container, CssBaseline, TextField, Link, Grid } from '@mui/material';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import {Link as RouterLink} from "react-router-dom";
import useAuth from 'hooks/useAuth';

import AlertDialogSlide from "components/atoms/AlertDialogSlide";

const FormForget = () => {
  const { forgotPassword } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const isLogged = await forgotPassword(data.get('email'));
    if (isLogged){
      setOpenModal(true);
      setTituloModal("Solicitação realizada com sucesso.");
      setSubtituloModal("Encaminhamos um e-mail com o link de acesso de recuperação de senha.");
      var form = document.getElementById("formForget");
      form.reset();
    } else {
      setOpenModal(true);
      setTituloModal("Falha ao solicitar a recuperação de senha.");
      setSubtituloModal("Não encontramos seu e-mail cadastrado.");
    }
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
            <LockResetOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Recupere sua Senha?
          </Typography>
          <Box component="form" onSubmit={handleSubmit} id="formForget" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              inputProps={{ style: { textTransform: "uppercase" } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Recuperar a senha
            </Button>

            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to="/login" href="#" variant="caption">
                  Voltar ao login
                </Link>
              </Grid>
            </Grid>
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

export default FormForget;