import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes.js'
import { Layout } from './Layout.js'
import { Shop } from '../pages/Shop.js'
import { NoMatch } from '../pages/NoMatch.js'
import { Context } from '../index.js'

export const AppRouter = () => {
    const {user} = useContext(Context)
    const routes = user.isAuth ? 
        [...publicRoutes].concat(...authRoutes) : 
        [...publicRoutes]

    const routesElements = routes.map(({path, element}) => (
        <Route key={path} path={path} element={element} exact />
    ))
  return (
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Shop />} />
            {routesElements}
            <Route path='*' element={<NoMatch />} />
        </Route>
    </Routes>
  )
}
