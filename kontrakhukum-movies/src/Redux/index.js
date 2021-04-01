import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import favoritesReducer from './favoritesReducer'
import homeReducer from './homeReducer'


let rootReducer = combineReducers({
    favorites: favoritesReducer,
    home: homeReducer
})

let store = createStore(rootReducer, applyMiddleware(thunk))

export default store