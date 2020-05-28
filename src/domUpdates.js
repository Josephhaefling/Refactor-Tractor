const domUpdates = {
  main: document.querySelector("main"),
  tagList: document.querySelector(".tag-list"),
  fullRecipeInfo: document.querySelector(".recipe-instructions"),
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
    this.fullRecipeInfo.insertAdjacentHTML("beforebegin", "<section id='overlay'></div>");
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
    this.fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol>${instructionsList}</ol>`);
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
  }

}
module.exports = domUpdates
