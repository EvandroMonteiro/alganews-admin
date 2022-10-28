import { Avatar, Button, Dropdown, Layout, Menu, Row, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import logo from '../../../assets/logo.svg';
import useAuth from '../../../core/hooks/useAuth';
import Card from 'antd/lib/card/Card';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';
import AuthService from '../../../auth/Authorization.service';

const { Header } = Layout;

export default function DefaultLayoutHeader() {
  const { user } = useAuth();

  const menu = (
    <Menu
      style={{ width: 220 }}
      items={[
        {
          key: 'profile',
          label: (
            <Card bordered={false}>
              <Meta
                title={user?.name}
                description={
                  <Tag color={user?.role === 'MANAGER' ? 'red' : 'blue'}>
                    {user?.role === 'EDITOR'
                      ? 'Editor'
                      : user?.role === 'MANAGER'
                      ? 'Gerente'
                      : 'Assistente'}
                  </Tag>
                }
              />
            </Card>
          ),
        },
        {
          key: '1',
          label: <Link to={`/users/${user?.id}`}>Meu perfil</Link>,
          icon: <UserOutlined />,
        },
        {
          key: '2',
          danger: true,
          onClick() {
            confirm({
              title: 'Fazer logout',
              content: 'Deseja realmente fazer logout?',
              onOk() {
                AuthService.imperativelySendToLogout();
              },
              closable: true,
              okButtonProps: { danger: true },
              okText: 'Fazer logout',
              cancelText: 'Permanecer logado',
            });
          },
          label: 'Fazer logout',
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <Header className='header no-print'>
      <Row
        justify='space-between'
        style={{
          height: '100%',
          maxWidth: 1190,
          margin: '0 auto',
        }}
        align='middle'
      >
        <img src={logo} alt={'AlgaNews Admin'} />
        <Dropdown placement={'bottomRight'} overlay={menu} arrow>
          <Avatar src={user?.avatarUrls.small} />
        </Dropdown>
      </Row>
    </Header>
  );
}
