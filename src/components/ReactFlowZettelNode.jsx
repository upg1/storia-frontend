import React from 'react'; // You might already have this import

function ReactFlowZettelNode({ data }) { // Component to render a single node

  console.log(data)
  return (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      <h3>{data.title}</h3> 
      <p>{data.body}</p> 
    </div>
  );
}

export default ReactFlowZettelNode