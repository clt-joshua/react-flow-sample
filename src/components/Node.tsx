import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import type { BasicNodeDataProps } from "../types";
import DeleteIcon from "../../public/icon_delete.svg";
import CancelIcon from "../../public/icon_cancel.svg";

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
      <div className={`node-header-border ${type}`} />
      <div className="node-title-container">
        <span className="node-title">Type: {type}</span>
        <button className="icon_button">
          <img src={DeleteIcon} alt="Delete" />
        </button>
      </div>
      <div className="node-content-container">
        <div className="node-input-container">
          <span>{id}</span>
          <textarea defaultValue={data.text} rows={3} />
        </div>
        <div className="node-input-container">
          <span>Slot:</span>
          <input type="text" defaultValue={data.slot} />
        </div>
        {data.hasQuickReplies && (
          <div className="node-quick-replies-container">
            <span>Quick Replies:</span>
            {quickReplies.map((reply, index) => (
              <div
                key={index}
                className="node-quick-reply-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  defaultValue={reply.text}
                  placeholder="Text"
                />
                <input
                  type="text"
                  defaultValue={reply.value}
                  placeholder="Value"
                />
                <button
                  className="icon_button"
                  onClick={() => handleDeleteReply(index)}
                >
                  <img src={CancelIcon} alt="Cancel" />
                </button>
              </div>
            ))}
            <button className="outlined-button" onClick={handleAddReply}>
              Add Reply
            </button>
          </div>
        )}
      </div>
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
  return (
    <div className="basic-node">
      <div className={`node-header-border ${type}`} />
      <div className="node-title-container">
        <span className="node-title">Type: {type}</span>
        <button className="icon_button">
          <img src={DeleteIcon} alt="Delete" />
        </button>
      </div>
      <div className="node-content-container">
        <div className="node-input-container">
          <span>{id}</span>
          <textarea defaultValue={data.text} rows={3} />
        </div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
