import React from 'react';
import './App.css';
import {Provider} from 'react-redux'
import store from './redux/store'
import {HashRouter} from 'react-router-dom'
import Navbar from './components/Navbar'
import routes from './routes'
import './stylesheets/home.scss'

function App() {
 return (
   <Provider store={store}>
     <HashRouter>
       <Navbar />
       {routes}
     </HashRouter>
   </Provider>
 );
}

export default App;