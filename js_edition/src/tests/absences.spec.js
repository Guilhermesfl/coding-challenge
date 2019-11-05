import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Absences', () => {
  describe('GET /absences', () => {
    it('should get all absences records with employees names', (done) => {
      chai.request(app)
        .get('/absences')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('total');
          res.body.should.have.property('absences');
          res.body.absences
            .filter((e) => e.hasOwnProperty('userName'))
            .should.have.lengthOf(res.body.total);
          done();
        });
    });

    it('should get absences from a valid member', (done) => {
      const id = 644;
      chai.request(app)
        .get(`/absences?userId=${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('total');
          res.body.should.have.property('absences');
          res.body.absences
            .filter((e) => e.userId === id)
            .should.have.lengthOf(res.body.total);
          done();
        });
    });

    it('should not get absences from a valid member that has no absence', (done) => {
      const id = 2290;
      chai.request(app)
        .get(`/absences?userId=${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error');
          done();
        });
    });

    it('should not get absences from a invalid member', (done) => {
      const id = -1;
      chai.request(app)
        .get(`/absences?userId=${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error');
          done();
        });
    });

    it('should get absences from a given date range', (done) => {
      const startDate = '2017-01-01';
      const endDate = '2017-02-01';
      chai.request(app)
        .get(`/absences?startDate=${startDate}&endDate=${endDate}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('total');
          res.body.should.have.property('absences');
          done();
        });
    });

    it('should not get absences from a invalid date range', (done) => {
      const startDate = '2017-01-01';
      const endDate = '2016-08-01';
      chai.request(app)
        .get(`/absences?startDate=${startDate}&endDate=${endDate}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error');
          done();
        });
    });
  });

  describe('GET /absences/sickness', () => {
    it('should get absences due to sickness', (done) => {
      chai.request(app)
        .get('/absences/sickness')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('total');
          res.body.should.have.property('absences');
          res.body.absences
            .filter((e) => e.message.includes('sick'))
            .should.have.lengthOf(res.body.total);
          done();
        });
    });
  });

  describe('GET /absences/vacations', () => {
    it('should get absences due to vacation', (done) => {
      chai.request(app)
        .get('/absences/vacations')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('total');
          res.body.should.have.property('absences');
          res.body.absences
            .filter((e) => e.message.includes('vacation'))
            .should.have.lengthOf(res.body.total);
          done();
        });
    });
  });

  describe('GET /', () => {
    it('should download the absences in .ics format', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
