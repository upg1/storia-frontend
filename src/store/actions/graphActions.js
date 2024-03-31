export const loadGraphData = (data) => {
  return {
    type: 'LOAD_GRAPH_DATA',
    payload: data,
  };
};