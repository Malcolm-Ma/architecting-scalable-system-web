import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from "src/App";
import store from 'src/reducer';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
