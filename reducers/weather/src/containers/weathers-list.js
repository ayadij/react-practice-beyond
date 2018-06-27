import React, { Component} from 'react';
import {connect} form 'react-redux';

eclass WeatherList extends Component {
    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temp</th>
                        <th>Pressure</th>
                        <th>Humidity</th>
                    </tr>
                </thead>
                <tbody>
                    <
                    
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({ weather }) {
    return { weather };
}

export default connect(mapStateToProps)(WeatherList)