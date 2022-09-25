import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import KeycloakService from './services/KeycloakService';

class App extends Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  render() {
    console.log(KeycloakService.getToken());
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {KeycloakService.isLoggedIn()
            ? <button className="btn btn-lg btn-warning" onClick={() => KeycloakService.doLogout()}>Logout</button>
            : <button className="btn btn-lg btn-warning" onClick={() => KeycloakService.doLogin()}>Login</button>
          }
        </header>
      </div>
    );
  }

}

export default App;
