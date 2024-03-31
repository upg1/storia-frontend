'use client'
import React from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';
import Motif, { MotifLightTheme, MotifDarkTheme } from '@cylynx/motif';
import { Provider } from 'react-redux';
import '@cylynx/motif/dist/style.css';
import store from '../store'

const engine = new Styletron();

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={MotifLightTheme}>
        <Provider store={store}>
          <Motif
            name='Motif'
            primaryTheme={MotifLightTheme}
            secondaryTheme={MotifDarkTheme}
            accessors={{
              nodeID: 'id',
              edgeID: 'id',
              edgeSource: 'source',
              edgeTarget: 'target',
            }}
          />
        </Provider>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;


// import {useState, useEffect} from 'react'
// import { useReadCypher } from 'use-neo4j';
// import Record from 'neo4j-driver/types/record';

// // Define Node and Edge types
// interface Node {
//   id: string;
//   labels: string;
//   [key: string]: any;
// }

// interface Edge {
//   id: string;
//   source: string;
//   target: string;
//   erelationship: string;
//   [key: string]: any;
// }

// // Build node function
// const buildNode = (n: any): Node => {
//   let node: Node = {
//     id: `node-${n.identity.toString()}`,
//     labels: n.labels[0],
//   };
//   if (n.properties) {
//     for (let [key, value] of Object.entries(n.properties)) {
//       node[key] = value instanceof Neo4j.types.Integer ? value.toInt() : value;
//     }
//   }
//   return { ...node };
// };

// // Build edge function
// const buildEdge = (e: any): Edge => {
//   let edge: Edge = {
//     id: `edge-${e.identity.toString()}`,
//     source: `node-${e.start.toString()}`,
//     target: `node-${e.end.toString()}`,
//     erelationship: e.type,
//   };

//   if (e.properties) {
//     for (let [key, value] of Object.entries(e.properties)) {
//       edge[key] = value instanceof Neo4j.types.Integer ? value.toInt() : value;
//     }
//   }

//   return { ...edge };
// };

// // Convert records to Motif format function
// const toMotifFormat = (records: Record[]): GraphData => {
//   let nodes: Node[] = [];
//   let edges: Edge[] = [];
//   records.forEach((record) => {
//     Object.values(record.toObject()).map(async (v) => {
//       if (v instanceof Neo4j.types.Node) {
//         let node = buildNode(v);
//         try {
//           nodes.push(node);
//         } catch (e) {
//           console.log(e, 'error');
//         }
//       } else if (v instanceof Neo4j.types.Relationship) {
//         let edge = buildEdge(v);
//         edges.push(edge);
//       } else if (v instanceof Neo4j.types.Path) {
//         let startNode = buildNode(v.start);
//         let endNode = buildNode(v.end);

//         nodes.push(startNode);
//         nodes.push(endNode);

//         for (let obj of v.segments) {
//           nodes.push(buildNode(obj.start));
//           nodes.push(buildNode(obj.end));
//           edges.push(buildEdge(obj.relationship));
//         }
//       } else if (v instanceof Array) {
//         for (let obj of v) {
//           if (obj instanceof Neo4j.types.Node) {
//             let node = buildNode(obj);
//             nodes.push(node);
//           } else if (obj instanceof Neo4j.types.Relationship) {
//             let edge = buildEdge(obj);
//             edges.push(edge);
//           }
//         }
//       } else {
//         console.log('Invalid format');
//       }
//     });
//   });

//   return { nodes, edges };
// };

// // Your other components and functions...
// const MotifCanvas = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [motifRecords, setMotifRecords] = useState<GraphData | null>(null);

//   const query = `MATCH p=()-[:HAS_TAG]->() RETURN p LIMIT 25;`;
//   const { loading, records, error } = useReadCypher(query); // Include error
//   console.log('useReadCypher results:', loading, records, error); 

//   useEffect(() => {
//     if (!loading) { // Only proceed if not loading
//       if (error) {
//         console.error("Error fetching records:", error);
//       } else {
//         const formattedRecords = records  // Adjust formatting as needed
//         setMotifRecords(formattedRecords);
//         console.log("Records fetched:", formattedRecords);
//       }
//     }
//   }, [loading, records, error]); // Run when loading, records, or error change

//   return (
//     <div>
//       {isLoading ? <p>Loading...</p> : <p>Success!</p>} 
//       {/* Use motifRecords to display your graph data here */}
//     </div>
//   );
// };
// export default MotifCanvas;

