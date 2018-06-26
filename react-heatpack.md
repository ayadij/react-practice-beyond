Under the Hood: What is react-heatpack doing?
react-heatpack sets up a Webpack build that automatically recompiles whenever index.js changes. The other thing it provides is an auto-generated index.html file that contains the standard html, head, and body tags, as well as a div with id 'root'. This root div is where the root component gets rendered, with a call like 
```ReactDOM.render(YourExportedComponent,``` 
```document.querySelector('#root'))```.

