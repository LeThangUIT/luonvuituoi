import React from 'react'
import Cards from '../component/Cards/Cards'
import {MainDash} from '../../components/MainDash/MainDash'
import { Heading30 } from '../../../../sharedComponents/text'

function DashBoardPage() {
  return (
    <>
      <MainDash>
        <Heading30>Dashboard Page</Heading30>
        <Cards></Cards>
      </MainDash>
    </>
  )
}

export default DashBoardPage