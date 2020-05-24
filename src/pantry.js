class Pantry {
  constructor(pantryData) {
    this.ingredients = pantryData;

  }

  checkPantryIngredients(recipeIngredient) {
    const ingredientAvailable = this.ingredients.find(ingredient => ingredient.ingredient === recipeIngredient.id)
   return ingredientAvailable ? true : recipeIngredient
  }

  checkIngredientAmount(pantryIngredient, recipeIngredient) {
   return pantryIngredient.amount >= recipeIngredient.quantity.amount ? true : recipeIngredient
  }
}











module.exports = Pantry;