   var Counter = React.createClass({
    getDefaultProps: function() {
        console.log('getDefaultProps');
        return {
            title: 'Basic counter!!!'
        }
    },
    
    getInitialState: function() {
        console.log('getInitialState');
        return {
            count: 0
        }
    },

    render: function() {
        console.log('render');
        return (
            <div>
                <h1>{this.props.title}</h1>
                <div>{this.state.count}</div>
                <input type='button' value='+' onClick={this.handleIncrement} />
                <input type='button' value='-' onClick={this.handleDecrement} />
            </div>
        );
    },
    
    handleIncrement: function() {
        var newCount = this.state.count + 1;
        this.setState({count: newCount});
    },
    
    handleDecrement: function() {
        var newCount = this.state.count - 1;
        this.setState({count: newCount});
    },
    
    propTypes: {
        title: React.PropTypes.string
    }
});

ReactDOM.render(
    React.createElement(Counter),
    document.getElementById('app-container')
);