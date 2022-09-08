import { Card, notification, Skeleton } from 'antd';
import { User, UserService } from 'goodvandro-alganews-sdk';
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import {
  Navigate,
  useNavigate,
  useParams,
} from 'react-router-dom';
import useUser from '../../core/hooks/useUser';
import NotFoundError from '../components/NotFoundError';
import UserForm from '../features/UserForm';

export default function UserEditView() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

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
    return (
      <Card>
        <NotFoundError
          title={'Usuário não encontrado'}
          actionDestination={'/usuarios'}
          actionTitle={'Voltar para lista de usuários'}
        />
      </Card>
    );

  async function handleUserUpdate(user: User.Input) {
    await UserService.updateExistingUser(
      Number(params.id),
      user
    ).then(() => {
      navigate('/users');
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
