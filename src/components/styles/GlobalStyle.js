import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';

import { BreakpointSize, breakAt } from "components/styles/Breakpoints";
import { metaType } from "model";

export const GlobalStyle = createGlobalStyle`  
  html{    
    font-family: "Open Sans",sans-serif;
    font-weight: 300;
    font-size: 100%;
    color: #212121;
    box-sizing: border-box;
  }

  *, *:before, *:after{
    box-sizing: inherit;
  }

  body{
    margin: 0;
  }

  h1, h2, h3, h5, h6 {
    line-height: 1.3;
    font-weight: 700;
    letter-spacing: 2px;
  }
  h1 {
    font-size: 2.5rem;
    ${breakAt(BreakpointSize.lg)} {
      font-size: 3.75rem;
    }
  }
  h2 {
    font-size: 2rem;
    ${breakAt(BreakpointSize.lg)} {
      font-size: 3.125rem;
    }
  }
  h3 {
    font-size: 1.9rem;
    ${breakAt(BreakpointSize.lg)} {
      font-size: 2.5rem;
    }
  }
  h4 {
    font-size: 1.3rem;
    font-weight: 600;
    ${breakAt(BreakpointSize.lg)} {
      font-size: 2.125rem;
    }
  }
  h5 {
    font-size: 1.2rem;
    font-weight: 300;
    ${breakAt(BreakpointSize.lg)} {
      font-size: 1.5rem;
    }
  }
  h6 {
    font-size: 1.1rem;
    font-weight: 600;
    ${breakAt(BreakpointSize.lg)} {
      font-size: 1.25rem;
    }
  }  
`;


const GlobalStyleComposed = (props) => {
  const { metaData } = props;
  return (
    <>
      <GlobalStyle />
      <Helmet>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <meta property="og:title" content={metaData.ogTitle} />
        <meta property="og:image" content={metaData.ogImage} />
        <meta property="og:site_name" content={metaData.ogSiteName} />
        <meta property="og:description" content={metaData.ogDescription} />
        <meta property="og:locale" content={metaData.ogLocale} />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,400italic,600,600italic,700,700italic,800,800italic,300italic|Lato:400,100,100italic,300,300italic,400italic,700,700italic,900,900italic" rel="stylesheet" />
        <title>{metaData.title}</title>
      </Helmet>
    </>
  );
};

GlobalStyleComposed.propTypes = {
  metaData: metaType.isRequired,
}

export default GlobalStyleComposed;
