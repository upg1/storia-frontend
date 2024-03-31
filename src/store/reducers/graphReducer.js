const initialState = {
  nodes: [],
  edges: [],
};

function graphReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_GRAPH_DATA':
      return {
        ...state,
        nodes: action.payload.nodes,
        edges: action.payload.edges,
      };
    default:
      return state;
  }
}

export default graphReducer;