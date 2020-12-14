import React from 'react';
import {Link, Redirect } from 'react-router-dom';

import '../css/ShipmentList.css';

class ShipmentList extends React.Component {
    state={
        errorNoData: 'Please click load button and load some data'
    }

    renderList = () => {
        const { shipments } = this.props;
        if(shipments === null) {
            return <Redirect to={{ pathname: `/error`, state: { message: this.state.errorNoData } }} />;
        } 
        return shipments.map(shipment => {
            return (
                <Link 
                    className='shipmentListe-link' 
                    to={{ pathname: `/shipment/${shipment.id}`, state: { message: shipment } }} 
                    key={shipment.id} 
                >
                    <div className='shipmentList-link-container' >
                        <p  to={`/shipment/${shipment.id}`}>
                            {shipment.name}       
                        </p>
                    </div>
                    <Redirect to={{ pathname: `/` }} />
                </Link>
            );
        })
    }

    render() {
        return(
            <div className='shipmentList-container'>
               {this.renderList()}
            </div>
        );
    }
};

export default ShipmentList;