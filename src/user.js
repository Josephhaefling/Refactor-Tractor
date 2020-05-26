class User {
  constructor(user, pantry) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
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
    return missingIngredients.length > 0  || shortOnIngredients.length > 0 ? missingIngredients.concat(shortOnIngredients) : true
  }

}

module.exports = User;
