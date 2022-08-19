import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {es} from 'date-fns/locale'

ReactDOM.createRoot(document.getElementById('root')).render(
  <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
    <Provider store={store}>
      <App />
    </Provider>
  </LocalizationProvider>
)
