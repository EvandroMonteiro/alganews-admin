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
const { Sider } = Layout;

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: 'Usuários',
    key: 'userSubmenu',
    icon: <UserOutlined />,
    children: [
      {
        label: 'Consulta',
        key: 'userConsultation',
        icon: <TableOutlined />,
      },
      {
        label: 'Cadastro',
        key: 'userRegistration',
        icon: <PlusCircleOutlined />,
      },
    ],
  },
  {
    label: 'Pagamentos',
    key: 'PaymentSubmenu',
    icon: <LaptopOutlined />,
    children: [
      {
        label: 'Consulta',
        key: 'PaymentConsultation',
        icon: <TableOutlined />,
      },
      {
        label: 'Cadastro',
        key: 'PaymentRegistration',
        icon: <PlusCircleOutlined />,
      },
    ],
  },
  {
    label: 'Fluxo de caixa',
    key: 'Cashflow',
    icon: <DiffOutlined />,
    children: [
      {
        label: 'Despesas',
        key: 'expenses',
        icon: <FallOutlined />,
      },
      {
        label: 'Receitas',
        key: 'revenues',
        icon: <RiseOutlined />,
      },
    ],
  },
];

export default function DefaultLayoutSidebar() {
  return (
    <Sider
      width={200}
      className='site-layout-background'
      breakpoint='lg'
      collapsedWidth='0'
    >
      <Menu
        mode='inline'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
        items={items}
      />
    </Sider>
  );
}
