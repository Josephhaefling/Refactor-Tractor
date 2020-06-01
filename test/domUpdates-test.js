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

  it.only('Should Spy on defineUser', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['defineUser'], () => {});
    domUpdates.defineUser()
    expect(domUpdates.defineUser).to.have.been.called(1);
  });

  it.only('Should Spy on getWelcomeMessage', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['getWelcomeMessage'], () => {});
    domUpdates.getWelcomeMessage()
    expect(domUpdates.getWelcomeMessage).to.have.been.called(1);
  });

  it.only('Should Spy on addRecipesToDom', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['addRecipesToDom'], () => {});
    domUpdates.addRecipesToDom()
    expect(domUpdates.addRecipesToDom).to.have.been.called(1);
  });

  it.only('Should Spy on listTags', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['listTags'], () => {});
    domUpdates.listTags()
    expect(domUpdates.listTags).to.have.been.called(1);
  });

  it.only('Should Spy on capitalize', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['capitalize'], () => {});
    domUpdates.capitalize()
    expect(domUpdates.capitalize).to.have.been.called(1);
  });

  it.only('Should Spy on showAllRecipes', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['showAllRecipes'], () => {});
    domUpdates.showAllRecipes()
    expect(domUpdates.showAllRecipes).to.have.been.called(1);
  });

  it.only('Should Spy on showWelcomeBanner', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['showWelcomeBanner'], () => {});
    domUpdates.showWelcomeBanner()
    expect(domUpdates.showWelcomeBanner).to.have.been.called(1);
  });

  it.only('Should Spy on hideUnselectedRecipes', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['hideUnselectedRecipes'], () => {});
    domUpdates.hideUnselectedRecipes()
    expect(domUpdates.hideUnselectedRecipes).to.have.been.called(1);
  });

  it.only('Should Spy on fillAppleIcon', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['fillAppleIcon'], () => {});
    domUpdates.fillAppleIcon()
    expect(domUpdates.fillAppleIcon).to.have.been.called(1);
  });

  it.only('Should Spy on emptyAppleIcon', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['emptyAppleIcon'], () => {});
    domUpdates.emptyAppleIcon()
    expect(domUpdates.emptyAppleIcon).to.have.been.called(1);
  });

  it.only('Should Spy on exitRecipe', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['exitRecipe'], () => {});
    domUpdates.exitRecipe()
    expect(domUpdates.exitRecipe).to.have.been.called(1);
  });

  it.only('Should Spy on openRecipeInfo', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['openRecipeInfo'], () => {});
    domUpdates.openRecipeInfo()
    expect(domUpdates.openRecipeInfo).to.have.been.called(1);
  });

  it.only('Should Spy on generateRecipeTitle', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['generateRecipeTitle'], () => {});
    domUpdates.generateRecipeTitle()
    expect(domUpdates.generateRecipeTitle).to.have.been.called(1);
  });

  it.only('Should Spy on addRecipeImage', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['addRecipeImage'], () => {});
    domUpdates.addRecipeImage()
    expect(domUpdates.addRecipeImage).to.have.been.called(1);
  });

  it.only('Should Spy on generateInstructions', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['generateInstructions'], () => {});
    domUpdates.generateInstructions()
    expect(domUpdates.generateInstructions).to.have.been.called(1);
  });

  it.only('Should Spy on generateRecipeBtns', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['generateRecipeBtns'], () => {});
    domUpdates.generateRecipeBtns()
    expect(domUpdates.generateRecipeBtns).to.have.been.called(1);
  });

  it.only('Should Spy on displayRecipeCost', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['displayRecipeCost'], () => {});
    domUpdates.displayRecipeCost()
    expect(domUpdates.displayRecipeCost).to.have.been.called(1);
  });

  it.only('Should Spy on generateIngredients', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['generateIngredients'], () => {});
    domUpdates.generateIngredients()
    expect(domUpdates.generateIngredients).to.have.been.called(1);
  });

  it.only('Should Spy on getIngredientName', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['getIngredientName'], () => {});
    domUpdates.getIngredientName()
    expect(domUpdates.getIngredientName).to.have.been.called(1);
  });

  it.only('Should Spy on showMyRecipesBanner', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['showMyRecipesBanner'], () => {});
    domUpdates.showMyRecipesBanner()
    expect(domUpdates.showMyRecipesBanner).to.have.been.called(1);
  });

  it.only('Should Spy on toggleMenu', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['toggleMenu'], () => {});
    domUpdates.toggleMenu()
    expect(domUpdates.toggleMenu).to.have.been.called(1);
  });

  it.only('Should Spy on displaySearchedFavorite', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['displaySearchedFavorite'], () => {});
    domUpdates.displaySearchedFavorite()
    expect(domUpdates.displaySearchedFavorite).to.have.been.called(1);
  });

  it.only('Should Spy on hideRecipes', function() {
    global.domUpdates 
    chai.spy.on(domUpdates, ['hideRecipes'], () => {});
    domUpdates.hideRecipes()
    expect(domUpdates.hideRecipes).to.have.been.called(1);
  });










})


