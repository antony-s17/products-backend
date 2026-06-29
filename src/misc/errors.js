export const Selector = {
    NOT_FOUND: "notFound",
    BAD_INPUT:"badInput",
    BAD_ERROR:"badError"
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