import { message, notification } from 'antd';
import CustomError from 'goodvandro-alganews-sdk/dist/CustomError';
import jwtDecode from 'jwt-decode';
import React, { Suspense, useEffect, useMemo } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Authentication } from '../auth/Auth';
import AuthService from '../auth/Authorization.service';
import useAuth from '../core/hooks/useAuth';
import GlobalLoading from './components/GlobalLoading';

const CashFlowExpensesView = React.lazy(
  () => import('./views/CashFlowExpenses.view')
);
const CashFlowRevenuesView = React.lazy(
  () => import('./views/CashFlowRevenues.view')
);
const HomeView = React.lazy(() => import('./views/Home.view'));
const PaymentCreateView = React.lazy(
  () => import('./views/PaymentCreate.view')
);
const PaymentDetailsView = React.lazy(
  () => import('./views/PaymentDetails.view')
);
const PaymentListView = React.lazy(() => import('./views/PaymentList.view'));
const UserCreateView = React.lazy(() => import('./views/UserCreate.view'));
const UserDetailsView = React.lazy(() => import('./views/UserDetails.view'));
const UserEditView = React.lazy(() => import('./views/UserEdit.view'));
const UserListView = React.lazy(() => import('./views/UserList.view'));

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export default function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  const { fetchUser, user } = useAuth();

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
          AuthService.imperativelySendToLoginScreen();
          return;
        }

        if (!codeVerifier) {
          AuthService.imperativelySendToLogout();
          return;
        }

        // busca o primeiro token de acesso
        const { access_token, refresh_token } =
          await AuthService.getFirstAccessToken({
            code,
            codeVerifier,
            redirectUri: `${APP_BASE_URL}/authorize`,
          });

        AuthService.setAccessToken(access_token);
        AuthService.setRefreshToken(refresh_token);

        const decodedToken: Authentication.AccessTokenDecodedBody =
          jwtDecode(access_token);
        fetchUser(decodedToken['alganews:user_id']);

        navigate('/');
      }

      if (accessToken) {
        const decodedToken: Authentication.AccessTokenDecodedBody =
          jwtDecode(accessToken);
        fetchUser(decodedToken['alganews:user_id']);
      }
    }

    identify();
  }, [fetchUser, navigate]);

  const isAuthorizationRoute = useMemo(
    () => location.pathname === '/authorize',
    [location.pathname]
  );

  if (isAuthorizationRoute || !user) return <GlobalLoading />;

  return (
    <Suspense fallback={<GlobalLoading />}>
      <Routes>
        <Route path={'/'} element={<HomeView />} />
        <Route path={'/users'} element={<UserListView />} />
        <Route path={'/users/create'} element={<UserCreateView />} />
        <Route path={'/users/edit/:id'} element={<UserEditView />} />
        <Route path={'/users/:id'} element={<UserDetailsView />} />
        <Route path={'/payments'} element={<PaymentListView />} />
        <Route path={'/payments/create'} element={<PaymentCreateView />} />
        <Route path={'/payments/:id'} element={<PaymentDetailsView />} />
        <Route
          path={'/cash-flow/expenses'}
          element={<CashFlowExpensesView />}
        />
        <Route
          path={'/cash-flow/revenues'}
          element={<CashFlowRevenuesView />}
        />
      </Routes>
    </Suspense>
  );
}
