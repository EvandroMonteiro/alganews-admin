import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import * as AuthAction from '../store/Auth.slice';

export default function useAuth() {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((s: RootState) => s.auth.user);
  const fetching = useSelector((s: RootState) => s.auth.fetching);

  const fetchUser = useCallback(
    (userId: number) => {
      return dispatch(AuthAction.fetchUser(userId)).unwrap();
    },
    [dispatch]
  );

  return {
    user,
    fetching,
    fetchUser,
  };
}
