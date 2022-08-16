import create from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'react-flow-renderer';

const useStore = create((set, get) => ({
  endpointsList: [],
  fetchSampleDataFunc: null,
  nodes: [],
  edges: [],
  currentSource: null,
  zoom: 1,
  enteredNode: null,
  nodeEndpointMap: {},
  counter: 1,
  createWorkflowTest: null,
  editWorkflowTest: null,
  editWorkflowNodeDetails: null,
  originalState: null,
  runWorkflowTest: null,
  fetchWorkflowResult: null,
  setUtilityFuncs: (newCreateWorkflowTest, newEditWorkflowTest, newEditWorkflowNodeDetails, runWorkflowTest, fetchWorkflowResult) => {
    set({
      createWorkflowTest: newCreateWorkflowTest, 
      editWorkflowTest: newEditWorkflowTest, 
      editWorkflowNodeDetails: newEditWorkflowNodeDetails,
      runWorkflowTest: runWorkflowTest,
      fetchWorkflowResult: fetchWorkflowResult
    })
  }, 
  setOriginalState: (originalStateFromDb) => {
    set({
      originalState: originalStateFromDb,
      counter: originalStateFromDb.lastEdited,
      nodes: originalStateFromDb.nodes.map(x => JSON.parse(x)),
      edges: originalStateFromDb.edges.map(x => JSON.parse(x)),
      nodeEndpointMap: {...originalStateFromDb.mapNodeIdToWorkflowNodeDetails}
    })
  },
  incrementCounter: () => {
    set({
      counter: (get().counter + 1)
    })
  },
  addNodeEndpoint: (nodeId, endpointData) => {
    let ret = get().nodeEndpointMap
    ret[nodeId] = endpointData
    set({
      nodeEndpointMap: ret
    })
  },
  setApiType: (nodeId, apiType) => {
    let ret = get().nodeEndpointMap
    let endpointData = ret[nodeId]
    if (!endpointData) return
    endpointData["type"] = apiType
    console.log(ret[nodeId]["type"]);
    set({
      nodeEndpointMap: ret
    })
  },
  setEndpointsList: (newList, newFetchSampleDataFunc) => {
    set({
      endpointsList: newList,
      fetchSampleDataFunc: newFetchSampleDataFunc
    })
  },
  setZoom: (newZoom) => {
    set({
      zoom: newZoom
    })
  },
  setEnteredNode: (newNode) => {
    set({
      enteredNode: newNode
    })
  },
  addNode: (newNode, newEdge) => {
    set({
      nodes: [
        ...get().nodes,
        newNode
      ]
    })
    set({
      edges: addEdge(
        newEdge,
        get().edges
      )
    })

  },
  setCurrentSource: (newSourceNode) => {
    set({
      currentSource: newSourceNode
    })
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes)
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges)
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges)
    });
  },
}));


export default useStore;
