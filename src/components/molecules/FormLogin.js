import * as React from 'react';
import { Avatar, Button, Box, Typography, Container, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link as RouterLink} from "react-router-dom";
import useAuth from 'hooks/useAuth';

import AlertDialogSlide from "components/atoms/AlertDialogSlide";

export default function FormLogin() {

  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const isLogged = await login(data.get('email'), data.get('password'));
    if (!isLogged){
      setOpenModal(true);
      setTituloModal("Falha ao realizar o loginho.");
      setSubtituloModal("Por favor, verifique o usuário e senha se estão corretos");
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

  /**
   * Fim
   */

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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              inputProps={{ style: { textTransform: "uppercase" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar-me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>

            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to="/forget" variant="body2">
                  Esqueceu a Senha?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/#cadastrar" variant="body2">
                  {"Não tem conta? Cadastrar-se"}
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
}