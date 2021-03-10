import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducers from '../reducers/index'

import { persistStore } from 'redux-persist'

let store = createStore(rootReducers, applyMiddleware(thunk))

let persistor = persistStore(store)

export { store, persistor }
