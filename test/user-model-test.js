'use strict';

const User = require('../app/models/users.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('model/user', () => {

  beforeEach(() => {
    mongoose.connect('mongodb://localhost:27017/simple-sales-crm');
  });

  it('should defined User model', () => {
    expect(User).to.be.ok;
  });

  it.only('should have a user', (done) => {
    const query = {
      'username': 'sales'
    };
    User.findOne(query, function(err, user) {
      expect(err).to.be.null;
      expect(user).to.not.be.null;
      done();
    });
  });
});
