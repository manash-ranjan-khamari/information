module.exports = {
    getRecords: {
        invalidStartDate: {
            startDate: 'A'
        },
        invalidEndDate: {
            startDate: '2021-01-01',
            endDate: 'A'
        },
        startGreaterThanEndDate: {
            startDate: '2021-01-11',
            endDate: '2021-01-01',
            minCount: 1,
            maxCount: 100
        },
        invalidMinCount: {
            startDate: '2021-01-01',
            endDate: '2021-01-11',
            minCount: 'A',
            maxCount: 100
        },
        invalidMaxCount: {
            startDate: '2021-01-01',
            endDate: '2021-01-11',
            minCount: 1,
            maxCount: 'B'
        },
        minCountGreaterThanMaxCount: {
            startDate: '2021-01-01',
            endDate: '2021-01-11',
            minCount: 100,
            maxCount: 1
        },
        validRequest: {
            one: {
                startDate: '2015-01-01',
                endDate: '2015-01-11',
                minCount: 1,
                maxCount: 1000
            },
            two: {
                startDate: '2015-01-01',
                endDate: '2015-01-11',
                minCount: 3000,
                maxCount: 10000
            }
        }
    }
};
