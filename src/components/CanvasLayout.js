'use client'; 
import React, { useState, useEffect } from 'react'; // We'll need useEffect
import dynamic from 'next/dynamic'; 
import zettelsData from '../zettels.json'; 

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
 ssr: false 
});




const CanvasLayout = () => { 
 const [graphData, setGraphData] = useState(null);

 const createLinkColor = () => {
    return 'red'; // Bright red color
  };



 useEffect(() => {
  // Directly transform your data 
  const nodes = zettelsData.nodes; 
  const links = zettelsData.links;


  // ... transform data ...
  setGraphData({ 
    nodes: nodes,  // Nest nodes within a 'nodes' property
    links: links   // Nest links within a 'links' property
  });
  
  }, []); 

 return (
        <div>
            {graphData && (
                <ForceGraph2D
                    graphData={graphData}
                    linkColor={createLinkColor}
                    nodeLabel="title"
                    linkWidth={2}  // Example: Set link width 
                    linkCurvature={0.2} // Example: Add some curvature
                />
            )}
        </div>
    );
};

export default CanvasLayout;

