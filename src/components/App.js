import React from 'react';
import { Router, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './Header';
import ShipmentList from './ShipmentList';
import Shipment from './Shipment';
import Error from './Error';
import '../css/App.css';
import history from '../history';

const App = () => {
    const [shipments, setShipments] = useState(JSON.parse(localStorage.getItem('data1')));
    
    return (
        <div>      
            <Router history={history}> 
                <div>
                    <Header  onLoad={values => setShipments(values)} />
                    <div>
                        <div className='mob'>
                            <Route path='/shipment/:id' exact component={Shipment}/>
                            <Route path='/error' exact component={Error}/>  
                            <ShipmentList shipments={shipments}/>
                        </div>
                        <div className='desktop content-container'>
                            <ShipmentList shipments={shipments}/>
                            <Route path='/shipment/:id' exact component={Shipment}/>
                            <Route path='/error' exact component={Error}/>                
                        </div>
                        
                    </div>
                </div>
            </Router>
        </div>
    );
    
}

export default App;