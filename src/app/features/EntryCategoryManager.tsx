import { Button, Row, Table } from 'antd';
import { CashFlow } from 'goodvandro-alganews-sdk';

export default function EntryCategoryManager() {
  return (
    <>
      <Row justify={'space-between'}>
        <Button>Atualizar Categorias</Button>
        <Button>Adicionar Categoria</Button>
      </Row>
      <Table<CashFlow.CategorySummary> dataSource={[]} />
    </>
  );
}
