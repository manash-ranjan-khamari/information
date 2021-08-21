const RecordController = require('./server/record/controller/recordcontroller.js');
const RecordValidator = require('./server/record/validator/recordvalidator.js');
const auth = require('./middleware/auth.js');

class Routes {
    _getMethodLoader(Obj, method) {
        return function (req, res, next) {
            const controller = new Obj();

            controller[method].bind(controller)(req, res, next);
        };
    }

    exposeRoutes(app) {
        app.get('/', (req, res) => {
            res.send('Welcome to API Codebase.');
        });
        app.get('/health', (req, res) => {
            res.send('Service is up.');
        });
        app.post('/api/records/get', [RecordValidator.getRecords, auth], this._getMethodLoader(RecordController, 'getRecords'));
        app.get('*', (req, res) => {
            res.send('Final fallback');
        });
    }
}

module.exports = new Routes();
