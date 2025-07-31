import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Handle,
  Position,
  Background,
  Controls,
  MiniMap,
  BaseEdge,
  EdgeLabelRenderer,
} from "@xyflow/react";
import type { NodeChange, EdgeChange, Connection } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import { initialNodes, initialEdges } from "./data";
import type { BasicNodeDataProps } from "./types";

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

function SlotNode({
  id,
  type,
  data,
}: {
  id: string;
  type: string;
  data: BasicNodeDataProps;
}) {
  const [quickReplies, setQuickReplies] = useState(data.quickReplies || []);
  const handleAddReply = () => {
    setQuickReplies([...quickReplies, { text: "", value: "" }]);
  };
  const handleDeleteReply = (index: number) => {
    setQuickReplies(quickReplies.filter((_, i) => i !== index));
  };

  return (
    <div className="basic-node">
      <span>
        <span className="basic-node-label">Type:</span> {type}
      </span>
      <hr style={{ margin: "0" }} />
      <span>
        <span className="basic-node-label">ID:</span> {id}
      </span>
      <div className="input-container">
        <span className="basic-node-label">Text:</span>
        <textarea defaultValue={data.text} rows={3} />
      </div>
      <div className="input-container">
        <span className="basic-node-label">Slot:</span>
        <input type="text" defaultValue={data.slot} />
      </div>
      {data.hasQuickReplies && (
        <div className="input-container" style={{ display: "flex" }}>
          <span className="basic-node-label">Quick Replies:</span>
          {quickReplies.map((reply, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <input type="text" defaultValue={reply.text} placeholder="Text" />
              <input
                type="text"
                defaultValue={reply.value}
                placeholder="Value"
              />
              <button onClick={() => handleDeleteReply(index)}>Delete</button>
            </div>
          ))}
          <button onClick={handleAddReply}>Add Reply</button>
        </div>
      )}
      <button>Delete Node</button>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function TextNode({
  id,
  type,
  data,
}: {
  id: string;
  type: string;
  data: BasicNodeDataProps;
}) {
  const [quickReplies, setQuickReplies] = useState(data.quickReplies || []);
  const handleAddReply = () => {
    setQuickReplies([...quickReplies, { text: "", value: "" }]);
  };
  const handleDeleteReply = (index: number) => {
    setQuickReplies(quickReplies.filter((_, i) => i !== index));
  };

  return (
    <div className="basic-node">
      <span>
        <span className="basic-node-label">Type:</span> {type}
      </span>
      <hr style={{ margin: "0" }} />
      <span>
        <span className="basic-node-label">ID:</span> {id}
      </span>
      <div className="input-container">
        <span className="basic-node-label">Text:</span>
        <textarea defaultValue={data.text} rows={3} />
      </div>
      {data.hasQuickReplies && (
        <div className="input-container" style={{ display: "flex" }}>
          <span className="basic-node-label">Quick Replies:</span>
          {quickReplies.map((reply, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <input type="text" defaultValue={reply.text} placeholder="Text" />
              <input
                type="text"
                defaultValue={reply.value}
                placeholder="Value"
              />
              <button onClick={() => handleDeleteReply(index)}>Delete</button>
            </div>
          ))}
          <button onClick={handleAddReply}>Add Reply</button>
        </div>
      )}
      <button>Delete Node</button>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const EdgeWithLabel = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}) => {
  // 가로 연결에 적합한 커스텀 베지어 곡선 계산
  const createHorizontalBezierPath = (
    sx: number,
    sy: number,
    tx: number,
    ty: number
  ): string => {
    const distance = Math.abs(tx - sx);
    const offset = distance * 0.3; // 곡선의 강도 조절

    // 가로 연결에 적합한 제어점 계산
    const control1X = sx + offset;
    const control1Y = sy;
    const control2X = tx - offset;
    const control2Y = ty;

    return `M ${sx} ${sy} C ${control1X} ${control1Y} ${control2X} ${control2Y} ${tx} ${ty}`;
  };

  // 라벨 위치 계산 (곡선의 중간점)
  const labelX = (sourceX + targetX) / 2;
  const labelY = (sourceY + targetY) / 2;

  const customPath = createHorizontalBezierPath(
    sourceX,
    sourceY,
    targetX,
    targetY
  );

  return (
    <>
      <BaseEdge id={id} path={customPath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          {id}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
