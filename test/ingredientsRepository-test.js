import { expect } from 'chai';
import IngredientsRepository from '../src/ingredientsRepository';
import Recipe from '../src/Recipe';
describe('ingredientsRepository', () => {
  let ingredientsRepository;
  let recipe;
  let ingredientsData;
  let recipeData;

  beforeEach(() => {
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

    recipeData = { "name": "Loaded Chocolate Chip Pudding Cookie Cups",
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
          "name": "rat poison",
          "id": 4,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        }
      ],
    },
    ingredientsRepository = new IngredientsRepository(ingredientsData)
    recipe = new Recipe(recipeData)
  })

  it('should be a function', function() {
    expect(IngredientsRepository).to.be.a('function');
  });
  it('should be able to get the cost of ingredients', () => {
    expect(ingredientsRepository.getIngredientsCost(recipe.ingredients)).to.equal(1878)
  })
  it('should be able to get the cost of ingredients', () => {
    expect(ingredientsRepository.getIngredientsCost([recipeData.ingredients[3]])).to.equal(902)
  })
})
