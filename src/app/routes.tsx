import { Route, Routes } from 'react-router-dom';
import CashFlowExpensesView from './views/CashFlowExpenses.view';
import CashFlowRevenuesView from './views/CashFlowRevenues.view';
import HomeView from './views/Home.view';
import PaymentCreateView from './views/PaymentCreate.view';
import PaymentListView from './views/PaymentList.view';
import UserCreateView from './views/UserCreate.view';
import UserListView from './views/UserList.view';

export default function AlgaNewsRoutes() {
  return (
    <Routes>
      <Route path={'/'} element={<HomeView />} />
      <Route path={'/users'} element={<UserListView />} />
      <Route
        path={'/users/create'}
        element={<UserCreateView />}
      />
      <Route
        path={'/payments'}
        element={<PaymentListView />}
      />
      <Route
        path={'/payments/create'}
        element={<PaymentCreateView />}
      />
      <Route
        path={'/cash-flow/expenses'}
        element={<CashFlowExpensesView />}
      />
      <Route
        path={'/cash-flow/revenues'}
        element={<CashFlowRevenuesView />}
      />
    </Routes>
  );
}
