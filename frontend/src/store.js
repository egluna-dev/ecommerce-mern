import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevtools } from 'redux-devtools-extension';

const reducer = {}

const initialState = {}

const middleware = [thunk]

const store = configureStore({})

export default store