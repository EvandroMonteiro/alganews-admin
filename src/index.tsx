import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import moment from 'moment';
import 'moment/locale/pt-br';
import DefaultLayout from './app/layouts/Default/Default.layout';
import AppRoutes from './app/routes';
import { store } from './core/store';
import reportWebVitals from './reportWebVitals';

import './index.less';

moment.locale('pt-br');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <Provider store={store}>
        <BrowserRouter>
          <DefaultLayout>
            <AppRoutes />
          </DefaultLayout>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
