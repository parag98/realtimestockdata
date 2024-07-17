import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';

const MyApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default MyApp;
