- replace .jsx with .tsx
- * as React from 'react';
- add type Props = {}; type State = {}
- declare types (ex: string, number, boolean, any, () => void)
- take out PropTypes
- take out Constructors
- replace this.state = {} with state = {};
- replace bind statements with arrow functions
- replace null with undefined
- declare local props
- correct any other prop and state errors
  - are all props found in the code also found in the declaration?
  - special case props (ex: style, onClick, and children)
- search for instances of the component in other files
  - are any of the props required?
  - are any of the props not being used in the code at all?
  - are any of the props appearing in the code but never declared or passed thru
- infer types of newly added props

`PropTypes` are not the authority on what props are actually being used.
`PropTypes` are a good starting point, but in reality it only matters what props are actually being used
`<Search>` was being passed a `buttonClick` prop that wasn’t in `PropTypes`