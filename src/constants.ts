/**
 * 애플리케이션 전반에서 사용되는 상수들
 */

import { ContainerType, ConfirmationAction } from "./types";

/**
 * UI 관련 상수
 */
export const UI_CONSTANTS = {
  /** 노드의 기본 너비 */
  NODE_WIDTH: 324,
  /** 노드 간격 */
  NODE_SPACING: 400,
  /** 텍스트 영역 기본 행 수 */
  TEXTAREA_ROWS: 3,
  /** 애니메이션 지속 시간 */
  ANIMATION_DURATION: 300,
} as const;

/**
 * 노드 스타일 관련 상수
 */
export const NODE_STYLES = {
  /** 노드 타입별 헤더 색상 */
  HEADER_COLORS: {
    slotFilling: "#767BFB",
    confirmation: "rgba(20, 175, 146, 1)",
    text: "rgba(255, 156, 102, 1)",
  },
  /** 핸들 스타일 */
  HANDLE_STYLES: {
    source: {
      background: "rgba(51, 66, 79, 1)",
      width: "16px",
      height: "16px",
    },
    target: {
      background: "transparent",
      width: "16px",
      height: "16px",
      border: "none",
    },
    disconnected: {
      background: "rgba(133, 142, 150, 1)",
      border: "none",
      width: "8px",
      height: "8px",
    },
  },
} as const;

/**
 * 예약 시스템 관련 상수
 */
export const BOOKING_CONSTANTS = {
  /** 지원되는 컨테이너 타입 */
  CONTAINER_TYPES: [
    { text: ContainerType.DRY, value: ContainerType.DRY },
    { text: ContainerType.REEFER, value: ContainerType.REEFER },
  ],
  /** 확인 액션 옵션 */
  CONFIRMATION_ACTIONS: [
    { text: "확정", value: ConfirmationAction.CONFIRM },
    { text: "취소", value: ConfirmationAction.CANCEL },
  ],
  /** 기본 시작 키워드 */
  START_KEYWORDS: [{ text: "예약", value: "예약" }],
} as const;

/**
 * 검증 관련 상수
 */
export const VALIDATION_CONSTANTS = {
  /** 날짜 형식 예시 */
  DATE_FORMAT_EXAMPLE: "2025-08-01",
  /** 날짜 형식 정규식 */
  DATE_FORMAT_REGEX: /^\d{4}-\d{2}-\d{2}$/,
  /** 무게 단위 */
  WEIGHT_UNIT: "kg",
  /** 최대 컨테이너 수량 */
  MAX_CONTAINER_COUNT: 100,
  /** 최소 컨테이너 수량 */
  MIN_CONTAINER_COUNT: 1,
} as const;

/**
 * 메시지 템플릿
 */
export const MESSAGE_TEMPLATES = {
  /** 예약 확인 메시지 템플릿 */
  BOOKING_CONFIRMATION: `다음과 같이 예약하시겠습니까?
출발: [departurePort]
목적: [destinationPort]
출발일: [departureDate]
화물 무게: [cargoWeight]kg
컨테이너 타입: [containerType]
컨테이너 수량: [containerCount]`,
  /** 예약 완료 메시지 */
  BOOKING_COMPLETED: "예약이 확정되었습니다. 감사합니다",
  /** 예약 취소 메시지 */
  BOOKING_CANCELLED: "예약이 취소되었습니다.",
  /** 시작 메시지 */
  START_MESSAGE: "선박 예약을 시작합니다. (아무 키워드나 입력해주세요)",
} as const;

/**
 * React Flow 관련 설정
 */
export const FLOW_SETTINGS = {
  /** 뷰포트 설정 */
  VIEWPORT: {
    width: "100vw",
    height: "100vh",
  },
  /** 엣지 설정 */
  EDGE_OPTIONS: {
    animated: true,
    strokeWidth: 1.3,
    strokeColor: "#33424F",
  },
  /** 베지어 곡선 설정 */
  BEZIER_CURVE: {
    /** 곡선 강도 조절 (0.0 ~ 1.0) */
    CURVE_INTENSITY: 0.3,
  },
} as const;
