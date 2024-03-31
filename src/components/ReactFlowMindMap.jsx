'use client'
import React, { useEffect, useState, useCallback} from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, applyNodeChanges, applyEdgeChanges} from 'reactflow';
import ZettelNode from '../components/ReactFlowZettelNode'
import 'reactflow/dist/style.css'; 
import data from '../zettels.json'; 

const isDraggable = true

function ReactFlowMindMap() {
  const [nodes, setNodes] = useNodesState([]); 
  const [edges, setEdges] = useEdgesState([]);

  useEffect(() => {
    const processedNodes = data.nodes.map(({ id, ...restOfNode }) => ({
      id, // Keep the id at the top level
      type: 'customNode',
      data: restOfNode, // Nest the rest of the properties within 'data'
      position: { 
        x: Math.random() * 400, 
        y: Math.random() * 300 
      }, 
    }));

      const processedEdges = data.edges.map((edge) => ({
      ...edge,
      id: `${edge.source}-${edge.target}`, // Construct composite ID
    }));

  setNodes(processedNodes);
  setEdges(processedEdges);
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