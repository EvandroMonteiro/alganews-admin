import {
  DiffOutlined,
  FallOutlined,
  HomeOutlined,
  LaptopOutlined,
  PlusCircleOutlined,
  RiseOutlined,
  TableOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';
const { Sider } = Layout;

const items: MenuProps['items'] = [
  {
    label: <Link to={'/'}>Home</Link>,
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Usuários',
    key: 'users',
    icon: <UserOutlined />,
    children: [
      {
        label: <Link to={'/users'}>Consulta</Link>,
        key: '/users',
        icon: <TableOutlined />,
      },
      {
        label: <Link to={'/users/create'}>Cadastro</Link>,
        key: '/users/create',
        icon: <PlusCircleOutlined />,
      },
    ],
  },
  {
    label: 'Pagamentos',
    key: 'payments',
    icon: <LaptopOutlined />,
    children: [
      {
        label: <Link to={'/payments'}>Consulta</Link>,
        key: '/payments',
        icon: <TableOutlined />,
      },
      {
        label: <Link to={'/payments/create'}>Cadastro</Link>,
        key: '/payments/create',
        icon: <PlusCircleOutlined />,
      },
    ],
  },
  {
    label: 'Fluxo de caixa',
    key: 'cash-flow',
    icon: <DiffOutlined />,
    children: [
      {
        label: <Link to={'/cash-flow/expenses'}>Despesas</Link>,
        key: '/cash-flow/expenses',
        icon: <FallOutlined />,
      },
      {
        label: <Link to={'/cash-flow/revenues'}>Receitas</Link>,
        key: '/cash-flow/revenues',
        icon: <RiseOutlined />,
      },
    ],
  },
];

export default function DefaultLayoutSidebar() {
  const location = useLocation();

  return (
    <Sider
      width={200}
      className='site-layout-background no-print'
      breakpoint='lg'
      collapsedWidth='0'
    >
      <Menu
        mode='inline'
        defaultSelectedKeys={[location.pathname]}
        defaultOpenKeys={[location.pathname.split('/')[1]]}
        style={{ height: '100%', borderRight: 0 }}
        items={items}
      />
    </Sider>
  );
}
