import React from 'react';
import StackNavigation from './src/container/navigation/StackNavigator/StackNavigation';
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { mainReducer } from './src/redux/reducer/reducers'
import { createStore ,applyMiddleware} from 'redux'
import createSagaMiddleware from '@redux-saga/core';
import sagas from './src/redux/sagas';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,

};

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, mainReducer);
export const store = createStore(persistedReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas)

export const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StackNavigation />
    </PersistGate>
  </Provider>
  );
};


export default App;
