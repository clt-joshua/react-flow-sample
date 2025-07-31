import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
} from "@xyflow/react";
import type { NodeChange, EdgeChange, Connection } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import { initialNodes, initialEdges } from "./data";
import { SlotNode, TextNode } from "./components/Node";
import { EdgeWithLabel } from "./components/Edge";

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const nodeTypes = {
    slotFilling: SlotNode,
    text: TextNode,
    confirmation: SlotNode,
  };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes(
        (nodesSnapshot) =>
          applyNodeChanges(changes, nodesSnapshot) as typeof nodesSnapshot
      ),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={{ edgeWithLabel: EdgeWithLabel }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
