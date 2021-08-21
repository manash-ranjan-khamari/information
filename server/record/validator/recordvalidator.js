const {body, param, query, validationResult} = require('express-validator');

const getRule = (keyName, position) => {
    let rule;

    switch(position) {
        case 'query':
            rule = query(keyName);
            break;

        case 'body':
            rule = body(keyName);
            break;

        default:
            rule = param(keyName);
            break;
    }

    return rule;
};

const dateValidation = (keyName, position) => [
    getRule(keyName, position)
    .trim()
    .isISO8601('yyyy-mm-dd')
    .withMessage('must be a valid date in the format YYYY-MM-DD')
];
const integerValidation = (keyName, position) => [
    getRule(keyName, position)
    .isInt({min: 1})
    .withMessage('must be an integer value')
];

const getRecordsValidationRule = [...dateValidation('startDate', 'body'), ...dateValidation('endDate', 'body'), 
    ...integerValidation('minCount', 'body'), ...integerValidation('maxCount', 'body')];

const validator = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => {
            return {
                field: error.param,
                message: error.msg
            };
        });
        
        return res.status(400).send({
            code: -2,
            msg: 'Bad Request',
            errors: errorMessages
        });
    }
    
    next();
}

module.exports = {
    getRecords: [
        getRecordsValidationRule,
        validator
    ]
};
