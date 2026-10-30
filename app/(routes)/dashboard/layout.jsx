
import SideNav from './component/NavBar'

function DashboardLayout({children}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
        
            <SideNav/>
        
        <div className="flex-1 p-6">
            {children}
            </div>
    </div>
  )
}

export default DashboardLayout
