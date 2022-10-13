import { message, notification } from 'antd';
import CustomError from 'goodvandro-alganews-sdk/dist/CustomError';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthService from '../auth/Authorization.service';
import CashFlowExpensesView from './views/CashFlowExpenses.view';
import CashFlowRevenuesView from './views/CashFlowRevenues.view';
import HomeView from './views/Home.view';
import PaymentCreateView from './views/PaymentCreate.view';
import PaymentDetailsView from './views/PaymentDetails.view';
import PaymentListView from './views/PaymentList.view';
import UserCreateView from './views/UserCreate.view';
import UserDetailsView from './views/UserDetails.view';
import UserEditView from './views/UserEdit.view';
import UserListView from './views/UserList.view';

export default function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    window.onunhandledrejection = ({ reason }) => {
      if (reason instanceof CustomError) {
        if (reason.data?.objects) {
          reason.data.objects.forEach((error) => {
            message.error(error.userMessage);
          });
        } else {
          notification.error({
            message: reason.message,
            description:
              reason.data?.detail === 'Network Error'
                ? 'Erro na rede'
                : reason.data?.detail,
          });
        }
      } else {
        reason?.data?.objects?.forEach((object: { userMessage: string }) => {
          message.error(object.userMessage);
        });

        notification.error({
          message: reason?.message || 'Houve um erro',
        });
      }
    };

    return () => {
      window.onunhandledrejection = null;
    };
  }, []);

  useEffect(() => {
    async function identify() {
      const isInAuthorizationRoute = window.location.pathname === '/authorize';
      const code = new URLSearchParams(window.location.search).get('code');

      const codeVerifier = AuthService.getCodeVerifier();
      const accessToken = AuthService.getAccessToken();

      if (!accessToken && !isInAuthorizationRoute) {
        AuthService.imperativelySendToLoginScreen();
      }

      if (isInAuthorizationRoute) {
        if (!code) {
          notification.error({
            message: 'Código não foi informado',
          });
          return;
        }

        if (!codeVerifier) {
          // necessário fazer logout
          return;
        }

        // busca o primeiro token de acesso
        const { access_token, refresh_token } =
          await AuthService.getFirstAccessToken({
            code,
            codeVerifier,
            redirectUri: 'http://localhost:3000/authorize',
          });

        AuthService.setAccessToken(access_token);
        AuthService.setRefreshToken(refresh_token);

        navigate('/');
      }
    }

    identify();
  }, [navigate]);

  return (
    <Routes>
      <Route path={'/'} element={<HomeView />} />
      <Route path={'/users'} element={<UserListView />} />
      <Route path={'/users/create'} element={<UserCreateView />} />
      <Route path={'/users/edit/:id'} element={<UserEditView />} />
      <Route path={'/users/:id'} element={<UserDetailsView />} />
      <Route path={'/payments'} element={<PaymentListView />} />
      <Route path={'/payments/create'} element={<PaymentCreateView />} />
      <Route path={'/payments/:id'} element={<PaymentDetailsView />} />
      <Route path={'/cash-flow/expenses'} element={<CashFlowExpensesView />} />
      <Route path={'/cash-flow/revenues'} element={<CashFlowRevenuesView />} />
    </Routes>
  );
}
