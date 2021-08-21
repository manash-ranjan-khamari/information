const BaseController = require('../../common/controller/basecontroller.js');
const recordService = require('../service/recordservice.js');

class RecordController extends BaseController {
    constructor() {
        super();
    }

    async getRecords(req, res) {
        try {
            const records = await recordService.getRecords({
                startDate: req.body.startDate && new Date(`${req.body.startDate} 00:00:00Z`),
                endDate: req.body.endDate && new Date(`${req.body.endDate} 23:59:59Z`),
                minCount: parseInt(req.body.minCount),
                maxCount: parseInt(req.body.maxCount)
            });
            return this.sendApiResponse({res, status: this.StatusCodes.OK, model: {records}});
        } catch(error) {
            return this.sendApiResponse({res, status: (error?.status || this.StatusCodes.INTERNAL_SERVER_ERROR), error});
        }
    }
}

module.exports = RecordController;
