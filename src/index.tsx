import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, html{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  :root{
  --bg-color: red;
  --text-color: white;
}

.dark__mode{
  --bg-color:  black;
  --text-color: white;
}

.normal__mode{
  --bg-color: red;
  --text-color: white;
}

`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
