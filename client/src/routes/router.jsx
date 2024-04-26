import MainLayout from '@/layout/MainLayout';
import Home from '@/pages/Home/Home';
import { createBrowserRouter } from 'react-router-dom';

const router =createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children: [
            {
                path:'/',
                element:<Home/>,
            },
            
        ]
    }
])

export default router;