```js
React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		age: React.PropTypes.number, // optional
		parent: React.PropTypes.object.isRequired
	},
	render: function() {
		...
	}
})
```

When React renders this component, it will check the passed props and make sure they match propTypes. If they don’t, you’ll get a warning in the console.