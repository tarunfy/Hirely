import React, {useState} from 'react';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import {Route, Switch, Redirect} from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  return (
   <>
   <Navbar/>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/signin" render={(props)=> !currentUser ? <Signin {...props}/> : <Redirect to="/dashboard"/>}/>
    <Route exact path="/signup" render={(props)=> !currentUser ? <Signup {...props}/> : <Redirect to="/dashboard"/>}/>
    <Route exact path="/dashboard" render={(props)=> currentUser ? <Dashboard {...props}/> : <Redirect to="/signin"/>}/>
    </Switch>
   </>
  );
}

export default App;