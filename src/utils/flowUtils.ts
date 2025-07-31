/**
 * React Flow 와 관련된 유틸리티 함수들
 */

import { FLOW_SETTINGS } from "../constants";

/**
 * 가로 연결에 적합한 커스텀 베지어 곡선 경로를 생성합니다
 * @param sx - 시작점 X 좌표
 * @param sy - 시작점 Y 좌표
 * @param tx - 끝점 X 좌표
 * @param ty - 끝점 Y 좌표
 * @returns SVG 경로 문자열
 */
export const createHorizontalBezierPath = (
  sx: number,
  sy: number,
  tx: number,
  ty: number
): string => {
  const distance = Math.abs(tx - sx);
  const offset = distance * FLOW_SETTINGS.BEZIER_CURVE.CURVE_INTENSITY;

  // 가로 연결에 적합한 제어점 계산
  const control1X = sx + offset;
  const control1Y = sy;
  const control2X = tx - offset;
  const control2Y = ty;

  return `M ${sx} ${sy} C ${control1X} ${control1Y} ${control2X} ${control2Y} ${tx} ${ty}`;
};

/**
 * 두 점의 중간점을 계산합니다
 * @param x1 - 첫 번째 점의 X 좌표
 * @param y1 - 첫 번째 점의 Y 좌표
 * @param x2 - 두 번째 점의 X 좌표
 * @param y2 - 두 번째 점의 Y 좌표
 * @returns 중간점 좌표 객체
 */
export const calculateMidpoint = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): { x: number; y: number } => ({
  x: (x1 + x2) / 2,
  y: (y1 + y2) / 2,
});

/**
 * 핸들 ID를 생성합니다
 * @param nodeId - 노드 ID
 * @param position - 핸들 위치 ('left', 'right', 'top', 'bottom')
 * @param type - 핸들 타입 ('source', 'target')
 * @returns 핸들 ID 문자열
 */
export const generateHandleId = (
  nodeId: string,
  position: string,
  type: string
): string => `${nodeId}-${position}-${type}`;

/**
 * 엣지 ID를 생성합니다
 * @param sourceId - 소스 노드 ID
 * @param targetId - 타겟 노드 ID
 * @returns 엣지 ID 문자열
 */
export const generateEdgeId = (sourceId: string, targetId: string): string =>
  `${sourceId}-${targetId}`;

/**
 * 노드 위치를 자동으로 계산합니다
 * @param index - 노드 인덱스
 * @param spacing - 노드 간 간격
 * @param startX - 시작 X 좌표
 * @param startY - 시작 Y 좌표
 * @returns 위치 객체
 */
export const calculateNodePosition = (
  index: number,
  spacing: number = FLOW_SETTINGS.EDGE_OPTIONS.strokeWidth,
  startX: number = -400,
  startY: number = 0
): { x: number; y: number } => ({
  x: startX + index * spacing,
  y: startY,
});
