import domUpdates from '../src/domUpdates'
import { expect } from 'chai';
const chai = require('chai')
let spies = require('chai-spies');
chai.use(spies);

describe('domUpdates', function() {
  afterEach(function () {
    chai.spy.restore(domUpdates)
  });

  it('Should Spy on defineData', function() {
    let ingredientsData;
    let recipeData = { "name": "Loaded Chocolate Chip Pudding Cookie Cups",
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
    ingredientsData = [
      {
        "id": 1,
        "name": "wheat flour",
        "estimatedCostInCents": 142
      },
      {
        "id": 2,
        "name": "bicarbonate of soda",
        "estimatedCostInCents": 582
      },
      {
        "id": 3,
        "name": "eggs",
        "estimatedCostInCents": 472
      },
      {
        "id": 4,
        "name": "rat poison",
        "estimatedCostInCents": 902
      },
    ],

    global.domUpdates
    chai.spy.on(domUpdates, ['defineData'], () => {});
    domUpdates.defineData(recipeData, ingredientsData)
    expect(domUpdates.defineData).to.have.been.called(1);
    expect(domUpdates.defineData).to.have.been.called.with(recipeData, ingredientsData)
  });

  it('Should Spy on defineUser', function() {
    let user = {
      "id": 1,
      "name": "Saige O'Kon"
    }
    global.domUpdates
    chai.spy.on(domUpdates, ['defineUser'], () => {});
    domUpdates.defineUser(user)
    expect(domUpdates.defineUser).to.have.been.called(1);
    expect(domUpdates.defineUser).to.have.been.called.with(user)
  });

  it('Should Spy on getWelcomeMessage', function() {
    let firstName = 'Jaydon';
    global.domUpdates
    chai.spy.on(domUpdates, ['getWelcomeMessage'], () => {});
    domUpdates.getWelcomeMessage(firstName)
    expect(domUpdates.getWelcomeMessage).to.have.been.called(1);
    expect(domUpdates.getWelcomeMessage).to.have.been.called.with(firstName)
  });

  it('Should Spy on addRecipesToDom', function() {
    let ingredientsData = [{
      "id": 1,
      "name": "wheat flour",
      "estimatedCostInCents": 142
    },
    {
      "id": 2,
      "name": "bicarbonate of soda",
      "estimatedCostInCents": 582
    },
    {
      "id": 3,
      "name": "eggs",
      "estimatedCostInCents": 472
    },
    {
      "id": 4,
      "name": "rat poison",
      "estimatedCostInCents": 902
    }]
    let shortRecipeName = 'Loaded Chocolate Chip Pudding Cookie Cups';
    let recipeData = { "name": "Loaded Chocolate Chip Pudding Cookie Cups",
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

    global.domUpdates
    chai.spy.on(domUpdates, ['addRecipesToDom'], () => {});
    domUpdates.addRecipesToDom(recipeData, shortRecipeName)
    expect(domUpdates.addRecipesToDom).to.have.been.called(1);
    expect(domUpdates.addRecipesToDom).to.have.been.called.with(recipeData, shortRecipeName)
  });

  it('Should Spy on listTags', function() {
    let allTags = ["antipasti",
      "antipasto",
      "appetizer",
      "breakfast",
      "brunch",
      "condiment",
      "dinner",
      "dip",
      "hor d'oeuvre",
      "lunch",
      "main course",
      "main dish",
      "morning meal",
      "salad", "sauce",
      "side dish",
      "snack",
      "spread",
      "starter"]
    global.domUpdates
    chai.spy.on(domUpdates, ['listTags'], () => {});
    domUpdates.listTags(allTags)
    expect(domUpdates.listTags).to.have.been.called(1);
    expect(domUpdates.listTags).to.have.been.called.with(allTags)
  });

  it('Should Spy on capitalize', function() {
    let words = 'Hello';
    global.domUpdates
    chai.spy.on(domUpdates, ['capitalize'], () => {});
    domUpdates.capitalize(words)
    expect(domUpdates.capitalize).to.have.been.called(1);
    expect(domUpdates.capitalize).to.have.been.called.with(words);
  });

  it('Should Spy on showAllRecipes', function() {
    let ingredientsData = [
      {
        "id": 1,
        "name": "wheat flour",
        "estimatedCostInCents": 142
      },
      {
        "id": 2,
        "name": "bicarbonate of soda",
        "estimatedCostInCents": 582
      },
      {
        "id": 3,
        "name": "eggs",
        "estimatedCostInCents": 472
      },
      {
        "id": 4,
        "name": "rat poison",
        "estimatedCostInCents": 902
      },
    ]

    let passedRecipes = { "name": "Loaded Chocolate Chip Pudding Cookie Cups",
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
    global.domUpdates
    chai.spy.on(domUpdates, ['showAllRecipes'], () => {});
    domUpdates.showAllRecipes(passedRecipes)
    expect(domUpdates.showAllRecipes).to.have.been.called(1);
    expect(domUpdates.showAllRecipes).to.have.been.called.with(passedRecipes);
  });

  it('Should Spy on showWelcomeBanner', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['showWelcomeBanner'], () => {});
    domUpdates.showWelcomeBanner()
    expect(domUpdates.showWelcomeBanner).to.have.been.called(1);
  });

  it('Should Spy on hideUnselectedRecipes', function() {
    let ingredientsData = [
      {
        "id": 1,
        "name": "wheat flour",
        "estimatedCostInCents": 142
      },
      {
        "id": 2,
        "name": "bicarbonate of soda",
        "estimatedCostInCents": 582
      },
      {
        "id": 3,
        "name": "eggs",
        "estimatedCostInCents": 472
      },
      {
        "id": 4,
        "name": "rat poison",
        "estimatedCostInCents": 902
      },
    ]

    let foundRecipes = { "name": "Loaded Chocolate Chip Pudding Cookie Cups",
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
    global.domUpdates
    chai.spy.on(domUpdates, ['hideUnselectedRecipes'], () => {});
    domUpdates.hideUnselectedRecipes(foundRecipes)
    expect(domUpdates.hideUnselectedRecipes).to.have.been.called(1);
    expect(domUpdates.hideUnselectedRecipes).to.have.been.called.with(foundRecipes);
  });

  it('Should Spy on fillAppleIcon', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['fillAppleIcon'], () => {});
    domUpdates.fillAppleIcon()
    expect(domUpdates.fillAppleIcon).to.have.been.called(1);
  });

  it('Should Spy on emptyAppleIcon', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['emptyAppleIcon'], () => {});
    domUpdates.emptyAppleIcon()
    expect(domUpdates.emptyAppleIcon).to.have.been.called(1);
  });

  it('Should Spy on exitRecipe', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['exitRecipe'], () => {});
    domUpdates.exitRecipe()
    expect(domUpdates.exitRecipe).to.have.been.called(1);
  });

  it('Should Spy on openRecipeInfo', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['openRecipeInfo'], () => {});
    domUpdates.openRecipeInfo()
    expect(domUpdates.openRecipeInfo).to.have.been.called(1);
  });

  it('Should Spy on generateRecipeTitle', function() {
    let ingredients
    let recipe = { "name": "Loaded Chocolate Chip Pudding Cookie Cups",
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
    ingredients = [
      {
        "id": 1,
        "name": "wheat flour",
        "estimatedCostInCents": 142
      },
      {
        "id": 2,
        "name": "bicarbonate of soda",
        "estimatedCostInCents": 582
      },
      {
        "id": 3,
        "name": "eggs",
        "estimatedCostInCents": 472
      },
      {
        "id": 4,
        "name": "rat poison",
        "estimatedCostInCents": 902
      },
    ],
    global.domUpdates
    chai.spy.on(domUpdates, ['generateRecipeTitle'], () => {});
    domUpdates.generateRecipeTitle(recipe, ingredients)
    expect(domUpdates.generateRecipeTitle).to.have.been.called(1);
    expect(domUpdates.generateRecipeTitle).to.have.been.called.with(recipe, ingredients);
  });

  it('Should Spy on addRecipeImage', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['addRecipeImage'], () => {});
    domUpdates.addRecipeImage()
    expect(domUpdates.addRecipeImage).to.have.been.called(1);
  });

  it('Should Spy on generateInstructions', function() {
    let ingredients = [
      {
        "id": 1,
        "name": "wheat flour",
        "estimatedCostInCents": 142
      },
      {
        "id": 2,
        "name": "bicarbonate of soda",
        "estimatedCostInCents": 582
      },
      {
        "id": 3,
        "name": "eggs",
        "estimatedCostInCents": 472
      },
      {
        "id": 4,
        "name": "rat poison",
        "estimatedCostInCents": 902
      },
    ]
    let recipe = { "name": "Loaded Chocolate Chip Pudding Cookie Cups",
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

    global.domUpdates
    chai.spy.on(domUpdates, ['generateInstructions'], () => {});
    domUpdates.generateInstructions(recipe)
    expect(domUpdates.generateInstructions).to.have.been.called(1);
    expect(domUpdates.generateInstructions).to.have.been.called.with(recipe);
  });

  it('Should Spy on generateRecipeBtns', function() {
    let ingredients = [
      {
        "id": 1,
        "name": "wheat flour",
        "estimatedCostInCents": 142
      },
      {
        "id": 2,
        "name": "bicarbonate of soda",
        "estimatedCostInCents": 582
      },
      {
        "id": 3,
        "name": "eggs",
        "estimatedCostInCents": 472
      },
      {
        "id": 4,
        "name": "rat poison",
        "estimatedCostInCents": 902
      },
    ]

    let recipe = { "name": "Loaded Chocolate Chip Pudding Cookie Cups",
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

    global.domUpdates
    chai.spy.on(domUpdates, ['generateRecipeBtns'], () => {});
    domUpdates.generateRecipeBtns(recipe)
    expect(domUpdates.generateRecipeBtns).to.have.been.called(1);
    expect(domUpdates.generateRecipeBtns).to.have.been.called.with(recipe);
  });

  it('Should Spy on displayRecipeCost', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['displayRecipeCost'], () => {});
    domUpdates.displayRecipeCost()
    expect(domUpdates.displayRecipeCost).to.have.been.called(1);
  });

  it('Should Spy on generateIngredients', function() {
    let ingredients = [
      {
        "id": 1,
        "name": "wheat flour",
        "estimatedCostInCents": 142
      },
      {
        "id": 2,
        "name": "bicarbonate of soda",
        "estimatedCostInCents": 582
      },
      {
        "id": 3,
        "name": "eggs",
        "estimatedCostInCents": 472
      },
      {
        "id": 4,
        "name": "rat poison",
        "estimatedCostInCents": 902
      },
    ]

    let recipe = { "name": "Loaded Chocolate Chip Pudding Cookie Cups",
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

    global.domUpdates
    chai.spy.on(domUpdates, ['generateIngredients'], () => {});
    domUpdates.generateIngredients(recipe)
    expect(domUpdates.generateIngredients).to.have.been.called(1);
    expect(domUpdates.generateIngredients).to.have.been.called.with(recipe);
  });

  it('Should Spy on getIngredientName', function() {
    let recipeIngredient = {id: 20081, quantity: {}}
    global.domUpdates
    chai.spy.on(domUpdates, ['getIngredientName'], () => {});
    domUpdates.getIngredientName(recipeIngredient)
    expect(domUpdates.getIngredientName).to.have.been.called(1);
    expect(domUpdates.getIngredientName).to.have.been.called.with(recipeIngredient);
  });

  it('Should Spy on showMyRecipesBanner', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['showMyRecipesBanner'], () => {});
    domUpdates.showMyRecipesBanner()
    expect(domUpdates.showMyRecipesBanner).to.have.been.called(1);
  });

  it('Should Spy on toggleMenu', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['toggleMenu'], () => {});
    domUpdates.toggleMenu()
    expect(domUpdates.toggleMenu).to.have.been.called(1);
  });

  it('Should Spy on displaySearchedFavorite', function() {
    let ingredients = [
      {
        "id": 1,
        "name": "wheat flour",
        "estimatedCostInCents": 142
      },
      {
        "id": 2,
        "name": "bicarbonate of soda",
        "estimatedCostInCents": 582
      },
      {
        "id": 3,
        "name": "eggs",
        "estimatedCostInCents": 472
      },
      {
        "id": 4,
        "name": "rat poison",
        "estimatedCostInCents": 902
      },
    ]

    let favorite = { "name": "Loaded Chocolate Chip Pudding Cookie Cups",
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

    global.domUpdates
    chai.spy.on(domUpdates, ['displaySearchedFavorite'], () => {});
    domUpdates.displaySearchedFavorite(favorite)
    expect(domUpdates.displaySearchedFavorite).to.have.been.called(1);
    expect(domUpdates.displaySearchedFavorite).to.have.been.called.with(favorite);
  });

  it('Should Spy on hideRecipes', function() {
    global.domUpdates
    chai.spy.on(domUpdates, ['hideRecipes'], () => {});
    domUpdates.hideRecipes()
    expect(domUpdates.hideRecipes).to.have.been.called(1);
  });
})
