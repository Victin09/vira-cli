import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from '@components/navbar/navbar';
import { routes } from '@routes/index';

export const App = (): JSX.Element => (
    <div className="flex flex-col h-screen bg-gray-100">
        <Router>
            <Navbar></Navbar>

            <div className="flex-grow">
                {routes.map((route, index) => (
                    <Route key={index} {...route} />
                ))}
            </div>
        </Router>
    </div>
);

export default App;
