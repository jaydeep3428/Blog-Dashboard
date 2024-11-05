import { useEffect } from "react";
import ApexCharts from "apexcharts";

export default function ProductCChart4() {
  useEffect(() => {
    const dataSet = [
      { x: new Date("2014-01-11").getTime(), y: 200 },
      { x: new Date("2014-01-12").getTime(), y: 1000 },
      { x: new Date("2014-01-13").getTime(), y: 300 },
      { x: new Date("2014-01-14").getTime(), y: 250 },
    ];

    const options = {
      series: [
        {
          name: "PRODUCT C",
          data: dataSet,
          color: "#ec4899",
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
          gradientToColors: ["rgba(236,72,153,0.1)", "rgba(236,72,153,0.8)"],
          stops: [0, 80],
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

    const chart = new ApexCharts(document.querySelector("#chart2"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return <div id="chart2"></div>;
}
