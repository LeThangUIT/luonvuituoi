import React, { useState } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import Chart from 'react-apexcharts'
import './Card.css'
const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      {
        expanded ?
          <ExpandedCard param={props} setExpanded={() => setExpanded(false)} /> :
          <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      }
    </AnimateSharedLayout>
  )
}

// CompactCard
function CompactCard({ param, setExpanded }) {
  const Png = param.png;
  return (
    <motion.div className="CompactCard"
      style={{
        background: param.color.background,
        boxShadow: param.color.boxShadow
      }}
      onClick={setExpanded}
      layoutId="expandableCard"
    >
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png/>
        <span>${param.value}</span>
        <span>Last 24 hours</span>
      </div>
    </motion.div>
  )
}

// ExpandedCard
function ExpandedCard({ param, setExpanded }) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
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
        ],
      }
    }
  }
  return (
    <motion.div className="ExpandedCard"
      style={{
        background: param.color.background,
        boxShadow: param.color.boxShadow
      }}
      layoutId='expandableCard'
    >
      <div style={{ alignSelf: 'flex-end', cursor: 'pointer', color: 'white' }}>
        <FaArrowAltCircleRight onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        <Chart series={param.series} type="area" options={data.options} />
      </div>
      <span>Last 24 hours</span>
    </motion.div>
  )
}

export default Card