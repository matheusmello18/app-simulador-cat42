import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import GlobalStyle from 'components/styles/GlobalStyle';

import Routes from "routes";

import data from "model/builders/fixtures/metatag.json";

import {UserProvider} from "context/UserContext";

let theme = createTheme();

function App() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle metaData={data} />
        <CssBaseline />
        
        <UserProvider>
          <Router>
            <Routes></Routes>
          </Router>
        </UserProvider>
      </ThemeProvider>
    );
}

export default App;
