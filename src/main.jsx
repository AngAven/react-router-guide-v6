import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Root, loader as loaderRoot, action as actionRoot} from './routes/root.jsx'
import {ErrorPge} from '/src/error-pge.jsx'
import {Contact, loader as loaderContact} from './routes/contact.jsx'
import './index.css'
import {EditContact} from "./routes/edit.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <ErrorPge/>,
        loader: loaderRoot,
        action: actionRoot,
        children: [
            {
                path: 'contacts/:contactId',
                element: <Contact/>,
                loader: loaderContact,
            },
            {
                path: 'contacts/:contactId/edit',
                element: <EditContact/>,
                loader: loaderContact,
            }
        ]
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
