import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app";
import {Provider} from "react-redux";
import {store} from "./store";
import ErrorBoundry from "./components/error-boundry";
import EmbawoodApi from "./service/embawood-api";
import {EmbawoodServiceProvider} from "./components/service-context/service-context";
import {BrowserRouter as Router} from "react-router-dom";
const embawoodApi=new EmbawoodApi();



ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <EmbawoodServiceProvider value={embawoodApi}>
                <Router>
                    <App/>
                </Router>
            </EmbawoodServiceProvider>
        </ErrorBoundry>
    </Provider>,
  document.getElementById('root')
);


