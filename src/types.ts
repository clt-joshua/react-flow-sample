/**
 * 챗봇 플로우에서 사용되는 노드의 기본 데이터 인터페이스
 */
export interface BasicNodeDataProps {
  /** 노드에 표시될 텍스트 내용 */
  text: string;
  /** 빠른 답변 옵션이 있는지 여부 */
  hasQuickReplies?: boolean;
  /** 슬롯 채우기 타입 노드의 슬롯 이름 */
  slot?: string;
  /** 빠른 답변 옵션 배열 */
  quickReplies?: QuickReply[];
}

/**
 * 빠른 답변 옵션 인터페이스
 */
export interface QuickReply {
  /** 사용자에게 표시될 텍스트 */
  text: string;
  /** 실제 전송될 값 */
  value: string;
}

/**
 * 지원되는 노드 타입들
 */
export const NodeType = {
  SLOT_FILLING: "slotFilling",
  TEXT: "text",
  CONFIRMATION: "confirmation",
} as const;

/**
 * 커스텀 노드의 공통 props 인터페이스
 */
export interface CustomNodeProps {
  /** 노드의 고유 ID */
  id: string;
  /** 노드 타입 */
  type: string;
  /** 노드 데이터 */
  data: BasicNodeDataProps;
}

/**
 * 선박 예약 시스템에서 사용되는 슬롯 타입들
 */
export const BookingSlot = {
  DEPARTURE_PORT: "departurePort",
  DESTINATION_PORT: "destinationPort",
  DEPARTURE_DATE: "departureDate",
  CARGO_WEIGHT: "cargoWeight",
  CONTAINER_TYPE: "containerType",
  CONTAINER_COUNT: "containerCount",
} as const;

/**
 * 컨테이너 타입 열거형
 */
export const ContainerType = {
  DRY: "Dry",
  REEFER: "Reefer",
} as const;

/**
 * 예약 확인 액션 타입
 */
export const ConfirmationAction = {
  CONFIRM: "confirm",
  CANCEL: "cancel",
} as const;
