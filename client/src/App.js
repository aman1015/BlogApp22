import Login from './components/account/Login'
import Home from './components/home/Home';
import CreatePosts from './components/create/CreatePosts';
import DataProvider from './context/DataProvider';
import { useState } from 'react';
import {BrowserRouter , Routes , Route, Navigate, Outlet}  from 'react-router-dom'
import '../src'
import Header from './components/header/Header';
import DetailView from './components/details/DetailView';
import Update from '../src/components/create/Update'
import About from './components/About';
const PrivateRoute=({isAuthenticated, ...props})=>{
  return isAuthenticated ?
  <>
  <Header/>
  <Outlet/>
  </>
  :
  <Navigate replace to ='/login'/>
}


function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    
<DataProvider>
  <BrowserRouter>
  
  <div  style={{marginTop:64}}>
  <Routes>
    <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>}></Route>
    <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
    <Route path='/' element={<Home/>}></Route>

    </Route>


      <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
    <Route path='/create' element={<CreatePosts/>}></Route>
    </Route>

        <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
    <Route path='/details/:id' element={<DetailView/>}></Route>
    </Route>

     <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>

              <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>
</Routes>
</div>
</BrowserRouter>
</DataProvider>

      
    
  );
}

export default App;
