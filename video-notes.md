# REACT NOTES

How do you tell React to re-render?
this.setState


Class vs. Function (??)



====================================================================
## PROPS


## STATE
: plain js object that is used to record and react to user events
Each class based component that we define has its own state object
Whenever a components state is changed, the component immediately re renders and also forces all of its children to re render as well


====================================================================


Redux
JSX
WebPack
AJAX
Axios
JQuery
React Router
Wagtail
Apollo
MobX


==================================================================
## Packages

pytz
Django
boto
six
python-dateutil
docutils
jmespath
botocore
s3transfer
boto3
django-cors-headers
rjsmin
rcssmin
django-appconf
django-compressor
django-environ
libsass
django-libsass
redis
django-redis
django-storages
greenlet
gevent
singledispatch
iso8601
rx
typing
promise
graphql-core
graphql-relay
aniso8601,graphene
graphene-django
gunicorn
parso
jedi
pickleshare
backcall
wcwidth
prompt-toolkit
pygments
ptyprocess
pexpect
decorator
ipython-genutils
traitlets
simplegeneric
ipython
newrelic
psycogreen
psycopg2
raven
django-taggit
django-modelcluster
l18n
Pillow
Unidecode
Willow
webencodings
html5lib
beautifulsoup4
urllib3
idna
chardet
certifi
requests
djangorestframework
draftjs-exporter
django-treebeard
wagtail

====================================================================
#### Functional component

const SearchBar() = {
  return (
    <div>Hello World!<div>  
  );
}

#### Class component 
— when you want the concept of state

class SearchBar extends React.Component {
  render() {
    return <input />           //must return jsx
  }

}


====================================================================

import React, {component} from ‘react’;


====================================================================

event handler,


====================================================================

We want the most parent component to be responsible for fetching data



====================================================================
## Converting a Function to a Class

- You can convert a functional component like Clock to a class in five steps:
- Create an ES6 class, with the same name, that extends React.Component.
- Add a single empty method to it called render().
- Move the body of the function into the render() method.
- Replace props with this.props in the render() body.
- Delete the remaining empty function declaration.

## Convertinga a Class to a Function

- create a function with the same name as the class and pass in props     function ImageModal(props) {}
- create a return function                                                return ();
- move the body of the render method into the return function
- take out all of the `this.props` and replace with just `props`.


====================================================================
## BIND

Here is an example of a .bind

`this.showModal = this.showModal.bind(this);`

This line is necessary because showModal()'s body contains the word `this`.




====================================================================
## HANDLING EVENTS

just know that in React, whenever you define an event handler that uses this, you need to add this.methodName = this.methodName.bind(this) to your constructor function.




====================================================================
## 2 types of state: application state and component state

### Unidirectional Data Flow: 
All data in our applications flow in a single direction. In React it flows down the tree from parent to child. This makes tracking the source and destination easy compared to other architectures where data may be coming from many parts of the application.

### Application State: 
The state or data in our application that is core to the functionality of the application as a whole. This usually includes a list of the models and data being manipulated by the interface. If we were to reload our application, the Application state is what we would like to persist the most

### Local Component State: 
This is state that is used to allow a component to function. Local component state is typically not used by other components in the application, and is less important to persist if the application resets.


====================================================================
## .this
different than even vanilla js

in reference to the instantiated component




====================================================================

Redux takes care of APPLICATION STATE which is not the same as state in each component
formed by reducers

reducers are in charge of manipulating application state

has pieces of state
that is produced by reducers
reducers produce the value of state

(1) create reducer, then (2) wire it into the application 
in index.js

funtion() {
  return [
    { title: 'book of books'},
    { title: 'booking around'},
    { title: 'book book'},
    { title: 'how was has wihtoug '},
  ]
}


plug in application state

application state is generated by reducer function

react views and redux state
combining separate libraries react reduxcs redux

data (redux) + views (react)


container VS component --
- component that doenst have a handle on the state that is stored in redux is referred to as DUMB
- only the most parent component that cares about the state 
- containers are the link between redux and react

