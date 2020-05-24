class Pantry {
  constructor(pantryData) {
    this.ingredients = pantryData;

  }

  checkPantryIngredients(recipeIngredient) {
    const ingredientAvailable = this.ingredients.find(ingredient => ingredient.ingredient === recipeIngredient.id)
   return ingredientAvailable ? true : recipeIngredient
  }

  // 
  checkIngredientAmount(recipeIngredient) {
    let pantryIngredient = this.ingredients.find(ingredient => ingredient.ingredient === recipeIngredient.id )
    let missingIngredients = {}
    if (pantryIngredient === undefined) {
      missingIngredients[`${recipeIngredient.name}`] = 
      recipeIngredient.quantity.amount
      return recipeIngredient 
    } else if (pantryIngredient.amount < recipeIngredient.quantity.amount) {
      missingIngredients[`${recipeIngredient.name}`] = Math.abs(recipeIngredient.quantity.amount - pantryIngredient.amount)
      return missingIngredients
   }
  }
}











module.exports = Pantry;