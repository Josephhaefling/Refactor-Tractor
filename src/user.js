class User {
  constructor(user, pantry) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.viewingFavorites = false;
  }

  saveRecipe(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  removeRecipe(recipe) {
    let i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1);
  }

  decideToCook(recipe) {
    this.recipesToCook.push(recipe);
  }

  filterRecipes(type) {
    return this.favoriteRecipes.filter(recipe => recipe.type.includes(type));
  }

  checkUserPantryForIngredients(recipeToCook) {
    const recipeIngredients = recipeToCook.ingredients
    const missingIngredients = this.pantry.checkPantryForIngredients(recipeIngredients);
    const shortOnIngredients = this.pantry.checkIngredientAmount(recipeIngredients);
    if(missingIngredients !== true || shortOnIngredients.length > 0) {
      return shortOnIngredients === true ? missingIngredients : missingIngredients.concat(shortOnIngredients)
    }
  }

  addItemsToPantry(ingredientsToAdd) {
  ingredientsToAdd.forEach(ingredient => {
    let t = this.pantry.ingredients.find(pantryIngredient => pantryIngredient.ingredient === ingredient.id)
    if(!t) {
      this.pantry.ingredients.push({ingredient: ingredient.id, amount: ingredient.quantity.amount})
    } else {
      const indexOfT = this.pantry.ingredients.indexOf(t)
      this.pantry.ingredients[indexOfT].amount += ingredient.quantity.amount
      }
    })
  }
}

module.exports = User;
