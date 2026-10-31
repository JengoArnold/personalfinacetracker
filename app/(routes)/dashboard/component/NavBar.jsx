
import Image from 'next/image'
import { LayoutArrowDownIcon, LucideDatabaseArrowUp, PiggyBank, ReceiptIcon, UserRound } from 'lucide-react'
import { auth, signOut } from '@/auth'

function UserButton({ user }) {
  const displayName = user?.name || user?.email || 'Account'

  return (
    <div className='flex items-center gap-3 border-t pt-4'>
      <UserRound aria-hidden='true' className='h-8 w-8 rounded-full bg-gray-100 p-1.5 text-gray-600' />
      <div className='min-w-0 flex-1'>
        <p className='truncate text-sm font-medium text-gray-900'>{displayName}</p>
        {user?.name && user?.email && (
          <p className='truncate text-xs text-gray-500'>{user.email}</p>
        )}
      </div>
      <form action={async () => {
        'use server'
        await signOut({ redirectTo: '/signin' })
      }}>
        <button type='submit' className='text-sm text-gray-500 hover:text-primary'>
          Sign out
        </button>
      </form>
    </div>
  )
}

async function SideNav() {
  const session = await auth()
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
{menuList.map((menu)=>(

  <h2 key={menu.id} className='flex gap-9 h-20 items-center text-gray-500 font-medium p-5 cursor-pointer hover:text-primary hover:bg-blue-100'>
      <menu.icon/>
    {menu.name}</h2>
))}
</div>
<div>
  <UserButton user={session?.user} />
  
</div>
    </div>
  )
}


export default SideNav
