import axios from 'axios';
import Service from 'goodvandro-alganews-sdk/dist/Service';
import AuthService from './Authorization.service';

const { REACT_APP_API_BASE_URL } = process.env;

if (REACT_APP_API_BASE_URL) Service.setBaseURL(REACT_APP_API_BASE_URL);

Service.setRequestInterceptors(async (request) => {
  const accessToken = AuthService.getAccessToken();

  // injeta o token de acesso na requisição
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return request;
});

Service.setResponseInterceptors(
  (response) => response,
  async (error) => {
    // recupera informações da requisição
    const originalRequest = error.config;

    // caso o erro seja de autenticação e ainda não foi feito o retry
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // recupera o code verifier e o refresh token
      const storage = {
        codeVerifier: AuthService.getCodeVerifier(),
        refreshToken: AuthService.getRefreshToken(),
      };

      const { codeVerifier, refreshToken } = storage;

      // caso algum dos dados não exista, redireciona para a tela de login
      if (!refreshToken || !codeVerifier) {
        AuthService.imperativelySendToLogout();
        return;
      }

      // renova o token
      const token = await AuthService.getNewToken({
        refreshToken,
        codeVerifier,
      });

      // atualiza o token de acesso para novas requisições
      AuthService.setAccessToken(token.access_token);
      AuthService.setRefreshToken(token.refresh_token);

      // implementa o token na requisição
      originalRequest.headers['Authorization'] = `Bearer ${token.access_token}`;

      // retorna uma chamada do axios com essa requisição
      return axios(originalRequest);
    }

    throw error; // Promise.reject(error);
  }
);
