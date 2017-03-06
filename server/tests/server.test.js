const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');

describe('GET /sfshook/:id', () => {
    it('should return ss event doc', (done) => {
        request(app)
            .get(`/ssevents/${events[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.event.change).toBe(events[0].symbol);
            })
            .end(done);
    });

    it('should return 404 if earning not found', (done) => {
        // make sure you get a 404 back
        var hexId = new ObjectID().toHexString();

        request(app)
            .get(`/sfshook/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get(`/sfshook/1234fd`)
            .expect(404)
            .end(done);
    });
})