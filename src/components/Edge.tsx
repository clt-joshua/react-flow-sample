import { BaseEdge, EdgeLabelRenderer } from "@xyflow/react";

export const EdgeWithLabel = ({
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
