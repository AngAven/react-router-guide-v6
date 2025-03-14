import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Root} from './routes/root.jsx'
import {ErrorPge} from '/src/error-pge.jsx'
import {Contact} from './routes/contact.jsx'
import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <ErrorPge/>,
        children: [
            {
                path: 'contacts/:contactId',
                element: <Contact/>,
            }
        ]
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
