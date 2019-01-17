import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './store';
import {Provider} from 'react-redux';
import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import sr from 'react-intl/locale-data/sr';
import {localeSet} from './actions/locale';
import App from './components/App';
import 'bootstrap';
import './index.scss';
import './main.css';

addLocaleData(en);
addLocaleData(sr);

if (localStorage.boilerLang) {
  store.dispatch(localeSet(localStorage.boilerLang));
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
