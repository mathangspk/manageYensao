import orders from './OrdersReducer';
import errorReducer from './errorReducer';
import errorOrderReducer from './errorOrderReducer';
import authReducer from './authReducer';
import {combineReducers} from 'redux';
import products from './ProductsReducer';
import errorProductReducer from './errorProductReducer';
import orderEditting from './orderEditting';
import productEditting from './productEditting';

const myReducer = combineReducers({
    orders : orders,
    error: errorReducer,
    errorOrder: errorOrderReducer,
    auth: authReducer,
    products,
    errorProduct: errorProductReducer,
    orderEditting,
    productEditting,
})

export default myReducer;