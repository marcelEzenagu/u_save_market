import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import './assets/css/index.css'
import Router from './Router.jsx'
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ToasterProvider } from './components/ToasterContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ToasterProvider>
     <Provider store={store}>
    <RouterProvider router={Router}/>
    </Provider>
    </ToasterProvider>
  </StrictMode>,
)
