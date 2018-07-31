
The "slots" pattern is also useful for passing props through multiple levels, and can help you avoid having to reach for more complex things like Context or Redux just to get your data where it needs to be.

Perfect for if you ever need to pass multiple children to a React component, but want more control over the layout (ie, not all bunched together).

Yes, React allows you to pass children to a component by nesting them inside its JSX tag. These elements/'children', however, just wont cut it every time.

These cases are easy to accomplish with the SLOTS pattern... aka passing JSX into a prop.

https://daveceddia.com/pluggable-slots-in-react-components/?utm_campaign=0731slots