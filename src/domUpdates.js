const domUpdates = {
  main: document.querySelector("main"),
  tagList: document.querySelector(".tag-list"),
  fullRecipeInfo: document.querySelector(".recipe-instructions"),
  costBtn: document.querySelector(".calculate-cost"),
  checkPantryBtn: document.querySelector(".check-pantry"),
  user: null,
  recipeData: null,
  ingredientsData: null,
  menuOpen: false,


  defineData(recipeData, ingredientsData) {
    this.recipeData = recipeData
    this.ingredientsData = ingredientsData
  },

  defineUser(user) {
    this.user = user
  },

  getWelcomeMessage(firstName) {
    let welcomeMsg = `
      <div class="welcome-msg">
        <h1>Welcome ${firstName}!</h1>
      </div>`;
    document.querySelector(".banner-image").insertAdjacentHTML("afterbegin",
      welcomeMsg);
  },

  addRecipesToDom(recipeInfo, shortRecipeName) {
    let cardHtml = `
      <div class="recipe-card" id=${recipeInfo.id}>
        <h3 maxlength="40">${shortRecipeName}</h3>
        <div class="card-photo-container">
          <img src=${recipeInfo.image} class="card-photo-preview" alt="${recipeInfo.name} recipe" title="${recipeInfo.name} recipe">
          <div class="text">
            <div>Click for Instructions</div>
          </div>
        </div>
        <h4>${recipeInfo.tags[0]}</h4>
        <img src="../images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
      </div>`
    this.main.insertAdjacentHTML("beforeend", cardHtml);
  },

   listTags(allTags) {
    allTags.forEach(tag => {
      let tagHtml = `<li><input type="checkbox" class="checked-tag" id="${tag}">
        <label for="${tag}">${this.capitalize(tag)}</label></li>`;
      this.tagList.insertAdjacentHTML("beforeend", tagHtml);
    });
  },

   capitalize(words) {
    return words.split(" ").map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  },

   showAllRecipes(passedRecipes) {
     let recipes = passedRecipes || this.recipeData
    recipes.forEach(recipe => {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = "block";
    });
    this.showWelcomeBanner();
    this.user.viewingFavorites = false;
  },

    showWelcomeBanner() {
    document.querySelector(".welcome-msg").style.display = "flex";
    document.querySelector(".my-recipes-banner").style.display = "none";
  },

   hideUnselectedRecipes(foundRecipes) {
    foundRecipes.forEach(recipe => {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = "none";
    });
  },

  fillAppleIcon(event) {
    if (event.target.className === "card-apple-icon") {
      let cardId = parseInt(event.target.closest(".recipe-card").id)
        event.target.src = "../images/apple-logo.png";
      }
    },

    emptyAppleIcon(event) {
      if (event.target.className === "card-apple-icon") {
        let cardId = parseInt(event.target.closest(".recipe-card").id)
          event.target.src = "../images/apple-logo-outline.png";
    }
  },

   exitRecipe() {
    while (this.fullRecipeInfo.firstChild &&
      this.fullRecipeInfo.removeChild(this.fullRecipeInfo.firstChild));
    this.fullRecipeInfo.style.display = "none";
    document.getElementById("overlay").remove();
  },

   openRecipeInfo(event) {
    this.fullRecipeInfo.style.display = "inline";
    let recipeId = event.path.find(e => e.id).id;
    let recipe = this.recipeData.find(recipe => recipe.id === Number(recipeId));
    this.generateRecipeTitle(recipe, this.generateIngredients(recipe));
    this.addRecipeImage(recipe);
    this.generateInstructions(recipe);
    this.generateRecipeBtns(recipe);
    this.fullRecipeInfo.insertAdjacentHTML("beforebegin", "<div id='overlay'></div>");
  },

   generateRecipeTitle(recipe, ingredients) {
    let recipeTitle = `
      <button id="exit-recipe-btn">X</button>
      <h3 id="recipe-title">${recipe.name}</h3>
      <h4>Ingredients</h4>
      <p>${ingredients}</p>`
    this.fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
  },

   addRecipeImage(recipe) {
    document.getElementById("recipe-title").style.backgroundImage = `url(${recipe.image})`;
  },

    generateInstructions(recipe) {
      let instructionsList = "";
      let instructions = recipe.instructions.map(i => {
      return i.instruction
    });
    instructions.forEach(i => {
      instructionsList += `<li>${i}</li>`
    });
    this.fullRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
    this.fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol class="instructions">${instructionsList}</ol>`);
  },

  generateRecipeBtns(recipe) {
    let recipeButtons = `
    <button class="cook-recipe" id="${recipe.id}">Cook This Recipe</button>
    <button class="calculate-cost" id="${recipe.id}">Cost to Cook</button>
    <button class="check-pantry" id="${recipe.id}">Check Pantry</button>
    `;
    this.fullRecipeInfo.insertAdjacentHTML("beforeend", recipeButtons);
  },

  displayRecipeCost(costOfRecipe) {
    let cookBtn = document.querySelector(".cook-recipe");
    if (event.target.className === "calculate-cost" && costOfRecipe !== undefined) {
      cookBtn.insertAdjacentHTML("beforebegin", `<p class="instructions">$${costOfRecipe}</p>`);
    }
  },

  displayNeededIngredients(neededIngredients, userChecked, recipe) {
    let cookBtn = document.querySelector(".cook-recipe");
    neededIngredients.forEach(neededIngredient => {
    let thing = userChecked[neededIngredients.indexOf(neededIngredient)].quantity.amount
      cookBtn.insertAdjacentHTML("beforebegin", `<p class="needed-ingredients">${neededIngredient.name}: ${thing}</p>`);
    })
    this.fullRecipeInfo.insertAdjacentHTML("beforeend", `<button class="add-ingredients-btn" id=" ${recipe.id}">Add to Pantry</button>`);
  },

   generateIngredients(recipe) {
    return recipe && recipe.ingredients.map(i => {
      let ingredientName = this.getIngredientName(i)
      return `${this.capitalize(ingredientName.name)} (${i.quantity.amount} ${i.quantity.unit})`
    }).join(", ");
  },

  getIngredientName(recipeIngredient) {
    return this.ingredientsData.find(ingredient => ingredient.id === recipeIngredient.id)
  },

  capitalize(words) {
    return words.split(" ").map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  },

   showMyRecipesBanner() {
    document.querySelector(".welcome-msg").style.display = "none";
    document.querySelector(".my-recipes-banner").style.display = "block";
  },

   toggleMenu() {
    var menuDropdown = document.querySelector(".drop-menu");
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      menuDropdown.style.display = "block";
    } else {
      menuDropdown.style.display = "none";
    }
  },

  hideRecipes(recipe) {
    let domRecipe = document.getElementById(`${recipe.id}`);
    domRecipe.style.display = "none";
  },

  updatePantryInfo(pantry, amountsPantry) {
    let pantryList = document.querySelector(".pantry-list")
    pantry.forEach(ingredient => pantryList.innerHTML = '')
    pantry.forEach(ingredient => {
      let amountOfIngredient = amountsPantry.find(userIngredient => userIngredient.ingredient === ingredient.id)
      let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
        <label for="${ingredient.name}">${ingredient.name}, ${amountOfIngredient.amount}</label></li>`;
        pantryList.insertAdjacentHTML("beforeend",ingredientHtml);
    });
  },

  cookMessage() {
    console.log('boo');
  }

}
module.exports = domUpdates
