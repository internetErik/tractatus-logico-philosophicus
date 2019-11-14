import React from 'react';

import data from './data';

const generateText = ({ number, text, children }, i) => (
<div key={number || i} style={{ marginLeft: '10px', paddingLeft: '10px', borderLeft: '1px solid gray', }}>
  <p>{ number }</p>
  <p dangerouslySetInnerHTML={{ __html : text.ger }}></p>
  <p dangerouslySetInnerHTML={{ __html : text.ogd }}></p>
  <p dangerouslySetInnerHTML={{ __html : text.pmg }}></p>
  {children && children.map(generateText) }
</div>
)

const App = () => <div>
  { data.map(generateText) }
</div>

export default App;
