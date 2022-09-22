import { Col, DatePicker, Form, Row, Select } from 'antd';
import { Payment } from 'goodvandro-alganews-sdk';
import moment from 'moment';
import useUsers from '../../core/hooks/useUsers';

export default function PaymentForm() {
  const { editors } = useUsers();

  return (
    <Form<Payment.Input> layout={'vertical'}>
      <Row gutter={24}>
        <Col xs={24} lg={8}>
          <Form.Item label={'Editor'}>
            <Select
              showSearch
              optionFilterProp='children'
              filterOption={(input, option) => {
                return (
                  (option!.children as unknown as string)
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .includes(input.toLowerCase()) ||
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                );
              }}
            >
              {editors.map((editor) => (
                <Select.Option key={editor.id} value={editor.id}>
                  {editor.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item label={'Período'}>
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              format={'DD/MM/YYYY'}
            />
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item label={'Agendamento'}>
            <DatePicker
              disabledDate={(date) => {
                return (
                  date.isBefore(moment()) ||
                  date.isAfter(moment().add(7, 'days'))
                );
              }}
              style={{ width: '100%' }}
              format={'DD/MM/YYYY'}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
