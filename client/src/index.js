import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import UserStore from './store/UserStore'
import ProductStore from './store/ProductStore'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      products: new ProductStore()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);