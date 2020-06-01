import {
  expect
} from 'chai';
import Pantry from '../src/pantry';
// import data from '../data/pantry-data';
describe('Pantry', function () {
  let user;
  let userInfo;
  let recipe;
  let recipe1;
  let pantry;
  let samplePantryInfo
  beforeEach(function () {
    // userInfo = data.users[0];
    // user = new User(userInfo)
    samplePantryInfo = [{
      "ingredient": 1,
      "amount": 1
    }, {
      "ingredient": 2,
      "amount": 1
    }, {
      "ingredient": 3,
      "amount": 1
    }]
    pantry = new Pantry(samplePantryInfo)
    recipe = {
        "name": "Loaded Chocolate Chip Pudding Cookie Cups",
        "id": 595736,
        "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        "ingredients": [{
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
            "name": "rat poison",
            "id": 4,
            "quantity": {
              "amount": 0.5,
              "unit": "large"
            }
          }
        ],
        "instructions": [{
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
      },
      recipe1 = {
        "name": "Loaded Chocolate Chip Pudding Cookie Cups",
        "id": 595736,
        "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        "ingredients": [{
            "name": "all purpose flour",
            "id": 1,
            "quantity": {
              "amount": 1,
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
          }
        ],
        "instructions": [{
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
  it('should be a function', function () {
    expect(Pantry).to.be.a('function');
  });
  it('should have ingredients', function () {
    expect(pantry.ingredients).to.deep.equal(samplePantryInfo);
  });
  it('should be able to check pantry ingredients', function () {
    expect(pantry.checkPantryForIngredients(recipe.ingredients[0])).to.deep.equal(false);
  });
  it('should be able to check pantry ingredients', function () {
    expect(pantry.checkPantryForIngredients(recipe.ingredients[3])).to.deep.equal({
      "name": "rat poison",
      "id": 4,
      "quantity": {
        "amount": 0.5,
        "unit": "large"
      }
    });
  });

  it('should be able to check the ingredient amount', function () {
    expect(pantry.checkIngredientAmount(recipe.ingredients)).to.deep.equal([{
      "id": 1,
      "name": "all purpose flour",
      "quantity": {
        "amount": 0.5,
        "unit": "c",
      }
    }]);
  });

  it('should be able to check the ingredient amount', function () {
    expect(pantry.checkIngredientAmount(recipe1.ingredients)).to.equal(false);
  });

  it('should be able to add an item from the pantry', function() {
    expect(pantry.addItem(recipe.ingredients[1])).to.deep.equal([
  { ingredient: 1, amount: 1 },
  { ingredient: 2, amount: 1.5 },
  { ingredient: 3, amount: 1 }
  ])
  })

  it('should be able to add an item from the pantry', function() {
    expect(pantry.addItem(recipe.ingredients[3])).to.deep.equal([
  { ingredient: 1, amount: 1 },
  { ingredient: 2, amount: 1 },
  { ingredient: 3, amount: 1 },
  { ingredient: 4, amount: 0.5}
])
  })

  it('should be able to remove an item from the pantry', function() {
    let ingredientToRemove = {
      "name": "baking soda",
      "id": 2,
      "quantity": {
        "amount": 0.5,
        "unit": "tsp"
      }
    }
    expect(pantry.removeItem(ingredientToRemove)).to.deep.equal([
  { ingredient: 1, amount: 1 },
  { ingredient: 2, amount: 0.5 },
  { ingredient: 3, amount: 1 }
])
  });
});
