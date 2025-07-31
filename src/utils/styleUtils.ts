/**
 * 스타일 관련 유틸리티 함수들
 */

import { NODE_STYLES } from "../constants";

/**
 * 노드 타입에 따른 헤더 색상을 반환합니다
 * @param nodeType - 노드 타입
 * @returns 헤더 색상 값
 */
export const getNodeHeaderColor = (nodeType: string): string => {
  return (
    NODE_STYLES.HEADER_COLORS[
      nodeType as keyof typeof NODE_STYLES.HEADER_COLORS
    ] || "#cccccc"
  );
};

/**
 * 핸들 상태에 따른 스타일을 반환합니다
 * @param status - 핸들 상태 ('source', 'target', 'disconnected')
 * @returns 스타일 객체
 */
export const getHandleStyle = (
  status: "source" | "target" | "disconnected"
) => {
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const statusStyle = NODE_STYLES.HANDLE_STYLES[status];

  return { ...baseStyle, ...statusStyle };
};

/**
 * CSS 클래스명들을 조건부로 결합합니다
 * @param classes - 클래스명 배열 또는 조건부 객체
 * @returns 결합된 클래스명 문자열
 */
export const classNames = (
  ...classes: (string | Record<string, boolean> | undefined | null | false)[]
): string => {
  return classes
    .flatMap((cls) => {
      if (typeof cls === "string") return cls;
      if (typeof cls === "object" && cls !== null) {
        return Object.entries(cls)
          .filter(([, condition]) => condition)
          .map(([className]) => className);
      }
      return [];
    })
    .filter(Boolean)
    .join(" ");
};

/**
 * 인라인 스타일 객체를 생성합니다
 * @param styles - 스타일 속성들
 * @returns React 인라인 스타일 객체
 */
export const createInlineStyle = (
  styles: Record<string, string | number>
): React.CSSProperties => {
  return styles as React.CSSProperties;
};
