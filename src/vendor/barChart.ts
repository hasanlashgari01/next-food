import type { ChartData, ChartOptions } from "chart.js";

interface LineChartProps {
  (details: any[], labelField: string, dataField: string): ChartData<"bar">;
}

export const barChartData: LineChartProps = (details, labelField, dataField): ChartData<"bar"> => {
  const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const data = labels.map(label => details.find(detail => detail[labelField] === label)?.[dataField] ?? 0);

  const dataSet: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  return dataSet;
};

export const options: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};
