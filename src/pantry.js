class Pantry {
  constructor(pantryData) {
    this.ingredients = pantryData;

  }

  checkIngredientAmount(recipeIngredients) {
    const notEnoughIngredients = this.ingredients.reduce((acc, pantryIngredient) => {
      const newIngredient = {}
      const recipeIngredientToCompare = recipeIngredients.find(recipeIngredient => pantryIngredient.ingredient === recipeIngredient.id)
      if (recipeIngredientToCompare.quantity.amount > pantryIngredient.amount) {
        newIngredient[recipeIngredientToCompare.id] = {name: recipeIngredientToCompare.name, amount: recipeIngredientToCompare.quantity.amount - pantryIngredient.amount}
        acc.push(newIngredient);
      }
      return acc
    },[])
    return notEnoughIngredients.length > 0 ? notEnoughIngredients : true
  }


  checkPantryForIngredients(recipeIngredients) {
    const ingredientsNeeded = recipeIngredients.reduce((acc, recipeIngredient) => {
      const newIngredient = {}
      const missingIngredients = this.ingredients.find(pantryIngredient  => pantryIngredient.ingredient === recipeIngredient.id)
        if (!missingIngredients) {
          newIngredient[recipeIngredient.id] = {name: recipeIngredient.name, amount: recipeIngredient.quantity.amount}
          acc.push(newIngredient)
        }
      return acc
    }, [])
    return ingredientsNeeded.length > 0 ? ingredientsNeeded : true
  }
}











module.exports = Pantry;