const domUpdates = {
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
      <section class="welcome-msg">
        <h1>Welcome ${firstName}!</h1>
      </section>`;
    document.querySelector(".banner-image").insertAdjacentHTML("afterbegin",
      welcomeMsg);
  },

  addRecipesToDom(recipeInfo, shortRecipeName) {
    let main = document.querySelector("main")
    let cardHtml = `
      <article class="recipe-card" id=${recipeInfo.id}>
        <h3 maxlength="40">${shortRecipeName}</h3>
        <article class="card-photo-container">
          <img src=${recipeInfo.image} class="card-photo-preview" alt="${recipeInfo.name} recipe" title="${recipeInfo.name} recipe">
          <article class="text">
            <article>Click for Instructions</article>
          </article>
        </article>
        <h4>${recipeInfo.tags[0]}</h4>
        <img src="../images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
      </article>`
    main.insertAdjacentHTML("beforeend", cardHtml);
  },

   listTags(allTags) {
     let tagList = document.querySelector('.tag-list')
     allTags.forEach(tag => {
      let tagHtml = `<li><input type="checkbox" class="checked-tag" id="${tag}">
        <label for="${tag}">${this.capitalize(tag)}</label></li>`;
      tagList.insertAdjacentHTML("beforeend", tagHtml);
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
    let fullRecipeInfo = document.querySelector(".recipe-instructions");
    while (fullRecipeInfo.firstChild &&
      fullRecipeInfo.removeChild(fullRecipeInfo.firstChild));
    fullRecipeInfo.style.display = "none";
    document.getElementById("overlay").remove();
  },

   openRecipeInfo(event) {
    let fullRecipeInfo = document.querySelector(".recipe-instructions");
    fullRecipeInfo.style.display = "inline";
    let recipeId = event.path.find(e => e.id).id;
    let recipe = this.recipeData.find(recipe => recipe.id === Number(recipeId));
    this.generateRecipeTitle(recipe, this.generateIngredients(recipe));
    this.addRecipeImage(recipe);
    this.generateInstructions(recipe);
    this.generateRecipeBtns(recipe);
    fullRecipeInfo.insertAdjacentHTML("beforebegin", "<section id='overlay'></section>");
  },

   generateRecipeTitle(recipe, ingredients) {
    let fullRecipeInfo = document.querySelector(".recipe-instructions");
    let recipeTitle = `
      <button id="exit-recipe-btn">X</button>
      <h3 id="recipe-title">${recipe.name}</h3>
      <h4>Ingredients</h4>
      <p>${ingredients}</p>`
    fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
  },

   addRecipeImage(recipe) {
    document.getElementById("recipe-title").style.backgroundImage = `url(${recipe.image})`;
  },

    generateInstructions(recipe) {
      let fullRecipeInfo = document.querySelector(".recipe-instructions");
      let instructionsList = "";
      let instructions = recipe.instructions.map(i => {
      return i.instruction
    });
    instructions.forEach(i => {
      instructionsList += `<li>${i}</li>`
    });
    fullRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
    fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol class="instructions">${instructionsList}</ol>`);
  },

  generateRecipeBtns(recipe) {
    let fullRecipeInfo = document.querySelector(".recipe-instructions");
    let recipeButtons = `
    <button class="cook-recipe">Cook This Recipe</button>
    <button class="calculate-cost" id="${recipe.id}">Cost to Cook</button>
    <button class="check-pantry">Check Pantry</button>
    `;
    fullRecipeInfo.insertAdjacentHTML("beforeend", recipeButtons);
  },

  displayRecipeCost() {
    if (event.target.className === "calculate-cost") {
     
    }
    
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
    menuDropdown.style.display = this.menuOpen ? 'block': 'none';
    // let ariaExpanded = menuDropdown.getAttribute('aria-expanded')
    // console.log('ariaExpanded', ariaExpanded)
    // ariaExpanded = ariaExpanded === false ? true : false
    //   // ariaExpanded = true;
    //   console.log('ariaExpanded2', ariaExpanded)
    },
   
  displaySearchedFavorite(favorite) {
    this.recipeData.forEach(recipe => {
      if (recipe !== favorite){
        this.hideRecipes(recipe)
      }
    })
    // this.showAllRecipes(favorite)
  },

  hideRecipes(recipe) {
    let domRecipe = document.getElementById(`${recipe.id}`);
    domRecipe.style.display = "none";
  }

}


module.exports = domUpdates


// let button = document.getElementById("menu-button");

// button.addEventListener("click", function() {
//   let attr = button.getAttribute("aria-expanded");
  
//   if (attr === 'true') {
//      button.setAttribute("aria-expanded", false);
//   } else {
//      button.setAttribute("aria-expanded", true);
//   }
// });