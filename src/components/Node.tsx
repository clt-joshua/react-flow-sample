import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import type { BasicNodeDataProps } from "../types";

export function SlotNode({
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

export function TextNode({
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
