import { Handle, type HandleType, Position, useReactFlow } from "@xyflow/react";
import { useMemo, useCallback } from "react";
import AddIcon from "/icon_add.svg?url";
import TargetArrowIcon from "/icon_target_arrow.svg?url";
import { getHandleStyle } from "../utils";

/**
 * 커스텀 핸들 컴포넌트의 props 인터페이스
 */
interface CustomHandleProps {
  /** 핸들의 고유 ID */
  id: string;
  /** 핸들의 위치 (Left, Right, Top, Bottom) */
  position: Position;
  /** 핸들 타입 (source 또는 target) */
  type: HandleType;
  /** 소속 노드 ID */
  nodeId: string;
}

/**
 * 핸들의 연결 상태를 나타내는 타입
 */
type HandleStatus = "source" | "target" | "disconnected";

/**
 * React Flow 노드 간 연결을 위한 커스텀 핸들 컴포넌트
 * 연결 상태에 따라 다른 시각적 표현을 제공합니다.
 *
 * @param props - 커스텀 핸들 컴포넌트 props
 * @returns JSX.Element
 */
export function CustomHandle({
  id,
  position,
  type,
  nodeId,
}: CustomHandleProps) {
  const { getEdges } = useReactFlow();

  /**
   * 현재 핸들의 연결 상태를 결정합니다
   * - disconnected: 연결되지 않은 상태
   * - source: 연결의 출발점 역할을 하는 상태
   * - target: 연결의 도착점 역할을 하는 상태
   */
  const handleStatus = useMemo<HandleStatus>(() => {
    const edges = getEdges();
    const connectedEdges = edges.filter((edge) => {
      if (type === "source") {
        return edge.source === nodeId && edge.sourceHandle === id;
      } else {
        return edge.target === nodeId && edge.targetHandle === id;
      }
    });

    if (connectedEdges.length === 0) {
      return "disconnected";
    }

    // 연결된 엣지에서 현재 핸들의 역할 확인
    const isSourceInEdge = connectedEdges.some(
      (edge) => edge.source === nodeId && edge.sourceHandle === id
    );

    return isSourceInEdge ? "source" : "target";
  }, [getEdges, nodeId, type, id]);

  /**
   * 연결 검증 함수
   * 현재는 시작 노드에서만 연결이 가능하도록 제한
   */
  const isValidConnection = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (connection: any) => connection.source === "start",
    []
  );

  /**
   * 연결 이벤트 핸들러
   * 디버깅 및 로깅 목적으로 사용
   */
  const onConnect = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (params: any) => {
      console.log("Handle connected:", { nodeId, handleId: id, params });
    },
    [nodeId, id]
  );

  return (
    <Handle
      id={id}
      type={type}
      position={position}
      style={getHandleStyle(handleStatus)}
      isValidConnection={isValidConnection}
      onConnect={onConnect}
    >
      {/* 소스 핸들일 때 추가 아이콘 표시 */}
      {handleStatus === "source" && (
        <img
          src={AddIcon}
          alt="연결 추가"
          className="handle-icon"
          width={12}
          height={12}
        />
      )}

      {/* 타겟 핸들일 때 화살표 아이콘 표시 */}
      {handleStatus === "target" && (
        <img
          src={TargetArrowIcon}
          alt="연결 대상"
          className="handle-icon"
          width={16}
          height={16}
        />
      )}
    </Handle>
  );
}
