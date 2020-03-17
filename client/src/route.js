import HomePage from "./components/Page/HomePage";
import ProductManagePage from "./components/Page/ProductManagePage";
import NotFoundPage from "./components/Page/NotFoundPage";
import ActionOrderPage from "./components/Page/ActionOrderPage";
import ActionProductPage from "./components/Page/ActionProductPage";


const routes = [
    {
        path:'/',
        exact: true,
        main: HomePage
    },
    {
        path:'/products',
        exact: true,
        main: ProductManagePage
    },
    {
        path:'/orders/:id/edit',
        exact: false,
        main: ActionOrderPage
    },
    {
        path:'/products/:id/edit',
        exact: false,
        main: ActionProductPage
    },
    {
        path:'',
        exact: false,
        main: NotFoundPage
    },


];

export default routes;