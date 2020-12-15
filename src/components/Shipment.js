import React, { Fragment, useEffect, useRef, useState } from 'react';
import '../css/Shipment.css';

const Shipment = (props) => { 
    const [isSticky, setSticky] = useState(false);
    const [boxesInput, setBoxesInput] = useState(props.location.state.message.boxes);
    const [data, setData] = useState(props.location.state.message);

    const ref = useRef(null);
    const handleScroll = () => {
        if (ref.current) {
        setSticky(ref.current.getBoundingClientRect().top <= 0);
        }
    };

    useEffect(() => {
            setBoxesInput(props.location.state.message.boxes)
            setData(props.location.state.message)
    }, [props.location.state.message]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

    const renderCargo = () => {
        let baysRequired = 1;
        let currentBaySize = 0;
        if(boxesInput === null) {
            return <div>There is no outgoing cargo for that company</div>;
        }
        const orderArray = boxesInput.split(',');
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
                <input className='shipment-boxesInput' onChange={e => setBoxesInput(e.target.value)} value={boxesInput}></input>
            </div>
        );           
    }

    const renderContent = () => {
        return(
            <div>
               <h2 className='shipment-companyName'>{data.name}</h2>
               <p className='shipment-companyEmail'>{data.email}</p>
                {renderCargo()}
            </div>
        )
    }

    if (data) {
        return(
            <Fragment>
                <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
                    <div className=" shipment-container sticky-inner"> 
                        {renderContent()}
                        
                    </div>
                </div>
            </Fragment>          
        );    
    }
    return;         
};

export default Shipment;