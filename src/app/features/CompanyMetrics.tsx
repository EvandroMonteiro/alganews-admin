import { Area } from '@ant-design/charts';
import { MetricService } from 'goodvandro-alganews-sdk';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import transformDataIntoAntdChart from '../../core/utils/transformDataIntoAntdChart';
import { ptBR } from 'date-fns/locale';
import parseISO from 'date-fns/parseISO';

export default function CompanyMetrics() {
  const [data, setData] = useState<
    {
      yearMonth: string;
      value: number;
      category: 'totalRevenues' | 'totalExpenses';
    }[]
  >([]);

  useEffect(() => {
    MetricService.getMonthlyRevenueExpenses()
      .then(transformDataIntoAntdChart)
      .then(setData);
  }, []);

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
          return legend === 'totalRevenues'
            ? 'Receitas'
            : 'Despesas';
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
          name:
            data.category === 'totalRevenues'
              ? 'Receitas'
              : 'Despesas',
          value: (data.value as number).toLocaleString(
            'pt-BR',
            {
              currency: 'BRL',
              style: 'currency',
              maximumFractionDigits: 2,
            }
          ),
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
