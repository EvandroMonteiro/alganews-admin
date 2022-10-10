import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Space, Table, Tag, Tooltip } from 'antd';
import { CashFlow } from 'goodvandro-alganews-sdk';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import transformIntoBrl from '../../core/hooks/transformIntoBrl';
import useCashFlow from '../../core/hooks/useCashFlow';
import DoubleConfirm from '../components/DoubleConfirm';

interface EntriesListProps {
  onEdit: (entryId: number) => any;
  onDetail: (entryId: number) => any;
}

export default function EntriesList(props: EntriesListProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    entries,
    fetching,
    fetchEntries,
    setQuery,
    selected,
    setSelected,
    removeEntry,
  } = useCashFlow('EXPENSE');

  const didMount = useRef(false);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  useEffect(() => {
    if (didMount.current) {
      const params = new URLSearchParams(location.search);
      const yearMonth = params.get('yearMonth');
      if (yearMonth) setQuery({ yearMonth });
    } else {
      didMount.current = true;
    }
  }, [location.search, setQuery]);

  return (
    <Table<CashFlow.EntrySummary>
      dataSource={entries}
      rowKey={'id'}
      loading={fetching}
      rowSelection={{
        selectedRowKeys: selected,
        onChange: setSelected,
        getCheckboxProps(record) {
          return !record.canBeDeleted ? { disabled: true } : {};
        },
      }}
      columns={[
        {
          dataIndex: 'description',
          title: 'Descrição',
          width: 300,
          ellipsis: true,
          render(description: CashFlow.EntrySummary['description']) {
            return <Tooltip title={description}>{description}</Tooltip>;
          },
        },
        {
          dataIndex: 'category',
          title: 'Categoria',
          align: 'center',
          render(category: CashFlow.EntrySummary['category']) {
            return <Tag>{category.name}</Tag>;
          },
        },
        {
          dataIndex: 'transactedOn',
          title: 'Data',
          align: 'center',
          filterDropdown() {
            return (
              <Card>
                <DatePicker.MonthPicker
                  format={'YYYY - MMMM'}
                  allowClear={false}
                  onChange={(date) => {
                    navigate({
                      search: `yearMonth=${
                        date?.format('YYYY-MM') || moment().format('YYYY-MM')
                      }`,
                    });
                  }}
                />
              </Card>
            );
          },
          render(transactedOn: CashFlow.EntrySummary['transactedOn']) {
            return moment(transactedOn).format('DD/MM/YYYY');
          },
        },
        {
          dataIndex: 'amount',
          title: 'Valor',
          align: 'right',
          render: transformIntoBrl,
        },
        {
          dataIndex: 'id',
          title: 'Ações',
          align: 'right',
          render(id: number, record) {
            return (
              <Space>
                <DoubleConfirm
                  popConfirmTitle={'Remover despesa?'}
                  modalTitle={'Deseja mesmo remover essa despesa?'}
                  modalContent={
                    'Remover uma despesa pode gerar um impacto negativo no gráfico de receitas e despesas. Esta ação é irreversível'
                  }
                  onConfirm={async () => {
                    await removeEntry(id);
                  }}
                  disabled={!record.canBeDeleted}
                >
                  <Button
                    type={'text'}
                    size={'small'}
                    icon={<DeleteOutlined />}
                    danger
                  />
                </DoubleConfirm>
                <Button
                  type={'text'}
                  size={'small'}
                  icon={<EditOutlined />}
                  onClick={() => props.onEdit(id)}
                />
                <Button
                  type={'text'}
                  size={'small'}
                  icon={<EyeOutlined />}
                  onClick={() => props.onDetail(id)}
                />
              </Space>
            );
          },
        },
      ]}
    />
  );
}
