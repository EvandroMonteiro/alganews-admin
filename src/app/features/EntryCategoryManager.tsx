import { Button, Row, Table } from 'antd';
import { CashFlow } from 'goodvandro-alganews-sdk';
import { useEffect } from 'react';
import useEntriesCategories from '../../core/hooks/useEntriesCategories';
import { DeleteOutlined } from '@ant-design/icons';

export default function EntryCategoryManager(props: {
  type: 'EXPENSE' | 'REVENUE';
}) {
  const { expenses, fetchCategories, revenues } = useEntriesCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <Row justify={'space-between'} style={{ marginBottom: 16 }}>
        <Button>Atualizar Categorias</Button>
        <Button>Adicionar Categoria</Button>
      </Row>
      <Table<CashFlow.CategorySummary>
        size='small'
        dataSource={props.type === 'EXPENSE' ? expenses : revenues}
        columns={[
          {
            dataIndex: 'name',
            title: 'Descrição',
          },
          {
            dataIndex: 'totalEntries',
            title: 'Vínculo',
            align: 'right',
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            align: 'right',
            render(id: number) {
              return (
                <>
                  <Button
                    danger
                    type={'ghost'}
                    size={'small'}
                    icon={<DeleteOutlined />}
                  />
                </>
              );
            },
          },
        ]}
      />
    </>
  );
}
