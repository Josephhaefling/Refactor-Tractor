import domUpdates from '../src/domUpdates'
import { expect } from 'chai';
const chai = require('chai')
 let spies = require('chai-spies');
  chai.use(spies);


describe('domUpdates', function(){

  afterEach(function () {
    chai.spy.restore(domUpdates)
  });

  it.only('Should Spy on defineData', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['defineData'], () => {});
    domUpdates.defineData()
    expect(domUpdates.defineData).to.have.been.called(1);
  });

  it.only('Should Spy on defineData', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['defineData'], () => {});
    domUpdates.defineData()
    expect(domUpdates.defineData).to.have.been.called(1);
    expect(domUpdates.defineData).to.have.been.called.with
  });



})


// describe('Should display information on the DOM', function() {
//   beforeEach(() =>{
//   global.thing = {}
//     chai.spy.on(thing, ['defineData'], () => {})
//   });

  // it('Should spy on defineData', function() {
  //   domUpdates.defineData()
  //   expect(domUpdates.defineData).to.have.been.called(1);
  // });

//   it.only('Should be a function', () => {
//     expect(DomUpdates).to.be.a('function')
//   });
 
  



 
// })