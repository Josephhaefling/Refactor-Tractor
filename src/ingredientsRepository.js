class IngredientsRepository {
  constructor(ingredientsData) {
    this.ingredientsData = ingredientsData
  }
  getIngredientName(ingredient, key) {
    return this.ingredientsData.find(fullIngredient => {
      return fullIngredient.id === ingredient[key]
    })
  }

  getIngredientsCost(ingredientsList) {
    return ingredientsList.reduce((acc, ingredient) => {
      const matchedIngredient = this.ingredientsData.find(ingredientData => {
        return ingredientData.id === ingredient.id
      })
      acc += matchedIngredient.estimatedCostInCents * ingredient.quantity.amount
      return acc
    }, 0)
  }
}

module.exports = IngredientsRepository;
