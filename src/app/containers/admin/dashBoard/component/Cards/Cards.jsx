import React from 'react'
import Card from '../Card/Card'
import { CardsData } from '../../../Data/Data'
import './Cards.css'
const Cards = ({data}) => {
  return (
    <div className="Cards">
      {CardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Cards