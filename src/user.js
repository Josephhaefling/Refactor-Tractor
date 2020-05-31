class User {
  constructor(user, pantry) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.viewingFavorites = false;
    //erase me later
    this.user = user
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
    const haveIngredients = recipeIngredients.map(recipeIngredient => this.pantry.checkPantryForIngredients(recipeIngredient))
    const missingIngredients = haveIngredients.filter(ingredient => ingredient)
    const shortOnIngredients = this.pantry.checkIngredientAmount(recipeIngredients);
    if(missingIngredients.length === 0 && shortOnIngredients.length > 0) {
      return shortOnIngredients
    } else if(missingIngredients.length > 0 && !shortOnIngredients) {
      return missingIngredients
    } else if (missingIngredients.length > 0 && shortOnIngredients.length > 0) {
      return missingIngredients.concat(shortOnIngredients)
    } else {
      return true
    }
  }

  addItemsToPantry(ingredientsToAdd) {
    ingredientsToAdd.forEach(ingredientToAdd => {
      let pantryItem  = this.pantry.addItem(ingredientToAdd)
    })
    return this.pantry.ingredients
}

  removeRecipeIngredients(recipeIngredients) {
    recipeIngredients.forEach(ingredient => {
      this.pantry.ingredients = this.pantry.removeItem(ingredient)
    })
    return this.pantry.ingredients
  }
}

module.exports = User;
