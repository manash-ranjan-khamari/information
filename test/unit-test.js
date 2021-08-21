const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const config = require('../config/appconfig.js');
const mockData = require('./mockdata.js');
chai.use(chaiAsPromised);

const expect = chai.expect;
const baseUrl = config.appUrl;
let url;

describe('/api', function() {
    
    before(function(beforeDone) {
        beforeDone();
    });
    
    describe('POST /api/records/get', function() {
        before(function(beforeDone) {
            url = '/api/records/get';
            beforeDone();
        });

        it('Should return bad request when no request body specified', function(done) {
            request(baseUrl).post(url)
                .expect('Content-type', /json/).expect(400).end(function(err, res) {
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('code').and.equal(-2);
                    expect(res.body).to.have.property('msg').and.equal('Bad Request');
                    
                    expect(res.body).to.have.property('errors').to.be.an('array').to.have.property(0).to.be.a('object');
                    expect(res.body).to.have.property('errors').to.have.property(0).to.have.property('field')
                        .and.equal('startDate');
                    expect(res.body).to.have.property('errors').to.have.property(0).to.have.property('message')
                        .and.equal('must be a valid date in the format YYYY-MM-DD');

                    done();
                });
        });

        it('Should return bad request a invalid startDate is specified', function(done) {
            request(baseUrl).post(url).send(mockData.getRecords.invalidStartDate)
                .expect('Content-type', /json/).expect(400).end(function(err, res) {
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('code').and.equal(-2);
                    expect(res.body).to.have.property('msg').and.equal('Bad Request');
                    
                    expect(res.body).to.have.property('errors').to.be.an('array').to.have.property(0).to.be.a('object');
                    expect(res.body).to.have.property('errors').to.have.property(0).to.have.property('field')
                        .and.equal('startDate');
                    expect(res.body).to.have.property('errors').to.have.property(0).to.have.property('message')
                        .and.equal('must be a valid date in the format YYYY-MM-DD');

                    done();
                });
        });

        it('Should return bad request a invalid endDate is specified', function(done) {
            request(baseUrl).post(url).send(mockData.getRecords.invalidEndDate)
                .expect('Content-type', /json/).expect(400).end(function(err, res) {
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('code').and.equal(-2);
                    expect(res.body).to.have.property('msg').and.equal('Bad Request');
                    
                    expect(res.body).to.have.property('errors').to.be.an('array').to.have.property(0).to.be.a('object');
                    expect(res.body).to.have.property('errors').to.have.property(0).to.have.property('field')
                        .and.equal('endDate');
                    expect(res.body).to.have.property('errors').to.have.property(0).to.have.property('message')
                        .and.equal('must be a valid date in the format YYYY-MM-DD');

                    done();
                });
        });

        it('Should return bad request a startDate > endDate is specified', function(done) {
            request(baseUrl).post(url).send(mockData.getRecords.startGreaterThanEndDate)
                .expect('Content-type', /json/).expect(400).end(function(err, res) {
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('code').and.equal(-2);
                    expect(res.body).to.have.property('msg').and.equal('Bad Request');
                    
                    done();
                });
        });

        it('Should return bad request a invalid minCount is specified', function(done) {
            request(baseUrl).post(url).send(mockData.getRecords.invalidMinCount)
                .expect('Content-type', /json/).expect(400).end(function(err, res) {
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('code').and.equal(-2);
                    expect(res.body).to.have.property('msg').and.equal('Bad Request');
                    
                    expect(res.body).to.have.property('errors').to.be.an('array').to.have.property(0).to.be.a('object');
                    expect(res.body).to.have.property('errors').to.have.property(0).to.have.property('field')
                        .and.equal('minCount');
                    expect(res.body).to.have.property('errors').to.have.property(0).to.have.property('message')
                        .and.equal('must be an integer value');

                    done();
                });
        });

        it('Should return bad request a invalid maxCount is specified', function(done) {
            request(baseUrl).post(url).send(mockData.getRecords.invalidMaxCount)
                .expect('Content-type', /json/).expect(400).end(function(err, res) {
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('code').and.equal(-2);
                    expect(res.body).to.have.property('msg').and.equal('Bad Request');
                    
                    expect(res.body).to.have.property('errors').to.be.an('array').to.have.property(0).to.be.a('object');
                    expect(res.body).to.have.property('errors').to.have.property(0).to.have.property('field')
                        .and.equal('maxCount');
                    expect(res.body).to.have.property('errors').to.have.property(0).to.have.property('message')
                        .and.equal('must be an integer value');

                    done();
                });
        });

        it('Should return bad request a minCount > maxCount is specified', function(done) {
            request(baseUrl).post(url).send(mockData.getRecords.minCountGreaterThanMaxCount)
                .expect('Content-type', /json/).expect(400).end(function(err, res) {
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('code').and.equal(-2);
                    expect(res.body).to.have.property('msg').and.equal('Bad Request');

                    done();
                });
        });

        it('Should return successful response when valid input payload is specified - I', function(done) {
            request(baseUrl).post(url).send(mockData.getRecords.validRequest.one)
                .expect('Content-type', /json/).expect(200).end(function(err, res) {
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('code').and.equal(0);
                    expect(res.body).to.have.property('msg').and.equal('Success');

                    expect(res.body).to.have.property('records').to.be.an('array').to.have.property(0).to.be.a('object');
                    expect(res.body).to.have.property('records').to.have.property(0).to.have.property('key');
                    expect(res.body).to.have.property('records').to.have.property(0).to.have.property('createdAt');
                    expect(res.body).to.have.property('records').to.have.property(0).to.have.property('totalCount');

                    done();
                });
        });

        it('Should return successful response when valid input payload is specified - II', function(done) {
            request(baseUrl).post(url).send(mockData.getRecords.validRequest.two)
                .expect('Content-type', /json/).expect(200).end(function(err, res) {
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('code').and.equal(0);
                    expect(res.body).to.have.property('msg').and.equal('Success');

                    expect(res.body).to.have.property('records').to.be.an('array').to.have.property(0).to.be.a('object');
                    expect(res.body).to.have.property('records').to.have.property(0).to.have.property('totalCount')
                        .to.be.at.least(mockData.getRecords.validRequest.two.minCount);
                    expect(res.body).to.have.property('records').to.have.property(0).to.have.property('totalCount')
                        .to.be.at.most(mockData.getRecords.validRequest.two.maxCount);
                    done();
                });
        });
    });
});
