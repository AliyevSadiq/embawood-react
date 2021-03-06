import React from "react";
import { Route, Redirect } from "react-router-dom";
import cookie from 'react-cookies';

 const ProtectedRoute = ({
                                   component: Component,
                                   ...rest
                               }) => {
    return (

        <Route
            {...rest}
            render={props => {

                if (cookie.load('token')) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};
export default ProtectedRoute;