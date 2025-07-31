/**
 * 검증 관련 유틸리티 함수들
 */

import { VALIDATION_CONSTANTS } from "../constants";

/**
 * 날짜 형식이 유효한지 검증합니다
 * @param dateString - 검증할 날짜 문자열
 * @returns 유효성 여부
 */
export const isValidDateFormat = (dateString: string): boolean => {
  return VALIDATION_CONSTANTS.DATE_FORMAT_REGEX.test(dateString);
};

/**
 * 화물 무게가 유효한지 검증합니다
 * @param weight - 검증할 무게 값
 * @returns 유효성 여부
 */
export const isValidWeight = (weight: number): boolean => {
  return weight > 0 && Number.isFinite(weight);
};

/**
 * 컨테이너 수량이 유효한지 검증합니다
 * @param count - 검증할 수량
 * @returns 유효성 여부
 */
export const isValidContainerCount = (count: number): boolean => {
  return (
    Number.isInteger(count) &&
    count >= VALIDATION_CONSTANTS.MIN_CONTAINER_COUNT &&
    count <= VALIDATION_CONSTANTS.MAX_CONTAINER_COUNT
  );
};

/**
 * 빈 문자열이 아닌지 검증합니다
 * @param value - 검증할 문자열
 * @returns 유효성 여부
 */
export const isNonEmptyString = (value: string): boolean => {
  return typeof value === "string" && value.trim().length > 0;
};

/**
 * 항구명이 유효한지 검증합니다
 * @param portName - 검증할 항구명
 * @returns 유효성 여부
 */
export const isValidPortName = (portName: string): boolean => {
  return isNonEmptyString(portName) && portName.trim().length >= 2;
};

/**
 * 모든 필수 예약 정보가 입력되었는지 검증합니다
 * @param bookingData - 예약 데이터 객체
 * @returns 검증 결과 객체
 */
export const validateBookingData = (bookingData: {
  departurePort?: string;
  destinationPort?: string;
  departureDate?: string;
  cargoWeight?: number;
  containerType?: string;
  containerCount?: number;
}): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (
    !bookingData.departurePort ||
    !isValidPortName(bookingData.departurePort)
  ) {
    errors.push("유효한 출발 항구를 입력해주세요");
  }

  if (
    !bookingData.destinationPort ||
    !isValidPortName(bookingData.destinationPort)
  ) {
    errors.push("유효한 목적 항구를 입력해주세요");
  }

  if (
    !bookingData.departureDate ||
    !isValidDateFormat(bookingData.departureDate)
  ) {
    errors.push(
      `유효한 출발일을 입력해주세요 (형식: ${VALIDATION_CONSTANTS.DATE_FORMAT_EXAMPLE})`
    );
  }

  if (!bookingData.cargoWeight || !isValidWeight(bookingData.cargoWeight)) {
    errors.push("유효한 화물 무게를 입력해주세요");
  }

  if (
    !bookingData.containerType ||
    !isNonEmptyString(bookingData.containerType)
  ) {
    errors.push("컨테이너 타입을 선택해주세요");
  }

  if (
    !bookingData.containerCount ||
    !isValidContainerCount(bookingData.containerCount)
  ) {
    errors.push(
      `컨테이너 수량을 ${VALIDATION_CONSTANTS.MIN_CONTAINER_COUNT}-${VALIDATION_CONSTANTS.MAX_CONTAINER_COUNT} 범위에서 입력해주세요`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
