import { Area } from '@ant-design/charts';
import { MetricService } from 'goodvandro-alganews-sdk';
import { format } from 'date-fns';
import { LockFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import transformDataIntoAntdChart from '../../core/utils/transformDataIntoAntdChart';
import { ptBR } from 'date-fns/locale';
import parseISO from 'date-fns/parseISO';
import { ForbiddenError } from 'goodvandro-alganews-sdk/dist/errors';
import Card from 'antd/lib/card/Card';
import { Space, Typography } from 'antd';

export default function CompanyMetrics() {
  const [data, setData] = useState<
    {
      yearMonth: string;
      value: number;
      category: 'totalRevenues' | 'totalExpenses';
    }[]
  >([]);

  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    MetricService.getMonthlyRevenueExpenses()
      .then(transformDataIntoAntdChart)
      .then(setData)
      .catch((err) => {
        if (err instanceof ForbiddenError) {
          setForbidden(true);
          return;
        }
        throw err;
      });
  }, []);

  if (forbidden)
    return (
      <Card style={{ minHeight: 256, display: 'flex', alignItems: 'center' }}>
        <Space direction={'vertical'}>
          <Space align={'center'}>
            <LockFilled style={{ fontSize: 32 }} />
            <Typography.Title style={{ margin: 0 }}>
              Acesso negado
            </Typography.Title>
          </Space>
          <Typography.Paragraph>
            Você não tem permissão para acessar estes dados.
          </Typography.Paragraph>
        </Space>
      </Card>
    );

  const config = {
    data,
    height: 256,
    color: ['#0099FF', '#274060'],
    areaStyle: { fillOpacity: 1 },
    xField: 'yearMonth',
    yField: 'value',
    seriesField: 'category',
    legend: {
      itemName: {
        formatter(legend: any) {
          return legend === 'totalRevenues' ? 'Receitas' : 'Despesas';
        },
      },
    },
    tooltip: {
      title(title: any) {
        return format(parseISO(title), 'MMMM yyyy', {
          locale: ptBR,
        });
      },
      formatter(data: any) {
        return {
          name: data.category === 'totalRevenues' ? 'Receitas' : 'Despesas',
          value: (data.value as number).toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
            maximumFractionDigits: 2,
          }),
        };
      },
    },
    yAxis: false,
    xAxis: {
      label: {
        formatter(item: any) {
          return format(new Date(item), 'MM/yyyy');
        },
      },
    },
    point: {
      size: 5,
      shape: 'circle',
    },
  };

  return <Area {...config} />;
}
