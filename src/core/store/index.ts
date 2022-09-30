import {
  combineReducers,
  configureStore,
  isRejected,
  Middleware,
} from '@reduxjs/toolkit';
import userReducer from './User.reducer';
import { notification } from 'antd';
import PaymentReducer from './Payment.slice';
import expenseReducer from './Expense.slice';
import revenueReducer from './Revenue.slice';
import entriesCategoryReducer from './EntriesCategory.slice';

const observeActions: Middleware = () => (next) => (action) => {
  if (isRejected(action)) {
    notification.error({
      message: action.error.message,
    });
  }

  next(action);
};

const cashFlowReducer = combineReducers({
  expense: expenseReducer,
  revenue: revenueReducer,
  category: entriesCategoryReducer,
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    payment: PaymentReducer,
    cashFlow: cashFlowReducer,
  },
  middleware: function (getDefaultMiddleware) {
    return [...getDefaultMiddleware(), observeActions];
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
