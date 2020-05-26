import { expect } from 'chai';
import User from '../src/user';
import Recipe from '../src/recipe';
import Pantry  from '../src/pantry';
// import data from '../data/users-data';
describe('User', function() {
  let user;
  let userInfo;
  let recipe;
  let recipe1;
  let recipe2;
  let pantry;
  beforeEach(function() {
    userInfo =   {
      "id": 1,
      "name": "Saige O'Kon"
    }
    pantry = new Pantry([{
      "ingredient": 1,
      "amount": 1
    },{
      "ingredient": 2,
      "amount": 1
    },{
      "ingredient": 3,
      "amount": 1
    }])
    user = new User(userInfo, pantry)
    recipe = {name: 'Chicken Parm', type: ['italian', 'dinner']};
    recipe1 = new Recipe({ "name": "Loaded Chocolate Chip Pudding Cookie Cups",
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
  });
    recipe2 = new Recipe({ "name": "Loaded Chocolate Chip Pudding Cookie Cups",
    "id": 595736,
    "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
    "ingredients": [
      {
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
      },
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
  });
  });
  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should initialize with an id', function() {
    expect(user.id).to.eq(1);
  });

  it('should initialize with a name', function() {
    expect(user.name).to.eq('Saige O\'Kon');
  });

  it('should initialize with a pantry', function() {
    expect(user.pantry.ingredients[0].ingredient).to.eq(1);
  });

  it('should initialize with an empty favoriteRecipes array', function() {
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('should initialize with an empty recipesToCook array', function() {
    expect(user.recipesToCook).to.deep.equal([]);
  });

  it('should be able to save a recipe to favoriteRecipes', function() {
    user.saveRecipe(recipe);
    expect(user.favoriteRecipes[0].name).to.equal('Chicken Parm');
  });

  it('should be able to decide to cook a recipe', function() {
    user.decideToCook(recipe);
    expect(user.recipesToCook[0].name).to.equal('Chicken Parm');
  });

  it('should be able to filter recipes by type', function() {
    user.saveRecipe(recipe);
    expect(user.filterRecipes('italian')).to.deep.equal([recipe]);
  });

  it('should be able to filter recipes by type', function() {
    user.saveRecipe(recipe);
    expect(user.filterRecipes('italian')).to.deep.equal([recipe]);
  });

  it('should be able to check pantry for ingredients', function() {
    user.decideToCook(recipe1);
    expect(user.checkUserPantryForIngredients(user.recipesToCook[0])).to.deep.equal([
  { '4': { name: 'egg', amount: 1 } },
  { '1': { name: 'all purpose flour', amount: 0.5 } }
])
});

  it('should be able to check pantry for ingredients', function() {
    user.decideToCook(recipe2);
    expect(user.checkUserPantryForIngredients(user.recipesToCook[0])).to.deep.equal(true);
  });

  it.only('should be able to add ingredients to the pantry', function() {
    const ingredientsToAdd = user.checkUserPantryForIngredients(recipe1)
    expect(user.addItemsToPantry(ingredientsToAdd)).to.equal('thing')
  })
});
