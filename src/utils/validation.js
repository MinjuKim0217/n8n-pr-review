// 유효성 검사 유틸리티 함수들

/**
 * 이메일 형식 검증
 * @param {string} email - 검증할 이메일
 * @returns {boolean} - 유효한 이메일이면 true
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * 이름 길이 검증
 * @param {string} name - 검증할 이름
 * @returns {boolean} - 유효한 이름이면 true
 */
const isValidName = (name) => {
    return name && name.length >= 2 && name.length <= 50;
};

/**
 * 나이 범위 검증
 * @param {number} age - 검증할 나이
 * @returns {boolean} - 유효한 나이면 true
 */
const isValidAge = (age) => {
    return age >= 0 && age <= 120;
};

/**
 * 문자열이 비어있는지 확인
 * @param {string} str - 확인할 문자열
 * @returns {boolean} - 비어있으면 true
 */
const isEmpty = (str) => {
    return !str || str.trim().length === 0;
};

/**
 * 페이지네이션 파라미터 검증 및 정규화
 * @param {object} query - 쿼리 객체
 * @returns {object} - 정규화된 페이지네이션 객체
 */
const validatePagination = (query) => {
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10)); // 최대 100개 제한
    
    return { page, limit };
};

module.exports = {
    isValidEmail,
    isValidName,
    isValidAge,
    isEmpty,
    validatePagination
};
