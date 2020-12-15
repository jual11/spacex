import React from 'react';

import '../css/Header.css'; 
import spacex from '../apis/spacex';
import history from '../history';

class Header extends React.Component {
    state={
        data: JSON.parse(localStorage.getItem('data1')),
        searchTerm: '',
        errorNoCompany: 'There is no company with that name in our database. Please try to insert company name again or select company from the list'  
    }

    capitalizeFirstLetter = (term) => {
        const newTerm = term.charAt(0).toUpperCase() + term.slice(1);
        console.log(newTerm)
    }
      
      

    onSubmit = (event) => {
        event.preventDefault();
        const { searchTerm, data } = this.state;
        const upperCaseTerm =  searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);

        if (upperCaseTerm) {
            let singleCompany = data.find(o => o.name === upperCaseTerm);
            if(singleCompany === undefined) {
                history.push({ pathname: `/error`, state: { message: this.state.errorNoCompany }})
                return;
            }
            history.push({ pathname: `/shipment/${singleCompany.id}`, state: { message: singleCompany }})
            return;
        }
        return;
    }

    onLoadClick = () =>  async () => {
        const response = await spacex.get('/'); 
        this.setState({data: response.data});
        this.props.onLoad(this.state.data);
    }

    onSaveClick = () => {
        localStorage.setItem('data1', JSON.stringify(this.state.data))
    }

    render() {
        return(
            <div className='header-container'>
               <h1  className='header-title'>Cargo Planner</h1>
               <form onSubmit={this.onSubmit} className='header-search-container'>
                   <input onChange={e => this.setState({searchTerm: e.target.value})} value={this.state.searchTerm} className='header-search'/>
               </form>
               <div className='header-actionBtn-container'>
                   <button onClick={this.onLoadClick()} className='header-actionBtn'>Load</button>
                   <button onClick={this.onSaveClick} className='header-actionBtn header-actionBtn--save'>Save</button>
                   
               </div>
               
            </div>
        );
    }  
};

export default Header;