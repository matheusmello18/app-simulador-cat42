import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import GlobalStyle from 'components/styles/GlobalStyle';

import Routes from "routes";

import data from "model/builders/fixtures/metatag.json";

function App() {
    return (
      <ThemeProvider>
        <GlobalStyle metaData={data} />
        <CssBaseline />
        
        <Router>
          <Routes></Routes>
        </Router>
      </ThemeProvider>
    );
}

export default App;
