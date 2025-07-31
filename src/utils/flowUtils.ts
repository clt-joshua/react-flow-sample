/**
 * React Flow 와 관련된 유틸리티 함수들
 */

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
