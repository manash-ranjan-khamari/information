const MongoDBService = require('../../common/service/mongodbservice.js');
const CustomError = require('../../common/error/customerror.js');

class RecordService extends MongoDBService {
    constructor() {
        super();
    }

    async getRecords({startDate, endDate, minCount, maxCount}) {
        if (!(startDate && endDate && startDate < endDate && minCount && maxCount && minCount < maxCount)) {
            return Promise.reject(new CustomError({status: 'BAD_REQUEST', message: 'Invalid request, please check the request payload'}));
        }
        const collection = this.db.collection('records');
        const query = [
            {
                $set: {
                    totalCount: {
                        $sum: '$counts'
                    }
                }
            },
            {
                $match: {
                    totalCount: {
                        $gte: minCount,
                        $lte: maxCount
                    },
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    key: '$key',
                    createdAt: '$createdAt',
                    totalCount: '$totalCount'
                }
            }
        ];

        return await collection.aggregate(query).toArray();
    }
}

module.exports = new RecordService();
