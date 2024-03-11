"use strict";
// tests/integration/Book.test.ts
// import sinon from 'sinon';
// import chai from 'chai';
// import chaiHttp = require('chai-http');
// import SequelizeUser from '../../database/models/SequelizeUser';
// // @ts-check
// import App from '../../app';
// chai.use(chaiHttp);
// const { app } = new App();
// const { expect } = chai;
// const mockUsers = [{ name: 'Vitor',
//   email: 'jv6810@gmail.com',
//   password: '123456' }];
// describe('Films Test', function () {
//   afterEach(function () {
//     sinon.restore();
//   });
//   it('listando filmes', async function () {
//     sinon.stub(SequelizeUser, 'findAll').resolves(mockUsers as any);
//     const { status, body } = await chai.request(app).get('/users');
//     expect(status).to.equal(200);
//     expect(body).to.deep.equal(mockUsers);
//   });
// });
