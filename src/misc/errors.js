export const Selector = {
    NOT_FOUND: "notFound",
    BAD_INPUT:"badInput",
    BAD_ERROR:"badError",
    USER_EXIST:"userExists",
    WRONG_CRED:"wrongCredentials",
    USR_NOTFOUND:"userNotFound",
    UNATHORIZED:"unauthorized"
}

const errors = {
    [Selector.BAD_ERROR]: {
        statusCode:500,
        message: 'something went wrong'
    },
    [Selector.NOT_FOUND]: {
        statusCode:404,
        message: 'resource not found'
    },
    [Selector.BAD_INPUT]: {
        statusCode:400,
        message: 'invalid input'
    },
    [Selector.USER_EXIST]: {
        statusCode:409,
        message: 'user already exists'
    },
    [Selector.WRONG_CRED]: {
        statusCode:400,
        message: 'incorrect credentials'
    },
    [Selector.USR_NOTFOUND]: {
        statusCode:400,
        message: 'user not found'
    },
    [Selector.UNATHORIZED]: {
        statusCode:401,
        message: 'unauthorized'
    }
}

export default class CError extends Error {
    constructor(errorType, customStatusCode = 418) {
        super("");
        this.customCode = customStatusCode;
        const { statusCode, message } = this._getError(errorType);
        this.statusCode = statusCode;
        this.message = message;
    }

    _getError(errorType = Selector.BAD_ERROR) {
        return errors[errorType] ?? this._geCustomMsg(errorType);
    }

    _getCustomMsg(message) {
        return { statusCode: this.customCode, message }
    }
}