import React from 'react';
import Header from "../header";
import {Route,Switch} from "react-router-dom";
import HomePage from "../pages/home-page";
import ProtectedRoute from "../route/protected-route";
import PrivateRoute from "../route/private-route";
import CreatePage from "../pages/create-page";
import LoginPage from "../pages/login-page";
import RegisterPage from "../pages/register-page";
import cookie from 'react-cookies';
import EditPage from "../pages/edit-page";

const App=()=>{
    return (
        <div className="container">
            <Header/>

            <Switch>
                <Route exact path="/" component={HomePage}/>
                <ProtectedRoute component={CreatePage} exact path='/create' />
                <ProtectedRoute component={EditPage} exact path='/edit/:id' />
                <PrivateRoute exact path="/login" component={LoginPage} />
                <PrivateRoute exact path="/register" component={RegisterPage} />
                <Route exact path="/logout" render={()=>{cookie.remove('token');window.location.href='/';}}/>
                <Route render={()=>{return(<p>PAGE NOT FOUND</p>)}}/>
            </Switch>
        </div>
    )


}

export default App;
