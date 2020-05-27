const domUpdates = {
  main: document.querySelector("main"),
  tagList: document.querySelector(".tag-list"),
  fullRecipeInfo: document.querySelector(".recipe-instructions"),



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

   showAllRecipes(recipes) {
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
     console.log(recipesRepository);
    this.fullRecipeInfo.style.display = "inline";
    let recipeId = event.path.find(e => e.id).id;
    let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
    generateRecipeTitle(recipe, generateIngredients(recipe));
    addRecipeImage(recipe);
    generateInstructions(recipe);
    this.fullRecipeInfo.insertAdjacentHTML("beforebegin", "<section id='overlay'></div>");
  }



}
module.exports = domUpdates
