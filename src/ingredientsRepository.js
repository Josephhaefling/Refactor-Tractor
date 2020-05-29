class IngredientsRepository {
  constructor(ingredientsData) {
    this.ingredientsData = ingredientsData
  }
  //needs test
  getIngredientName(ingredient, key) {

    return this.ingredientsData.find(fullIngredient => fullIngredient.id === ingredient[key])
  }

  getIngredientsCost(ingredientsList) {
    console.log('list', ingredientsList);
    return ingredientsList.reduce((acc, ingredient) => {
      // if(ingredient === 'true') {
      const matchedIngredient = this.ingredientsData.find(ingredientData => ingredientData.id === ingredient.id)
      acc += matchedIngredient.estimatedCostInCents * ingredient.quantity.amount
    // }
      return acc
    }, 0)
  }
}

module.exports = IngredientsRepository;
