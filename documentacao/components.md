# Instalação de components

## `Styles`

[https://styled-components.com/](https://styled-components.com/)

```sh
# yarn add styled-components
```

## `Storybook`

[https://storybook.js.org/](https://storybook.js.org/)

```sh
# npx sb init
```

## `Router-Dom`

```sh
# yarn add react-router-dom
```

## `React-Router`

Para Transforma o component em Link usar em SPA (Single Page Application)

```sh
# yarn add history react-router-dom@next
```

> Este comando esta sendo utilizado para pegar a versão V6-Beta quando sair a versão v6 oficial o comando passa a ser **# yarn add react-router**

Extensão no vs-code [https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)

## `Storybook dependência`

### `knobs`

```sh
# yarn add @storybook/addon-knobs
```

### `links`

```sh
# yarn add @storybook/addon-links
```

### `viewport`

```sh
# yarn add @storybook/addon-viewport
```

### `config main.js do storybook`

Na raíz do projeto o arquivo **main.js** encontra na pasta _.storybook_ \
Adicionar na tag addons

```json
  "@storybook/addon-links",
  {
    name: "@storybook/addon-docs",
    options: {
      configureJSX: true,
    },
  },
  "@storybook/addon-knobs",
```

> Nota: Qualquer addon instalado precisa incluir nesta tag

### `config previews.js do storybook`

Na raíz do projeto o arquivo **previews.js** encontra na pasta _.storybook_

```r
const viewports = {
  extraSmall: {
    name: "Portrait phone (default)",
    styles: {
      width: "360px",
      height: "640px",
    },
  },
  small: {
    name: "Landscape phone (sm)",
    styles: {
      width: "640px",
      height: "360px",
    },
  },
  medium: {
    name: "Tablet (md)",
    styles: {
      width: "768px",
      height: "1024px",
    },
  },
  large: {
    name: "Desktop (lg)",
    styles: {
      width: "1024px",
      height: "1366px",
    },
  },
  extraLarge: {
    name: "Large Desktop (xl)",
    styles: {
      width: "1280px",
      height: "800px",
    },
  },
};

addParameters({
  viewport: {
    viewports,
  },
});
```

## `history`

[https://www.npmjs.com/package/history](https://www.npmjs.com/package/history)

```sh
# yarn add history
```

## `prop-types`

[https://www.npmjs.com/package/prop-types](https://www.npmjs.com/package/prop-types)

```sh
# yarn add prop-types
```

## `prettier`

[https://prettier.io/](https://prettier.io/)

```sh
# yarn add --dev --exact prettier
```

> Configurar: No vscode: File -> Preference -> Settings -> Aba Workspace -> Search by formatonsave -> check Format On Save -> Pronto!

Extensão no vs-code [https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## `SVG Cli`

Vamos usar este componente para transformar um svg em um component svg

```sh
# yarn add @svgr/cli
```

- Criar a pasta **draws** dentro da pasta _src_

- Adicionar no _package.json_ em **scripts**

```
"svg": "svgr --icon --replace-attr-values '#ffc107=currentColor' -d src/draws/"
```

> Obs.: A cor #ffc107 que esta sendo para replace, podemos alterar conforme vem o svg ou manter este cor quando buscar no unDraw.co

**usando**

```sh
# yarn svg svg/file.svg
```

## `faker`

São **dados falsos** para auxiliar em montar seus teste.

**Exemplo nodejs**

```node
## Nomear o arquivo como 'products.js'

const faker = require("faker");

const buildProductList = (size) => {
  const result = [];

  for (let i = 0; i < size; i++) {
    result.push({
      id: i +1,
      image: faker.image.imageUrl(),
      title: faker.commerce.productName(),
      summary: faker.commerce.productDescription(),
      slang: faker.lorem.slug(),
    })
  }

  return result;
}

console.log(JSON.stringify(buildProductList(20), null, "  "));  // null, "  " são parametros para deixar o json formatado
```

**usar**

```
# node products.js > products.json
```

## `jest-styled-components`

```sh
# yarn add jest-styled-components"
```

## `helmet`

utiliza para colocar as tags de meta, link e title

```sh
# yarn add react-helmet"
```

## `icons`

utiliza obter os icones. Site [https://react-icons.github.io/react-icons/](https://react-icons.github.io/react-icons/) tem exemplo de como ser utilizado. \
Icones que existem [https://react-icons.github.io/react-icons/icons?name=fa](https://react-icons.github.io/react-icons/icons?name=fa)

```sh
# yarn add react-icons"
```

## `jsconfig.json`

Criar o arquivo **jsconfig.json** na raíz do projeto e incluir o comando abaixo.

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

> React entende em seu import from a pasta inicial será a partir do "src"

## `Material-UI`

```sh
# yarn add @material-ui/core
# yarn add @material-ui/icons
# yarn add @material-ui/lab
```

> Nota: vou substituir o bootstrap pelo material-ui, pq deu muito erro na instalação do bootstrap.

## `ClassNames`

```sh
# yarn add classnames
```

## `Redux`

Armazena os states em um unico store para o site todo. [https://redux.js.org/](https://redux.js.org/)

```sh
# yarn add redux react-redux
```

### `Como usar`

**Exemplo de criação do store.** Para cada _case_ irá montar seu logica para armazenar sua variável.

```js
import { createStore } from "redux";

const gamerReducer = (state = { isActive: false }, action) => {
  switch (action.type) {
    case "SELECT_CARD":
      return {
        ...state,
        isActive: !state.isActive,
      };
    default:
      return state;
  }
};

const store = createStore(gamerReducer);

export default store;
```

**Configurando para toda a aplicação**

```js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider as ReduxProvider } from "react-redux";

import Routes from "../Routes";
import store from "../../store";

const App = () => (
  <ReduxProvider store={store}>
    <>
      <CssBaseline></CssBaseline>
      <Router>
        <Routes></Routes>
      </Router>
    </>
  </ReduxProvider>
);
export default App;
```

**Usando o store**

> Neste exemplo o active muda de true para false a cada click

```js
import React from "react";
import { Board, Card } from "../../components";
import { connect } from "react-redux";

const GamePage = ({ isActive, onCardClick }) => (
  <Board>
    <Card name="Matheus" isActive={isActive} onClick={onCardClick}></Card>
  </Board>
);

const mapStateToProps = (state) => ({
  isActive: state.isActive,
});

const mapDispatchToProps = (dispatch) => ({
  onCardClick: () => {
    dispatch({
      type: "SELECT_CARD",
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
```

### `DevTools do Redux para o Chrome`

**Redux DevTools Chrome Extension**

Rezalizar a instalação da Extensão do Redux DevTools no Chrome. [https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=pt-BR](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=pt-BR)

**Configurar no projeto a Extensão do Redux DevTools**

```sh
# yarn add redux-devtools-extension
```

# Extesion vs-code

## `auto complete tag html`

Auto Rename Tag
[https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)

## `dracula offcial`

Theme de cor com constraste muito bom.
[https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)

## `editorConfig`

No site [https://editorconfig.org/](https://editorconfig.org/) tem as configurações que podem ser realizadas

EditorConfig para vs-code
[https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

> Configuração: Criar o arquivo ".editorconfig" na raíz do projeto

```
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js}]
charset = utf-8
```

## `Lorem ipsum`

[https://marketplace.visualstudio.com/items?itemName=Tyriar.lorem-ipsum](https://marketplace.visualstudio.com/items?itemName=Tyriar.lorem-ipsum)

> Usage: F1 -> escrever: Lorem + Enter

## `MDX`

Para o vs-code entender o mdx igual o md arquivo.
[https://marketplace.visualstudio.com/items?itemName=silvenon.mdx](https://marketplace.visualstudio.com/items?itemName=silvenon.mdx)

## `Icones do vs-code`

Theme do vs-code
[https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

## `Text Mask`

Site do component Text Mask com exemplo
[https://text-mask.github.io/text-mask/](https://text-mask.github.io/text-mask/)

Repositório com a documentação
[https://github.com/text-mask/text-mask](https://github.com/text-mask/text-mask)

### `Intalação`

```sh
# yarn add react-text-mask
```
