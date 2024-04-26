import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="py-3"><Outlet/></div>
  )
}

export default MainLayout