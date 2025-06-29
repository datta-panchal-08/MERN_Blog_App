import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux';
import Store, { persister } from './redux/Store.js'
import { PersistGate } from 'redux-persist/integration/react';
createRoot(document.getElementById('root')).render(
  <Provider store={Store} >
    <PersistGate loading={null} persistor={persister}>
      <BrowserRouter>
      <App />
    </BrowserRouter>
    </PersistGate>
  </Provider>
)
