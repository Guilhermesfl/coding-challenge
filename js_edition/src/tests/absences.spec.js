import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

const testValidAbsencesRoute = (route, test) => {
  return chai.request(app).get(route).end((err, res) => {
    res.should.have.status(200);
    res.body.should.have.property('total');
    res.body.should.have.property('absences');
    test(err, res);
  });
};

const testInvalidAbsencesRoute = (route, test) => {
  return chai.request(app).get(route).end((err, res) => {
    res.body.should.have.property('error');
    test(err, res);
  });
};

describe('Absences', () => {
  describe('GET /absences', () => {
    it('should get all absences records with employees names', (done) => {
      const test = (err, res) => {
        res.body.absences
          .filter((e) => e.hasOwnProperty('userName'))
          .should.have.lengthOf(res.body.total);
        done();
      };
      testValidAbsencesRoute('/absences', test);
    });

    it('should get absences from a valid user id', (done) => {
      const id = 2664;
      const test = (err, res) => {
        res.body.absences
          .filter((e) => e.userId === id)
          .should.have.lengthOf(res.body.total);
        done();
      };
      testValidAbsencesRoute(`/absences?userId=${id}`, test);
    });

    it('should not get absences from a valid user id that has no absence', (done) => {
      const id = 2290;
      const test = (err, res) => {
        res.should.have.status(404);
        done();
      };
      testInvalidAbsencesRoute(`/absences?userId=${id}`, test);
    });

    it('should not get absences from a invalid user id', (done) => {
      const id = -1;
      const test = (err, res) => {
        res.should.have.status(404);
        done();
      };
      testInvalidAbsencesRoute(`/absences?userId=${id}`, test);
    });

    it('should get absences from a given date range', (done) => {
      const [startDate, endDate] = ['2017-01-01', '2017-02-01'];
      const test = (err, res) => {
        const filterStart = new Date().setUTCFullYear('2017', '01', '01');
        const filterEnd = new Date().setUTCFullYear('2017', '02', '01');
        res.body.absences
          .filter((e) => {
            const [startYear, startMonth, startDay] = e.startDate.split('-');
            const [endYear, endMonth, endDay] = e.endDate.split('-');
            const absStart = new Date().setUTCFullYear(startYear, startMonth, startDay);
            const absEnd = new Date().setUTCFullYear(endYear, endMonth, endDay);
            return (absStart >= filterStart && absStart <= filterEnd)
              || (absEnd >= filterStart && absEnd <= filterEnd);
          })
          .should.have.lengthOf(res.body.total);
        done();
      };
      testValidAbsencesRoute(`/absences?startDate=${startDate}&endDate=${endDate}`, test);
    });

    it('should not get absences from a invalid date range', (done) => {
      const [startDate, endDate] = ['2017-01-01', '2016-08-01'];
      const test = (err, res) => {
        res.should.have.status(404);
        done();
      };
      testInvalidAbsencesRoute(`/absences?startDate=${startDate}&endDate=${endDate}`, test);
    });

    it('should get absences from a given date range and valid user id', (done) => {
      const [startDate, endDate] = ['2017-01-01', '2017-02-01'];
      const id = 2664;
      const test = (err, res) => {
        const filterStart = new Date().setUTCFullYear('2017', '01', '01');
        const filterEnd = new Date().setUTCFullYear('2017', '02', '01');
        res.body.absences
          .filter((e) => {
            const [startYear, startMonth, startDay] = e.startDate.split('-');
            const [endYear, endMonth, endDay] = e.endDate.split('-');
            const absStart = new Date().setUTCFullYear(startYear, startMonth, startDay);
            const absEnd = new Date().setUTCFullYear(endYear, endMonth, endDay);
            return (absStart >= filterStart && absStart <= filterEnd)
              || (absEnd >= filterStart && absEnd <= filterEnd);
          })
          .filter((e) => e.userId === id)
          .should.have.lengthOf(res.body.total);
        done();
      };
      testValidAbsencesRoute(`/absences?startDate=${startDate}&endDate=${endDate}&userId=${id}`, test);
    });
  });

  describe('GET /absences/sickness', () => {
    it('should get absences due to sickness', (done) => {
      const test = (err, res) => {
        res.body.absences
          .filter((e) => e.message.includes('sick'))
          .should.have.lengthOf(res.body.total);
        done();
      };
      testValidAbsencesRoute('/absences/sickness', test);
    });
  });

  describe('GET /absences/vacations', () => {
    it('should get absences due to vacation', (done) => {
      const test = (err, res) => {
        res.body.absences
          .filter((e) => e.message.includes('vacation'))
          .should.have.lengthOf(res.body.total);
        done();
      };
      testValidAbsencesRoute('/absences/vacations', test);
    });
  });
});

describe('Calendar', () => {
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
