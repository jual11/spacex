import React from 'react';
import '../css/Shipment.css';

class Shipment extends React.Component{
    state={
        boxesInput: this.props.location.state.message.boxes,
        data: this.props.location.state.message
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.location.state.message !== prevState.data) {
            const { boxes } = this.props.location.state.message
            const { message } = this.props.location.state
            this.setState({boxesInput: boxes, data: message})
        }     
    }

    renderCargo = () => {
        let baysRequired = 1;
        let currentBaySize = 0;
        let boxes = this.state.boxesInput;
        if(boxes === null) {
            return <div>There is no outgoing cargo for that company</div>;
        }
        const orderArray = boxes.split(',');
        const countItems = orderArray.length;
        let i;
        for (i = 0; i < countItems; i++) {
            var currentItem = parseFloat( orderArray[i] ); 
            if ( currentBaySize + currentItem > 10 ) {
                baysRequired++
                currentBaySize = currentItem
            } else {
                currentBaySize += currentItem
            }
        }
        return(
            <div>
                <p className='shipment-cargoBays'>Number of required cargo bays: <b>{baysRequired}</b></p>
                <input className='shipment-boxesInput' onChange={e => this.setState({boxesInput: e.target.value})} value={this.state.boxesInput}></input>
            </div>
        );  
              
    }

    renderContent = () => {
        const { name, email } = this.state.data
        return(
            <div>
               <h2 className='shipment-companyName'>{name}</h2>
               <p className='shipment-companyEmail'>{email}</p>
                {this.renderCargo()}
            </div>
        )
    }

    render() {
        if (this.state.data) {
            return(
                <div className='shipment-container'>
                   {this.renderContent()}
                </div>
            );    
        }
        return;     
    }  
};

export default Shipment;