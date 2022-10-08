import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import KeycloakService from './services/KeycloakService';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);

const renderApp = () => {

}
// Initialize keycloak
KeycloakService.initKeycloak(renderApp);
