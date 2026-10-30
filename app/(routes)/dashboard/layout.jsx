import React,{Children} from 'react'
import SideNav from './component/NavBar'

function Dashboardlayout({Children}) {
  return (
    <div>
        <div>
            <SideNav/>
        </div>
        <div>
            {Children}
            </div>
    </div>
  )
}

export default Dashboardlayout
