import { useEffect } from "react";
import ApexCharts from "apexcharts";

export default function PureLineChart() {
  useEffect(() => {
    // Define the data for Product C
    const dataSet = [
      { x: new Date("2014-01-11").getTime(), y: 200 },
      { x: new Date("2014-01-12").getTime(), y: 1000 },
      { x: new Date("2014-01-13").getTime(), y: 300 },
      { x: new Date("2014-01-14").getTime(), y: 250 },
    ];

    // Define chart options
    const options = {
      series: [
        {
          name: "PRODUCT C",
          data: dataSet,
          color: "#ec4899",
        },
      ],
      chart: {
        type: "line", // Simple line chart
        height: 100,
        width: 150,
        toolbar: { show: false }, // Disable chart tools
      },
      stroke: {
        curve: "smooth", // A simple straight line
        width: 2.5,
      },
      xaxis: {
        type: "datetime",
        labels: {
          show: false, // Hide bottom date labels
        },
        axisBorder: { show: false }, // Remove X-axis border
        axisTicks: { show: false }, // Remove X-axis ticks
      },
      yaxis: {
        labels: {
          show: false, // Hide Y-axis labels (no million formatting)
        },
        axisBorder: { show: false }, // Remove Y-axis border
        axisTicks: { show: false }, // Remove Y-axis ticks
      },
      grid: {
        show: false, // Disable grid lines for simplicity
      },
      markers: {
        size: 0, // No markers on the line
      },
      tooltip: {
        enabled: false, // Disable tooltip (hover date)
      },
    };

    // Render the chart
    const chart = new ApexCharts(document.querySelector("#chart2"), options);
    chart.render();

    // Cleanup chart on component unmount
    return () => {
      chart.destroy();
    };
  }, []);

  return <div id="chart2"></div>;
}
