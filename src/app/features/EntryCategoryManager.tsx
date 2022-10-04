import { Button, Col, Form, Input, Modal, Row, Table } from 'antd';
import { CashFlow } from 'goodvandro-alganews-sdk';
import { useCallback, useEffect, useState } from 'react';
import useEntriesCategories from '../../core/hooks/useEntriesCategories';
import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';

export default function EntryCategoryManager(props: {
  type: 'EXPENSE' | 'REVENUE';
}) {
  const { expenses, fetchCategories, revenues } = useEntriesCategories();

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
      >
        <CategoryForm />
      </Modal>
      <Row justify={'space-between'} style={{ marginBottom: 16 }}>
        <Button>Atualizar Categorias</Button>
        <Button onClick={openCategoryModal}>Adicionar Categoria</Button>
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

function CategoryForm() {
  return (
    <Form layout={'vertical'}>
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
