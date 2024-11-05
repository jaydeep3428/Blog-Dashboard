import { useEffect } from "react";
import ApexCharts from "apexcharts";

export default function ProductCChart4() {
  useEffect(() => {
    const dataSet = [
      { x: new Date("2014-01-11").getTime(), y: 1 },
      { x: new Date("2014-01-12").getTime(), y: 1.1 },
      { x: new Date("2014-01-13").getTime(), y: 2 },
      { x: new Date("2014-01-14").getTime(), y: 1 },
    ];

    const options = {
      series: [
        {
          name: "PRODUCT C",
          data: dataSet,
          color: "#2663EB",
        },
      ],
      chart: {
        type: "area",
        height: 100,
        width: 150,
        toolbar: { show: false },
        background: "transparent",
      },
      stroke: {
        curve: "smooth",
        width: 2.5,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["rgba(39,99,235,0.1)", "rgba(39,99,235,0.8)"],
          stops: [0, 100],
          opacityFrom: 0.7,
          opacityTo: 0.2,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "datetime",
        labels: {
          show: false,
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          show: false,
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      grid: {
        show: false,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        enabled: false,
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart3"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return <div id="chart3"></div>;
}
