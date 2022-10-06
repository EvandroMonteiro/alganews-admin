import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Popconfirm,
  Row,
  Table,
} from 'antd';
import { CashFlow } from 'goodvandro-alganews-sdk';
import { useCallback, useEffect, useState } from 'react';
import useEntriesCategories from '../../core/hooks/useEntriesCategories';
import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';

export default function EntryCategoryManager(props: {
  type: 'EXPENSE' | 'REVENUE';
}) {
  const { expenses, fetchCategories, fetching, revenues, deleteCategory } =
    useEntriesCategories();

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const openCategoryModal = useCallback(() => setShowCategoryModal(true), []);
  const closeCategoryModal = useCallback(() => setShowCategoryModal(false), []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <Modal
        footer={null}
        title={'Adicionar categoria'}
        visible={showCategoryModal}
        onCancel={closeCategoryModal}
        destroyOnClose
      >
        <CategoryForm
          onSuccess={() => {
            closeCategoryModal();
            notification.success({
              message: 'Categoria cadastrada com sucesso',
            });
          }}
        />
      </Modal>
      <Row justify={'space-between'} style={{ marginBottom: 16 }}>
        <Button onClick={fetchCategories}>Atualizar Categorias</Button>
        <Button onClick={openCategoryModal}>Adicionar Categoria</Button>
      </Row>
      <Table<CashFlow.CategorySummary>
        size='small'
        rowKey={'id'}
        loading={fetching}
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
            render(id: number, record) {
              return (
                <Popconfirm
                  title={'Tem certeza que deseja excluir esta categoria?'}
                  disabled={!record.canBeDeleted}
                  onConfirm={async () => {
                    await deleteCategory(id);
                    notification.success({
                      message: 'Categoria excluída com sucesso',
                    });
                  }}
                >
                  <Button
                    danger
                    type={'ghost'}
                    size={'small'}
                    icon={<DeleteOutlined />}
                    disabled={!record.canBeDeleted}
                  />
                </Popconfirm>
              );
            },
          },
        ]}
      />
    </>
  );
}

function CategoryForm(props: { onSuccess: () => any }) {
  const { onSuccess } = props;
  const { createCategory } = useEntriesCategories();

  const handleFormSubmit = useCallback(
    async (form: CashFlow.CategoryInput) => {
      const newCategoryDTO: CashFlow.CategoryInput = {
        ...form,
        type: 'EXPENSE',
      };

      await createCategory(newCategoryDTO);
      onSuccess();
    },
    [createCategory, onSuccess]
  );

  return (
    <Form layout={'vertical'} onFinish={handleFormSubmit}>
      <Row justify={'end'}>
        <Col xs={24}>
          <Form.Item
            label={'Categoria'}
            name={'name'}
            rules={[
              { required: true, message: 'O nome da categoria é obrigatório' },
            ]}
          >
            <Input placeholder={'E.g.: Infra'} />
          </Form.Item>
        </Col>
        <Button
          type={'primary'}
          htmlType={'submit'}
          icon={<CheckCircleOutlined />}
        >
          Cadastrar categoria
        </Button>
      </Row>
    </Form>
  );
}
