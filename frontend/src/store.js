import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productListReducer } from './reducers/productReducers';
import { productDetailsReducer } from './reducers/productReducers';

const reducer = {
    productList: productListReducer,
    productDetails: productDetailsReducer
}

// const initialState = {}

const middleware = [thunk]

const store = configureStore({
    reducer,
    middleware: middleware,
    devTools: process.env.NODE_ENV !== 'production',
})

export default store