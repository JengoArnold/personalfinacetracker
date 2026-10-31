
import DashboardHeader from './component/DashboardHeader'
import SideNav from './component/NavBar'

function DashboardLayout({children}) {
  return (
    <div>
        
        <div className='fixed md:w-64 hidden md:block bg-white-400'> <SideNav/>
         </div>
           
        <div className="md:ml-64 p-7">
          <DashboardHeader/>
            {children}
            </div>
    </div>
  )
}

export default DashboardLayout
