import { Menu, Layout, MenuProps } from 'antd';

const { Header } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map(
  (key) => ({
    key,
    label: `nav ${key}`,
  })
);

export default function DefaultLayoutHeader() {
  return (
    <Header className='header'>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['2']}
        items={items1}
      />
    </Header>
  );
}
