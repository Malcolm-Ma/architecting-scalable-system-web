import ReactDOM from 'react-dom/client';
import './index.css';
import React from "react";
import { Provider } from 'react-redux';
import Layout from "src/layout";
import store from 'src/reducer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
