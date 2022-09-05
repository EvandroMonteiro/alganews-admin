import { Card, notification, Skeleton } from 'antd';
import { User, UserService } from 'goodvandro-alganews-sdk';
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useUser from '../../core/hooks/useUser';
import UserForm from '../features/UserForm';

export default function UserEditView() {
  const params = useParams<{ id: string }>();

  const { user, fetchUser, notFound } = useUser();

  useEffect(() => {
    if (!isNaN(Number(params.id)))
      fetchUser(Number(params.id));
  }, [fetchUser, params.id]);

  const transformUserData = useCallback(
    (user: User.Detailed) => {
      return {
        ...user,
        createdAt: moment(user.createdAt),
        updatedAt: moment(user.updatedAt),
        birthdate: moment(user.birthdate),
      };
    },
    []
  );

  if (isNaN(Number(params.id)))
    return <Navigate to='/users' replace={true} />;

  if (notFound)
    return <Card>Utilizador não encontrado</Card>;

  function handleUserUpdate(user: User.Input) {
    UserService.updateExistingUser(
      Number(params.id),
      user
    ).then(() => {
      notification.success({
        message: 'Usuário atualizado com sucesso',
      });
    });
  }

  if (!user) return <Skeleton />;

  return (
    <>
      <UserForm
        onUpdate={handleUserUpdate}
        user={transformUserData(user)}
      />
    </>
  );
}
