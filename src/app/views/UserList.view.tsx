import { Col, Row } from 'antd';
import useBreadcrumb from '../../core/hooks/useBreadcrumb';
import usePageTitle from '../../core/hooks/usePageTitle';
import UserList from '../features/UserList';

export default function UserListView() {
  usePageTitle('Consulta de utilizadores');
  useBreadcrumb('Usuários/Consulta');

  return (
    <Row>
      <Col xs={24}>
        <UserList />
      </Col>
    </Row>
  );
}
