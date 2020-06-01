class Pantry {
  constructor(pantryData) {
    this.ingredients = pantryData;

  }

  checkIngredientAmount(recipeIngredients) {
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
    return notEnoughIngredients.length > 0 ? notEnoughIngredients : false
  }

  checkPantryForIngredients(recipeIngredient) {
    const foundIngredient = this.ingredients.find(pantryIngredient => pantryIngredient.ingredient === recipeIngredient.id)
    return foundIngredient ? false : recipeIngredient
  }


  addItem(itemToAdd) {
    const foundItem = this.ingredients.find(ingredient => ingredient.ingredient === itemToAdd.id)
    if (foundItem) {
    const itemIndex = this.ingredients.indexOf(foundItem)
    this.ingredients[itemIndex].amount += itemToAdd.quantity.amount
  } else {
    this.ingredients.push({ingredient: parseInt(`${itemToAdd.id}`), amount: parseFloat(`${itemToAdd.quantity.amount}`)})
  }
    return this.ingredients
  }

  removeItem(itemToRemove) {
    const foundItem = this.ingredients.find(ingredient => ingredient.ingredient === itemToRemove.id)
    const itemIndex = this.ingredients.indexOf(foundItem)
    this.ingredients[itemIndex].amount -= itemToRemove.quantity.amount
    return this.ingredients
  }
}

module.exports = Pantry;
