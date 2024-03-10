export const options = {
  responsive: true,
  borderRadius: 27, // radius of the bar
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  pointStyle: false,
  borderWidth: 4,
  tension: 0.4,
  scales: {
    x: { grid: { display: false }, border: { display: false } },
    y: {
      ticks: { display: false, beginAtZero: true },
      grid: { drawBorder: false, display: false },
      border: { display: false },
    },
  },
};

const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => Math.floor(Math.random() * 100)),
      borderColor: "#AC6AFF",
    },
  ],
};
