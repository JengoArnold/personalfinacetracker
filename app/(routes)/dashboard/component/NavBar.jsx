
import Image from 'next/image'
import { LayoutArrowDownIcon } from 'lucide-react'
import {  LucideDatabaseArrowUp} from 'lucide-react'
import { PiggyBank } from 'lucide-react'
import {ReceiptIcon} from 'lucide-react'

function SideNav() {
  const menuList=[
{
  id:1,
  name:"Dashboard",
  icon:LayoutArrowDownIcon
},
{
  id:2,
  name:"Expenses",
  icon:PiggyBank
},
{
  id:3,
  name:"Upgrade",
  icon:LucideDatabaseArrowUp
},
{
  id:4,
  name:"Budgets",
  icon:ReceiptIcon
}
  ]
  return (

<div className='h-screen p-5 boarder shadow-sm'>
<Image src={'./logo.svg'} alt='logo' width={160} height={100} />
<div className='mt-5'>
{menuList.map((menu,index)=>(

  <h2 className='flex gap-9 h-20 items-center text-gray-500 font-medium p-5 cursor-pointer hover:text-primary hover:bg-blue-100'>
      <menu.icon/>
    {menu.name}</h2>
))}
</div>
    </div>
  )
}


export default SideNav
