export const initialNodes = [
  {
    id: "start",
    type: "text",
    position: { x: -400, y: 0 },
    data: {
      text: "선박 예약을 시작합니다. (아무 키워드나 입력해주세요)",
      hasQuickReplies: true,
      quickReplies: [
        {
          text: "예약",
          value: "예약",
        },
      ],
    },
  },
  {
    id: "ask_departure_port",
    type: "slotFilling",
    position: { x: 300, y: 0 },
    data: {
      text: "출발 항구를 입력해주세요.",
      hasQuickReplies: false,
      slot: "departurePort",
    },
  },
  {
    id: "ask_destination_port",
    type: "slotFilling",
    position: { x: 600, y: 0 },
    data: {
      text: "목적 항구를 입력해주세요.",
      hasQuickReplies: false,
      slot: "destinationPort",
    },
  },
  {
    id: "ask_departure_date",
    type: "slotFilling",
    position: { x: 900, y: 0 },
    data: {
      text: "출발일을 입력해주세요. (예: 2025-08-01)",
      hasQuickReplies: false,
      slot: "departureDate",
    },
  },
  {
    id: "ask_cargo_weight",
    type: "slotFilling",
    position: { x: 1200, y: 0 },
    data: {
      text: "화물 무게를 입력해주세요. (단위: kg)",
      hasQuickReplies: false,
      slot: "cargoWeight",
    },
  },
  {
    id: "ask_container_type",
    type: "slotFilling",
    position: { x: 1500, y: 0 },
    data: {
      text: "컨테이너 타입을 선택해주세요",
      hasQuickReplies: true,
      slot: "containerType",
      quickReplies: [
        {
          text: "Dry",
          value: "Dry",
        },
        {
          text: "Reefer",
          value: "Reefer",
        },
      ],
    },
  },
  {
    id: "ask_container_count",
    type: "slotFilling",
    position: { x: 2200, y: 0 },
    data: {
      text: "컨테이너 수량을 입력해주세요.",
      hasQuickReplies: false,
      slot: "containerCount",
    },
  },
  {
    id: "confirm_booking",
    type: "confirmation",
    position: { x: 2500, y: 0 },
    data: {
      text: `다음과 같이 예약하시겠습니까?
출발: [departurePort]
목적: [destinationPort]
출발일: [departureDate]
화물 무게: [cargoWeight]kg
컨테이너 타입: [containerType]
컨테이너 수량: [containerCount]
      `,
      slot: "containerType",
      hasQuickReplies: true,
      quickReplies: [
        {
          text: "확정",
          value: "confirm",
        },
        {
          text: "취소",
          value: "cancel",
        },
      ],
    },
  },
  {
    id: "booking_confirmed",
    type: "text",
    position: { x: 3200, y: -100 },
    data: {
      text: "예약이 확정되었습니다. 감사합니다",
      hasQuickReplies: false,
    },
  },
  {
    id: "booking_cancelled",
    type: "text",
    position: { x: 3200, y: 300 },
    data: {
      text: "예약이 취소되었습니다.",
      hasQuickReplies: false,
    },
  },
];

export const initialEdges = [
  {
    id: "start",
    source: "start",
    target: "ask_departure_port",
    type: "edgeWithLabel",
  },
  {
    id: "ask_departure_port-ask_destination_port",
    source: "ask_departure_port",
    target: "ask_destination_port",
  },
  {
    id: "ask_destination_port-ask_departure_date",
    source: "ask_destination_port",
    target: "ask_departure_date",
  },
  {
    id: "ask_departure_date-ask_cargo_weight",
    source: "ask_departure_date",
    target: "ask_cargo_weight",
  },
  {
    id: "ask_cargo_weight-ask_container_type",
    source: "ask_cargo_weight",
    target: "ask_container_type",
  },
  {
    id: "ask_container_type-ask_container_count",
    source: "ask_container_type",
    target: "ask_container_count",
  },
  {
    id: "ask_container_count-confirm_booking",
    source: "ask_container_count",
    target: "confirm_booking",
  },
  {
    id: "confirmed",
    source: "confirm_booking",
    target: "booking_confirmed",
    type: "edgeWithLabel",
  },
  {
    id: "cancelled",
    source: "confirm_booking",
    target: "booking_cancelled",
    type: "edgeWithLabel",
  },
];
