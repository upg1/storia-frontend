import React from 'react'; // You might already have this import
import { Handle, Position } from 'reactflow';


function ReactFlowZettelNode({ id, data }) { // Component to render a single node
  return (
    <div>
      <div className="custom-node__header">
        Influencer
      </div>
      <div className="custom-node__body">
        <h3>{id}</h3> 
        <p>{data.description}</p> 
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
     
    </div>
  );
}

export default ReactFlowZettelNode