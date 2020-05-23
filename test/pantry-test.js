import { expect } from 'chai';

import User from '../src/pantry';
import data from '../data/pantry-data';

describe('User', function() {
  let user;
  let userInfo;
  let recipe;

  beforeEach(function() {
    userInfo = data.users[0];
    user = new User(userInfo)

    recipe = {name: 'Chicken Parm', type: ['italian', 'dinner']};
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  
});