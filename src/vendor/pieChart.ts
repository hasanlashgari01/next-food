import type { ChartData, ChartOptions } from "chart.js";

interface PieChartProps {
  (details: any, labelField: any, dataField: any): ChartData<"pie", number[], unknown>;
}

export const pieChartData: PieChartProps = (details, labelField, dataField): ChartData<"pie"> => {
  const labels = details.map((label: { [key: string]: string }) => label[labelField]);
  const data = details.map((label: { [key: string]: string }) => label[dataField]);

  const dataSet: ChartData<"pie"> = {
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

export const options: ChartOptions<"pie"> = {
  responsive: true,
  animation: {
    animateScale: true,
    animateRotate: true,
  },
};
