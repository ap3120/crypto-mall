import 'regenerator-runtime/runtime';
import React, {useState, useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/global.css';
// react router
import {BrowserRouter as Router, Switch, Routes, Route, Link} from "react-router-dom";

// Components
import {Navbar} from './components/Navbar.js';
import {Home} from './components/Home.js';
import {PCandElectronics} from './components/PCandElectronics.js';
import {Clothing} from './components/Clothing.js';
import {Books} from './components/Books.js';
import {Sport} from './components/Sport.js';
import {Basket} from './components/Basket.js';
import {Orders} from './components/Orders.js';

export default function App({ isSignedIn, contractId, wallet }) {

    return (
        <Router>
            <Navbar isSignedIn={isSignedIn} contractId={contractId} wallet={wallet}/>
            <Routes>
                <Route path='/' element={<Home isSignedIn={isSignedIn} contractId={contractId} wallet={wallet}/>}/>
                <Route path='/pc-and-electronics' element={<PCandElectronics isSignedIn={isSignedIn} contractId={contractId} wallet={wallet}/>}/>
                <Route path='/clothing' element={<Clothing isSignedIn={isSignedIn} contractId={contractId} wallet={wallet}/>}/>
                <Route path='/books' element={<Books isSignedIn={isSignedIn} contractId={contractId} wallet={wallet}/>}/>
                <Route path='/sport' element={<Sport isSignedIn={isSignedIn} contractId={contractId} wallet={wallet}/>}/>
                <Route path='/basket' element={<Basket isSignedIn={isSignedIn} contractId={contractId} wallet={wallet}/>}/>
                <Route path='/orders' element={<Orders isSignedIn={isSignedIn} contractId={contractId} wallet={wallet}/>}/>
            </Routes>
        </Router>
    )    
}
