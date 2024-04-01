import React from 'react'; // You might already have this import

function ReactFlowZettelNode({ data }) { // Component to render a single node
  return (
    <div>
      <div className="custom-node__header">
        Influencer
      </div>
      <div className="custom-node__body">
        <h3>{data.title}</h3> 
        <p>{data.body}</p> 
      </div>
     
    </div>
  );
}

export default ReactFlowZettelNode