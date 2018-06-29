
---

# Basic Methods


| Prefix | Method |
 --- | --- 
| imp→ | import moduleName from 'module' |
| imn→ |  import 'module' |
| imd→ |  import { destructuredModule } from 'module' |
| ime→ |  import * as alias from 'module' |
| ima→ |  import { originalName as aliasName} from 'module' |
| exp→ |  export default moduleName |
| exd→ |  export { destructuredModule } from 'module' |
| exa→ |  export { originalName as aliasName} from 'module' |
| enf→ |  export const functionName = (params) => { } |
edf→  |  export default (params) => { }
met→  |  methodName = (params) => { }
fre→  |  arrayName.forEach(element => { }
fof→  |  for(let itemName of objectName { }
fin→  |  for(let itemName in objectName { }
anfn→  | (params) => { }
nfn→  |  const functionName = (params) => { }
dob→  |  const {propName} = objectToDescruct
dar→  |  const [propName] = arrayToDescruct
sti→  |  setInterval(() => { }, intervalTime
sto→  |  setTimeout(() => { }, delayTime
prom→  | return new Promise((resolve, reject) => { }
cmmb→  | comment block
cp→  | const { } = this.props
cs→  | const { } = this.state
clg→  | console.log(object)

---

# React Methods

Prefix | Method
 --- | ---
imr→  |  import React from 'react'
imrc→  | import React, { Component } from 'react'
imrcp→  |  import React, { Component } from 'react' & import PropTypes from 'prop-types'
imrpc→  |  import React, { PureComponent } from 'react'
imrpcp→  | import React, { PureComponent } from 'react' & import PropTypes from 'prop-types'
impt→  | import PropTypes from 'prop-types'
redux→   | import { connect } from 'react-redux'
rconst→  | constructor(props) with this.state
rconc→   | constructor(props, context) with this.state
est→  |  this.state = { }
cwm→  |  componentWillMount = () => { } DEPRECATED!!!
cdm→  |  componentDidMount = () => { }
cwr→  |  componentWillReceiveProps = (nextProps) => { } DEPRECATED!!!
scu→  |  shouldComponentUpdate = (nextProps, nextState) => { }
cwup→  | componentWillUpdate = (nextProps, nextState) => { } DEPRECATED!!!
cdup→  | componentDidUpdate = (prevProps, prevState) => { }
cwun→  | componentWillUnmount = () => { }
cwun→  | componentWillUnmount = () => { }
gdsfp→  |  static getDerivedStateFromProps(nextProps, prevState) { }
gsbu→  | getSnapshotBeforeUpdate = (prevProps, prevState) => { }
ren→   | render() { return( ) }
sst→   | this.setState({ })
ssf→   | this.setState((state, props) => return { })
props→  |  this.props.propName
state→  |  this.state.stateName
rcontext→  | const ${1:contextName} = React.createContext()
cref→  | this.${1:refName}Ref = React.createRef()
fref→  | const ref = React.createRef()
bnd→   | this.methodName = this.methodName.bind(this)

---

# Redux Methods


Prefix | Method
 --- | ---
rxaction→  | redux action template
rxconst→  | export const $1 = '$1'
rxreducer→  | redux reducer template
rxselect→  | redux selector template



---

# Proptypes Methods


Prefix | Method
 --- | ---
pta→  |  PropTypes.array
ptar→ |  PropTypes.array.isRequired
ptb→   | PropTypes.bool
ptbr→  | PropTypes.bool.isRequired
ptf→   | PropTypes.func
ptfr→  | PropTypes.func.isRequired
ptn→   | PropTypes.number
ptnr→  | PropTypes.number.isRequired
pto→   | PropTypes.object
ptor→  | PropTypes.object.isRequired
pts→   | PropTypes.string
ptsr→  | PropTypes.string.isRequired
ptnd→  | PropTypes.node
ptndr→  |  PropTypes.node.isRequired
ptel→  | PropTypes.element
ptelr→  |  PropTypes.element.isRequired
pti→  |  PropTypes.instanceOf(name)
ptir→  | PropTypes.instanceOf(name).isRequired
pte→  |  PropTypes.oneOf([name])
pter→  | PropTypes.oneOf([name]).isRequired
ptet→  | PropTypes.oneOfType([name])
ptetr→  |  PropTypes.oneOfType([name]).isRequired
ptao→  | PropTypes.arrayOf(name)
ptaor→  |  PropTypes.arrayOf(name).isRequired
ptoo→  | PropTypes.objectOf(name)
ptoor→  |  PropTypes.objectOf(name).isRequired
ptsh→  | PropTypes.shape({ })
ptshr→  |  PropTypes.shape({ }).isRequired
ptany→  |  PropTypes.any
ptypes→ |  static propTypes = {}




---

rcc

```javascript
import React, { Component } from 'react'

export default class FileName extends Component {
  render() {
    return <div>$2</div>
  }
}
```



rce

```javascript
import React, { Component } from 'react'

export class FileName extends Component {
  render() {
    return <div>$2</div>
  }
}

export default $1
```



rcep

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class FileName extends Component {
  static propTypes = {}

  render() {
    return <div>$2</div>
  }
}

export default $1
```



rpc

```javascript
import React, { PureComponent } from 'react'

export default class FileName extends PureComponent {
  render() {
    return <div>$2</div>
  }
}
```



rpcp

```javascript
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class FileName extends PureComponent {
  static propTypes = {}

  render() {
    return <div>$2</div>
  }
}
```



rccp

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FileName extends Component {
  static propTypes = {
    $2: $3,
  }

  render() {
    return <div>$4</div>
  }
}
```



rfe

```javascript
import React from 'react'

const $1 = props => {
  return <div>$0</div>
}

export default $1
```



rfep

```javascript
import React from 'react'
import PropTypes from 'prop-types'

const $1 = props => {
  return <div>$0</div>
}

$1.propTypes = {}

export default $1
```



rfc

```javascript
import React from 'react'

export default () => {
  return <div>$0</div>
}
```



rfcp

```javascript
import React from 'react'
import PropTypes from 'prop-types'

export default () => {
  return <div>$0</div>
}

$1.propTypes = {}
```



rcredux

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class FileName extends Component {
  static propTypes = {
    $2: $3,
  }

  render() {
    return <div>$4</div>
  }
}


const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileName)
reduxmap
const mapStateToProps = state => ({})

const mapDispatchToProps = {}
```


cmmb

```javascript
/**
|--------------------------------------------------
| $1
|--------------------------------------------------
*/
```


---



Supported languages (file extensions)
- JavaScript (.js)
- JavaScript React (.jsx)
- TypeScript (.ts)
- TypeScript React (.tsx)








