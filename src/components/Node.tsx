import { useState, useCallback } from "react";
import { Position } from "@xyflow/react";
import type { CustomNodeProps, QuickReply } from "../types";
import { UI_CONSTANTS } from "../constants";
import { generateHandleId, classNames } from "../utils";
import DeleteIcon from "/icon_delete.svg?url";
import CancelIcon from "/icon_cancel.svg?url";
import { CustomHandle } from "./Handle";

/**
 * 슬롯 채우기 타입의 노드 컴포넌트
 *
 * 사용자 입력을 받아 특정 슬롯을 채우는 역할을 합니다.
 * 빠른 답변 옵션을 동적으로 추가/삭제할 수 있습니다.
 *
 * @param props - 커스텀 노드 props
 * @returns JSX.Element
 */
export function SlotNode({ id, type, data }: CustomNodeProps) {
  // 빠른 답변 상태 관리
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(
    data.quickReplies || []
  );

  /**
   * 새로운 빠른 답변 옵션을 추가합니다
   */
  const handleAddReply = useCallback(() => {
    setQuickReplies((prev) => [...prev, { text: "", value: "" }]);
  }, []);

  /**
   * 지정된 인덱스의 빠른 답변 옵션을 삭제합니다
   */
  const handleDeleteReply = useCallback((index: number) => {
    setQuickReplies((prev) => prev.filter((_, i) => i !== index));
  }, []);

  /**
   * 노드 삭제 핸들러 (향후 구현 예정)
   */
  const handleDeleteNode = useCallback(() => {
    console.log(`노드 삭제 요청: ${id}`);
    // TODO: 노드 삭제 로직 구현
  }, [id]);

  return (
    <div className="basic-node">
      {/* 노드 타입에 따른 색상 헤더 */}
      <div className={classNames(`node-header-border`, type)} />

      {/* 노드 제목 및 삭제 버튼 */}
      <div className="node-title-container">
        <span className="node-title">Type: {type}</span>
        <button
          className="icon_button"
          onClick={handleDeleteNode}
          title="노드 삭제"
          aria-label="노드 삭제"
        >
          <img src={DeleteIcon} alt="삭제" />
        </button>
      </div>

      {/* 노드 컨텐츠 영역 */}
      <div className="node-content-container">
        {/* 노드 ID 및 텍스트 입력 */}
        <div className="node-input-container">
          <label htmlFor={`${id}-text`} className="node-label">
            {id}
          </label>
          <textarea
            id={`${id}-text`}
            defaultValue={data.text}
            rows={UI_CONSTANTS.TEXTAREA_ROWS}
            placeholder="노드 메시지를 입력하세요"
            aria-label="노드 텍스트"
          />
        </div>

        {/* 슬롯 이름 입력 */}
        <div className="node-input-container">
          <label htmlFor={`${id}-slot`} className="node-label">
            Slot:
          </label>
          <input
            id={`${id}-slot`}
            type="text"
            defaultValue={data.slot}
            placeholder="슬롯 이름을 입력하세요"
            aria-label="슬롯 이름"
          />
        </div>

        {/* 빠른 답변 옵션 (조건부 렌더링) */}
        {data.hasQuickReplies && (
          <div className="node-quick-replies-container">
            <span className="node-label">Quick Replies:</span>
            {quickReplies.map((reply, index) => (
              <div
                key={`quick-reply-${index}`}
                className="node-quick-reply-item"
              >
                <input
                  type="text"
                  defaultValue={reply.text}
                  placeholder="표시 텍스트"
                  aria-label={`빠른 답변 ${index + 1} 텍스트`}
                />
                <input
                  type="text"
                  defaultValue={reply.value}
                  placeholder="전송 값"
                  aria-label={`빠른 답변 ${index + 1} 값`}
                />
                <button
                  className="icon_button"
                  onClick={() => handleDeleteReply(index)}
                  title="빠른 답변 삭제"
                  aria-label={`빠른 답변 ${index + 1} 삭제`}
                >
                  <img src={CancelIcon} alt="삭제" />
                </button>
              </div>
            ))}
            <button className="outlined-button" onClick={handleAddReply}>
              Add Reply
            </button>
          </div>
        )}
      </div>

      {/* 노드 연결 핸들들 */}
      <CustomHandle
        type="target"
        position={Position.Left}
        nodeId={id}
        id={generateHandleId(id, "left", "target")}
      />
      <CustomHandle
        type="source"
        position={Position.Right}
        nodeId={id}
        id={generateHandleId(id, "right", "source")}
      />
      <CustomHandle
        type="source"
        position={Position.Bottom}
        nodeId={id}
        id={generateHandleId(id, "bottom", "source")}
      />
    </div>
  );
}

/**
 * 텍스트 타입의 노드 컴포넌트
 *
 * 단순한 메시지 출력을 위한 노드입니다.
 * 사용자 입력을 받지 않고 정보만 표시합니다.
 *
 * @param props - 커스텀 노드 props
 * @returns JSX.Element
 */
export function TextNode({ id, type, data }: CustomNodeProps) {
  /**
   * 노드 삭제 핸들러 (향후 구현 예정)
   */
  const handleDeleteNode = useCallback(() => {
    console.log(`텍스트 노드 삭제 요청: ${id}`);
    // TODO: 노드 삭제 로직 구현
  }, [id]);

  return (
    <div className="basic-node">
      {/* 노드 타입에 따른 색상 헤더 */}
      <div className={classNames(`node-header-border`, type)} />

      {/* 노드 제목 및 삭제 버튼 */}
      <div className="node-title-container">
        <span className="node-title">Type: {type}</span>
        <button
          className="icon_button"
          onClick={handleDeleteNode}
          title="노드 삭제"
          aria-label="노드 삭제"
        >
          <img src={DeleteIcon} alt="삭제" />
        </button>
      </div>

      {/* 노드 컨텐츠 영역 */}
      <div className="node-content-container">
        <div className="node-input-container">
          <label htmlFor={`${id}-text`} className="node-label">
            {id}
          </label>
          <textarea
            id={`${id}-text`}
            defaultValue={data.text}
            rows={UI_CONSTANTS.TEXTAREA_ROWS}
            placeholder="노드 메시지를 입력하세요"
            aria-label="노드 텍스트"
          />
        </div>
      </div>

      {/* 노드 연결 핸들들 */}
      <CustomHandle
        type="target"
        position={Position.Left}
        nodeId={id}
        id={generateHandleId(id, "left", "target")}
      />
      <CustomHandle
        type="source"
        position={Position.Right}
        nodeId={id}
        id={generateHandleId(id, "right", "source")}
      />
      <CustomHandle
        type="source"
        position={Position.Bottom}
        nodeId={id}
        id={generateHandleId(id, "bottom", "source")}
      />
    </div>
  );
}
