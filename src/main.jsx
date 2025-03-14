import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Root, loader as loaderRoot, action as actionRoot} from './routes/root.jsx'
import {ErrorPge} from '/src/error-pge.jsx'
import {Contact, loader as loaderContact, action as actionContact} from './routes/contact.jsx'
import {EditContact, action as actionEdit} from "./routes/edit.jsx"
import {action as actionDestroy} from './routes/destroy.jsx'
import {Index} from "./routes/index.jsx";
import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <ErrorPge/>,
        loader: loaderRoot,
        action: actionRoot,
        children: [
            {
                index: true,
                element: <Index/>,
            },
            {
                path: 'contacts/:contactId',
                element: <Contact/>,
                loader: loaderContact,
                action: actionContact,
            },
            {
                path: 'contacts/:contactId/edit',
                element: <EditContact/>,
                loader: loaderContact,
                action: actionEdit,
            },
            {
                path: 'contacts/:contactId/destroy',
                action: actionDestroy,
                errorElement: <div>There was an error.</div>,
            }
        ]
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
