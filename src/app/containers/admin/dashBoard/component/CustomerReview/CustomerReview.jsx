import React from 'react'
import Chart from 'react-apexcharts'
import './CustomerReview.css'
const CustomerReview = () => {
  const data = {
    series: [
      {
        name: "Review",
        data: [10, 50, 30, 90, 40, 120, 100],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto"
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },

      dataLabels: {
        enabled: false
      },

      stroke: {
        curve: "smooth",
        colors: ["#ff929f"]
      },

      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },

      grid: {
        show: false,
      },

      xaxis: {
        type: "datetime",
        categories: [
          "2022-07-05T06:20:39.000Z",
          "2022-07-05T07:20:39.000Z",
          "2022-07-05T08:20:39.000Z",
          "2022-07-05T09:20:39.000Z",
          "2022-07-05T10:20:39.000Z",
          "2022-07-05T11:20:39.000Z",
          "2022-07-05T12:20:39.000Z",
        ]
      },

      yaxis: {
        show: false
      },

      toolbar: {
        show: false
      }
    },
  };
  return (
    <div className="CustomerReview">
      <Chart series={data.series} options={data.options} type="area"/>
    </div>
  )
}

export default CustomerReview