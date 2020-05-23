class Pantry {
  constructor(pantryData) {
    this.ingredients = pantryData;

  }

  checkPantryIngredients(recipeIngredient) {
    this.ingredients.find(ingredient => ingredient.id === recipeIngredient.id)
  }

  checkIngredientAmount(pantryIngredient, recipeIngredient) {
    if (pantryIngredient.amount >= recipeIngredient.amount) {

    } 
  }
}











module.exports = Pantry;