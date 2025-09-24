// 애플리케이션 상수 정의

const API_CONFIG = {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
    MIN_PAGE_SIZE: 1
};

const VALIDATION_RULES = {
    USER: {
        NAME_MIN_LENGTH: 2,
        NAME_MAX_LENGTH: 50,
        AGE_MIN: 0,
        AGE_MAX: 120
    },
    POST: {
        TITLE_MIN_LENGTH: 3,
        TITLE_MAX_LENGTH: 200,
        CONTENT_MIN_LENGTH: 10,
        CONTENT_MAX_LENGTH: 5000
    }
};

const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
};

const MESSAGES = {
    SUCCESS: {
        USER_CREATED: 'User created successfully',
        USER_UPDATED: 'User updated successfully',
        USER_DELETED: 'User deleted successfully',
        POST_CREATED: 'Post created successfully',
        POST_UPDATED: 'Post updated successfully',
        POST_DELETED: 'Post deleted successfully',
        POST_LIKED: 'Post liked successfully'
    },
    ERROR: {
        REQUIRED_FIELDS: 'Required fields are missing',
        USER_NOT_FOUND: 'User not found',
        POST_NOT_FOUND: 'Post not found',
        EMAIL_EXISTS: 'Email already exists',
        INVALID_EMAIL: 'Invalid email format',
        INVALID_NAME_LENGTH: 'Name must be between 2 and 50 characters',
        INVALID_AGE: 'Age must be between 0 and 120',
        SEARCH_QUERY_REQUIRED: 'Search query is required'
    }
};

module.exports = {
    API_CONFIG,
    VALIDATION_RULES,
    HTTP_STATUS,
    MESSAGES
};
