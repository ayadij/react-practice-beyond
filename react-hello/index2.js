import React from 'react'

var Fav = React.createClass({
    render: function(){
        return <span>My favorite number is </span>
    }
})

var Number = React.createClass({
    propTypes: {
        myprop: React.PropTypes.string.isRequired
    },
    render: function() {
        return <span>{this.props.myprop || '22'}!</span>
    }
})

export default React.createClass({
    render: function(){
        return <div><Fav /><Number myprop={5} /></div>
    }
})