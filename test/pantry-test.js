import { expect } from 'chai';

import Pantry from '../src/pantry';
// import data from '../data/pantry-data';

describe('User', function() {
  let user;
  let userInfo;
  let recipe;
  let pantry;
  let samplePantryInfo
  beforeEach(function() {
    // userInfo = data.users[0];
    // user = new User(userInfo)
    samplePantryInfo =  [{
      "ingredient": 1,
      "amount": 1
    },{
      "ingredient": 2,
      "amount": 1
    },{
      "ingredient": 3,
      "amount": 1
    }]
    pantry = new Pantry (samplePantryInfo)
    recipe = { "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [
        {
          "name": "all purpose flour",
          "id": 1,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "name": "baking soda",
          "id": 2,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "name": "egg",
          "id": 3,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
        {
          "name": "egg",
          "id": 4,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        }
      ],
      "instructions": [
        {
          "number": 1,
          "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy."
        },
        {
          "number": 2,
          "instruction": "Add egg and vanilla and mix until combined."
        },
        {
          "number": 3,
          "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees."
        }
      ],
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    }
  });

  it.only('should be a function', function() {
    expect(Pantry).to.be.a('function');
  });

  it.only('should have ingredients', function() {
    expect(pantry.ingredients).to.deep.equal(samplePantryInfo);
  });

  it.only('should be able to check pantry ingredients', function() {
    expect(pantry.checkPantryIngredients(recipe.ingredients[3])).to.deep.equal(recipe.ingredients[3]);
  });

  it.only('should be able to check pantry ingredients', function() {
    expect(pantry.checkPantryIngredients(recipe.ingredients[1])).to.equal(true);
  });

  it.only('should be able to check the ingredient amount', function() {
    expect(pantry.checkIngredientAmount(samplePantryInfo[1],recipe.ingredients[1])).to.equal(true);
  });

  it.only('should be able to check the ingredient amount', function() {
    expect(pantry.checkIngredientAmount(samplePantryInfo[0],recipe.ingredients[0])).to.equal(recipe.ingredients[0]);
  });

});