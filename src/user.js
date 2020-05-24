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

  checkPantryForIngredients(recipeToCook) {
    console.log('this.pantry', this.pantry.checkPantryForIngredients(recipeToCook.ingredients[0]));
    recipeToCook.ingredients.map(ingredient => {
    let hasIngredient = this.pantry.checkPantryForIngredients(ingredient)
    
      if(hasIngredient) {
      return  this.pantry.checkIngredientAmount(ingredient)
      } else {
        return hasIngredient
      }
    })
  }

}

module.exports = User;
