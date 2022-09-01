import { Admin } from './pages/Admin.js'
import { Auth } from './pages/Auth.js'
import { Cart } from './pages/Cart.js'
import { Shop } from './pages/Shop.js'
import { ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './utils/consts.js'

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin />
    },
    {
        path: CART_ROUTE,
        element: <Cart />
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        element: <Shop />
    },
    {
        path: LOGIN_ROUTE,
        element: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Auth />
    },
]