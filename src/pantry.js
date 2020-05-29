class Pantry {
  constructor(pantryData) {
    this.ingredients = pantryData;

  }

  checkIngredientAmount(recipeIngredients) {
    // console.log('passed', recipeIngredients);
    const notEnoughIngredients = this.ingredients.reduce((acc, pantryIngredient) => {
      const recipeIngredientToCompare = recipeIngredients.find(recipeIngredient => pantryIngredient.ingredient === recipeIngredient.id)
      if (recipeIngredientToCompare) {
      if (recipeIngredientToCompare.quantity.amount > pantryIngredient.amount) {
        recipeIngredientToCompare.quantity.amount = recipeIngredientToCompare.quantity.amount - pantryIngredient.amount
        acc.push(recipeIngredientToCompare);
      }
    }
      return acc
    },[])
    return notEnoughIngredients.length > 0 ? notEnoughIngredients : true
  }
  checkPantryForIngredients(recipeIngredients) {
    const ingredientsNeeded = recipeIngredients.reduce((acc, recipeIngredient) => {
      const missingIngredients = this.ingredients.find(pantryIngredient  => pantryIngredient.ingredient === recipeIngredient.id)
        if (!missingIngredients) {
          acc.push(recipeIngredient)
        }
      return acc
    }, [])
    console.log('needed', ingredientsNeeded);
    if (ingredientsNeeded !== true) {
      return ingredientsNeeded
    }
  }
}

module.exports = Pantry;
