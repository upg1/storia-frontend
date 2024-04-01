'use client'
import React, { useEffect, useState, useCallback} from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, applyNodeChanges, applyEdgeChanges} from 'reactflow';
import ZettelNode from '../components/ReactFlowZettelNode'
import 'reactflow/dist/style.css'; 
import data from '../zettels.json'; 

const isDraggable = true

const initialNodes = data.nodes.map(({ id, ...restOfNode }) => ({
  id, // Keep the id at the top level
  type: 'customNode',
  data: restOfNode, // Nest the rest of the properties within 'data'
  position: { 
    x: Math.random() * 400, 
    y: Math.random() * 300 
  }, 
}));

const initialEdges = data.edges.map((edge) => ({
  ...edge,
  id: `${edge.source}-${edge.target}`, // Construct composite ID
  handle: 'default', //Set source handle to be default on all edges.
}));


function ReactFlowMindMap() {
  const [nodes, setNodes] = useNodesState([initialNodes]); 
  const [edges, setEdges] = useEdgesState([initialEdges]);

  useEffect(() => {
  }, []);  

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  return (
    <ReactFlow  
       nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        connectionMode="loose"
      nodeTypes={{ customNode: ZettelNode }} 
      fitView 
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  ); 
}

export default ReactFlowMindMap