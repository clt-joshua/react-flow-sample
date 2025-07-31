import { Handle, type HandleType, Position, useReactFlow } from "@xyflow/react";
import { useMemo } from "react";
import AddIcon from "../../public/icon_add.svg?url";
import TargetArrowIcon from "../../public/icon_target_arrow.svg?url";

export function CustomHandle({
  id,
  position,
  type,
  nodeId,
}: {
  id: string;
  position: Position;
  type: HandleType;
  nodeId: string;
}) {
  const { getEdges } = useReactFlow();

  // 3가지 상태를 구분하는 로직: 소스 핸들, 타겟 핸들, 연결 안됨
  const handleStatus = useMemo(() => {
    const edges = getEdges();
    const connectedEdges = edges.filter((edge) => {
      if (type === "source") {
        return edge.source === nodeId && edge.sourceHandle === id;
      } else {
        return edge.target === nodeId && edge.targetHandle === id;
      }
    });

    if (connectedEdges.length === 0) {
      return "disconnected"; // 연결되지 않음
    } else {
      // 연결된 엣지가 있으면, 현재 핸들이 소스인지 타겟인지 확인
      const isSourceInEdge = connectedEdges.some(
        (edge) => edge.source === nodeId && edge.sourceHandle === id
      );

      if (isSourceInEdge) {
        return "source"; // 현재 핸들이 연결된 엣지의 소스 핸들
      } else {
        return "target"; // 현재 핸들이 연결된 엣지의 타겟 핸들
      }
    }
  }, [getEdges, nodeId, type, id]);

  // 3가지 스타일 정의 - 각 상태별로 명확히 구분
  const sourceHandleStyle = {
    background: "rgba(51, 66, 79, 1)", // 소스 핸들: 초록색
    width: "16px",
    height: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const targetHandleStyle = {
    background: "transparent", // 타겟 핸들: 주황색
    width: "16px",
    height: "16px",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const disconnectedHandleStyle = {
    background: "rgba(133, 142, 150, 1)", // 연결 안됨: 회색
    border: "none",
    width: "8px",
    height: "8px",
  };

  // 핸들 상태에 따라 스타일 선택
  const getHandleStyle = () => {
    switch (handleStatus) {
      case "source":
        return sourceHandleStyle;
      case "target":
        return targetHandleStyle;
      case "disconnected":
      default:
        return disconnectedHandleStyle;
    }
  };

  return (
    <Handle
      id={id}
      type={type}
      position={position}
      style={getHandleStyle()}
      isValidConnection={(connection) => connection.source === "start"}
      onConnect={(params) => {
        console.log("handle onConnect", params);
      }}
    >
      {handleStatus === "source" && (
        <img src={AddIcon} alt="add" className="handle-icon" />
      )}
      {handleStatus === "target" && (
        <img
          src={TargetArrowIcon}
          alt="target"
          className="handle-icon"
          width={16}
          height={16}
        />
      )}
    </Handle>
  );
}
