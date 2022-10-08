import ReactDOM from 'react-dom/client';
import React from "react";
import { Provider } from 'react-redux';
import {BrowserRouter} from "react-router-dom";

import Layout from "src/layout";
import store from 'src/reducer';

import './index.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
