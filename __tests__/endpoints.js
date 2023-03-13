const request = require('supertest');
const fs = require('fs');
const path = require('path');
const db = require('../server/models/songs');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/api/addSong', () => {
    describe('POST', () => {
      it('responds with 200 status and content type', () => {
        request(server)
          .post('/api/addSong')
          .send({
            track: 'track',
            trackId: 'trackId',
            artist: 'artist',
            previewLink: 'previewLink',
            dataObj: {},
          })
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });
  describe('/api/getSavedSongs', () => {
    describe('GET', () => {
      it('responds with 200 status and content type', () => {
        request(server)
          .get('/api/getSavedSongs')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });
  describe('/api', () => {
    describe('GET', () => {
      it('responds with 200 status', () => {
        request(server)
          .get('/api')
          .expect(200);
      });
    });
  });
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and content type', () => {
        request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });
  describe('/api/login', () => {
    describe('GET', () => {
      it('responds with 200 status', () => {
        request(server)
          .get('/api/login')
          .expect(200);
      });
    });
  });
  describe('/api/authenticate', () => {
    describe('GET', () => {
      it('responds with 200 status', () => {
        request(server)
          .get('/api/authenticate')
          .expect(200);
      });
    });
  });
  describe('/api/checkAuth', () => {
    describe('GET', () => {
      it('responds with 200 status', () => {
        request(server)
          .get('/api/checkAuth')
          .expect(200);
      });
    });
  });
});
