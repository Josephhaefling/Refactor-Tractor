class IngredientsRepository {
  constructor(ingredientsData) {
    this.ingredientsData = ingredientsData
  }

  getIngredientsCost(ingredientsList) {
    return ingredientsList.reduce((acc, ingredient) => {
      const matchedIngredient = this.ingredientsData.find(ingredientData => ingredientData.id === ingredient.id)
      acc += matchedIngredient.estimatedCostInCents * ingredient.quantity.amount
      return acc
    }, 0)
  }
}

module.exports = IngredientsRepository;
