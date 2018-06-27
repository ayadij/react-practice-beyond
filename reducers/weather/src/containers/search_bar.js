import React, { Component } from 'react';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {term: '' };

        this.onInputChanges = this.onInputChanges.bind(this); //or bind with callback fat arrow function
    }

    onInputChanges(event) {
        console.log(event.target.value);
        this.setState({ term: event.target.value });
    }

    onFormSubmit(event) {
        event.preventDefault(); //tells browser not to submit form
        this.setState({});
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className='input-group'> 
                <input 
                    placeholder='Get a five-day forcast in your favorite cities'
                    className='form-control'
                    value={this.state.term}
                    onChange={this.onInputChanges}/>
                <span className='input-group-btn'>
                    <button type='submit' className='btn btn-stationary'>Submit</button>
                </span>    
            </form>
        );
    }
}


//https://www.udemy.com/react-redux/learn/v4/t/lecture/4284590?start=0
//halfway thru