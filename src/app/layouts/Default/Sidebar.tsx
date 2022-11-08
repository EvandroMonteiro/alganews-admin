import {
  DiffOutlined,
  FallOutlined,
  HomeOutlined,
  LaptopOutlined,
  MenuOutlined,
  PlusCircleOutlined,
  RiseOutlined,
  TableOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Drawer,
  DrawerProps,
  Layout,
  Menu,
  MenuProps,
  SiderProps,
} from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.svg';

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
  const { lg } = useBreakpoint();

  const location = useLocation();

  const [show, setShow] = useState(false);

  const SideBarWrapper: React.FC<{ children: React.ReactNode }> = useMemo(
    () => (lg ? Sider : Drawer),
    [lg]
  );

  const siderProps = useMemo((): SiderProps => {
    return {
      width: 200,
      className: 'site-layout-background no-print',
    };
  }, []);

  const drawerProps = useMemo((): DrawerProps => {
    return {
      visible: show,
      closable: true,
      title: (
        <>
          <img src={logo} alt={'logo alga news'} />
        </>
      ),
      headerStyle: { height: 64 },
      bodyStyle: { padding: 0 },
      onClose() {
        setShow(false);
      },
      placement: 'left',
    };
  }, [show]);

  const sidebarProps = useMemo((): SiderProps | DrawerProps => {
    return lg ? siderProps : drawerProps;
  }, [lg, siderProps, drawerProps]);

  return (
    <>
      {!lg && (
        <Button
          icon={<MenuOutlined />}
          onClick={() => setShow(true)}
          type={'text'}
          style={{ position: 'fixed', top: 0, left: 0, height: 64, zIndex: 99 }}
        />
      )}
      <SideBarWrapper {...sidebarProps}>
        <Menu
          mode='inline'
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={[location.pathname.split('/')[1]]}
          style={{ height: '100%', borderRight: 0 }}
          items={items}
        />
      </SideBarWrapper>
    </>
  );
}
