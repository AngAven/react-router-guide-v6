import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Root} from './routes/root.jsx'
import {ErrorPge} from '/src/error-pge.jsx'
import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <ErrorPge/>,
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
