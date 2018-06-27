import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {term: '' };

        this.onInputChanges = this.onInputChanges.bind(this); //or bind with callback fat arrow function
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChanges(event) {
        console.log(event.target.value);
        this.setState({ term: event.target.value });
    }

    onFormSubmit(event) {
        event.preventDefault(); //tells browser not to submit form
        
        this.props.fetchWeather(this.state.term);
        this.setState({ term: '' });
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);


//https://www.udemy.com/react-redux/learn/v4/t/lecture/4284590?start=0
//halfway thru