==============================================================
(udemy)
d
```import{ connect } from 'react-redux';```
connect takes a function and a component and produces a container
a container is a component that is aware of the state stored by redux
```fuction mapStateToProps(state) { return { books: state.books }; }```
the mapStateToProps function is key here. 
the first argument is a state
it returns and object
whatever object is returned is available to the component as ```this.props```


==============================================================
## ACTIONS AND ACTION CREATORS (udemy)

call an ACTION CREATER == a function that returns an action
action is a as an object that flows thru reducers
the action is sent to all the reducers in the application
inside of each reducers, set up SWITCH STATEMENT 
reducer doesnt have to react to each action. it can return just the state as it was
the newly returned value is state
whatever is returned by the reducer becomes the new value of the state
the newly assembled state gets pumped back into the containers and gets rerunned/rerendered with the new data
then application is refreshed and waiting for next action
actions must always have a TYPE defined. convention is to define PAYLOAD.


SIMPLY:
- event is triggered by user
- call an action creater
- retuns an action
- action flows thru reducers
- redcers assemble the new state
- the new satae flows into the new containers


actions must always return a type
convention is to create a single varaible that holds the action type
import that variable into the action type. single source
that way it is not a string.


==============================================================
## BINDING ACTION CREATORS


```import { bindActionCreators } from 'redux';```

```js
funtion mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectBook: selectBook }, dispatch)
}
```

takes actions, ameks sure they get passed to reducers throughout acdakkkwl

many ways to use 

you want to get state and map to props.


==============================================================
USABLEcutesleect

==============================================================


Consuming actions in reducers:
Reducer 

every action must have a TYPE PROPERTY that describes the purpose of the action.
PAYLOAD describes the action that is being undertaken; more information


```js
export default function(state, action) {
  state += 1
  return state;
}
```

==============================================================
## COMPONENT --> CONTAINER
container speaks with state
rely on redux instead of AJAX calls?


==============================================================
## WHAT IS REACT? 
Officially - js library for building user interfaces
Unofficially - a js library that makes it really easy to develope responsive web pages
developed by FB
rival: angular

components are fundimental building blocks for react
internal state, external props


==============================================================

a list is an array of objects
snapsotsdssdasfdasdfsasdffdsadsfasdf


## REDUX PROMISE
npm install --save redux-promise



==============================================================
## SPA
single page application
just showing different sets of components instead of entirely different html pages


==============================================================
## COMPONENTS

rcc - react create class

Component
- normal component

Pure Component
- no deep checking
- getting new props but doesnt rerender 
- why did you update 
- prevents unnecessary rerenders
- micro optomization


stateless functional component
- most common
- stateless and just a function
- defining it as a constant function equal to an arrow function
- doesnt have state or lifecycle methods or any extra stuff
- returns simple jsx


<React.Fragment>
<> 
yarn upgrage @babel/core @babel/plugin-transform-react-jsx
</>
</React.Fragment>



==============================================================

### docker
Docker CE for Mac is an easy-to-install desktop app for building, debugging, and testing Dockerized apps on a Mac. Docker for Mac is a complete development environment deeply integrated with the Mac OS Hypervisor framework, networking, and filesystem. Docker for Mac is the fastest and most reliable way to run Docker on a Mac.
- ayadij
- H2




=============================================================

### Wikipedia 
##### simple discription

React (JavaScript library)
From Wikipedia, the free encyclopedia

React

Original author:	Jordan Walke

Developers:	Facebook and community

Initial release:	March 2013; 5 years ago

Repository: https://github.com/facebook/react

Written in	JavaScript

Platform:	Cross-platform

Size:	109 KiB production, 710 KiB development

Type:	JavaScript library

License:	MIT License

Website:	reactjs.org


In computing, React (also known as React.js or ReactJS) is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.
React can be used as a base in the development of single-page or mobile applications. Complex React applications usually require the use of additional libraries for state management, routing, and interaction with an API.






