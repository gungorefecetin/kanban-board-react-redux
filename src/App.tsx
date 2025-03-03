import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Board from './components/Board';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f9fafc;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Board />
    </Provider>
  );
}

export default App;
