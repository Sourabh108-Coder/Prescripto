import React from 'react'
import Headers from '../components/Headers'
import Doctorspeciality from '../components/Doctorspeciality'
import Topdoctor from '../components/Topdoctor'
import Banner from '../components/Banner'
import AiSymptomChecker from '../components/AiSymptomChecker'



const Home = () => {
  return (
    <div>
        <Headers/>
        <Doctorspeciality/>
        <Topdoctor/>
        <Banner/>
        {/* <AiSymptomChecker/> */}
    </div>
  )
}

export default Home
