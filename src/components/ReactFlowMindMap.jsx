import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostGraphData } from '../store/reducers/postGraphSlice';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import ZettelNode from '../components/ReactFlowZettelNode';
import data from '../zettels.json'; 
import 'reactflow/dist/style.css'; 

const isDraggable = true;

const initialNodes = data.nodes.map(({ id, ...restOfNode }) => ({
  id,
  type: 'customNode',
  data: restOfNode,
  position: { 
    x: Math.random() * 400, 
    y: Math.random() * 300 
  }, 
}));

const initialEdges = data.edges.map((edge) => ({
  ...edge,
  id: `${edge.source}-${edge.target}`,
}));

function ReactFlowMindMap() {
  const dispatch = useDispatch();
  const { graphData, isLoading, error } = useSelector((state) => state.posts);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    dispatch(fetchPostGraphData());
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    if (graphData && !nodes.length) {
      const processedNodes = graphData.influencers.nodes.map(({ id, data }) => ({
        id,
        type: 'customNode',
        data,
        position: {
          x: Math.random() * 400,
          y: Math.random() * 300
        },
      }));
      setNodes(processedNodes);
      setEdges(graphData.influencers.edges);
    }
  }, [graphData, nodes]); // Run this effect whenever graphData or nodes change

  if (isLoading) {
    return <div>Loading graph data...</div>; 
  }

  if (error) {
    return <div>Error fetching data: {error}</div>; 
  }

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