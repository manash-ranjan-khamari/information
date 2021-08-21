const {StatusCodes} = require('http-status-codes');
const CustomError = require('../../common/error/customerror.js');

class BaseController {
    constructor() {
        this.StatusCodes = StatusCodes;
    }

    sendApiResponse({res, status, model = {}, error}) {
        let msg, code;

        if (error instanceof CustomError) {
            switch(error?.status) {
                case 'BAD_REQUEST':
                    status = this.StatusCodes.BAD_REQUEST;
                    break;
            }
        }

        // for non 500 we should log as well, not doing it as the scope will increase 
        switch(status) {
            case 500: 
                code = -1;
                msg = 'Error';
                break;

            case 400:
                code = -2;
                msg = 'Bad Request';
                break;
            
            default:
                code = 0;
                msg = 'Success';
        }

        res.status(status || 200).send({
            code,
            msg,
            ...model
        });
    }
}

module.exports = BaseController;
