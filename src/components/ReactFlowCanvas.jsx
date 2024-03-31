import { useCallback } from 'react';
import ReactFlow, {
 MiniMap,
 Controls,
 Background,
 useNodesState,
 useEdgesState,
 addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

function ReactFlowCanvas({ nodes, edges }) { // Accept nodes and edges as props
 const [localNodes, setNodes, onNodesChange] = useNodesState(nodes); 
 const [localEdges, setEdges, onEdgesChange] = useEdgesState(edges);

 const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

 return (
  <ReactFlow
   nodes={localNodes} // Use the provided nodes
   edges={localEdges} // Use the provided edges
   onNodesChange={onNodesChange}
   onEdgesChange={onEdgesChange}
   onConnect={onConnect}
  >
   <MiniMap />
   <Controls />
   <Background />
  </ReactFlow>
 );
}

export default ReactFlowCanvas;
