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
      <button class="recipe-card" id=${recipeInfo.id}>
        <h3 maxlength="40">${shortRecipeName}</h3>
        <article class="card-photo-container">
          <img src=${recipeInfo.image} class="card-photo-preview" alt="${recipeInfo.name} recipe" title="${recipeInfo.name} recipe" aria-role="button">
          <article class="text">
            <article>Click for Instructions</article>
          </article>
        </article>
        <h4>${recipeInfo.tags[0]}</h4>
        <img src="../images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon" aria-role="button">
      </button>`
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
    <button class="cook-recipe" disabled id="${recipe.id}">Cook This Recipe</button>
    <button class="calculate-cost" id="${recipe.id}">Cost to Cook</button>
    <button class="check-pantry" id="${recipe.id}">Check Pantry</button>
    `;
    fullRecipeInfo.insertAdjacentHTML("beforeend", recipeButtons);
  },

  displayRecipeCost(costOfRecipe) {
    let cookBtn = document.querySelector(".cook-recipe");
    if (event.target.className === "calculate-cost" && costOfRecipe !== undefined) {
      cookBtn.insertAdjacentHTML("beforebegin", `<p class="instructions">$${costOfRecipe}</p>`);
    }
  },

  displayNeededIngredients(neededIngredients, userChecked, recipe) {
    let fullRecipeInfo = document.querySelector(".recipe-instructions");
    let cookBtn = document.querySelector(".cook-recipe");
    neededIngredients.forEach(neededIngredient => {
    let thing = userChecked[neededIngredients.indexOf(neededIngredient)].quantity.amount
      cookBtn.insertAdjacentHTML("beforebegin", `<p class="needed-ingredients">${neededIngredient.name}: ${thing}</p>`);
    })
    fullRecipeInfo.insertAdjacentHTML("beforeend", `<button class="add-ingredients-btn" id=" ${recipe.id}">Add to Pantry</button>`);
  },

  disableButton(eventValue) {
    if(eventValue === 'add-ingredients-btn') {
      let cookRecipe = document.querySelector('.cook-recipe');
      cookRecipe.removeAttribute('disabled')
      cookRecipe.style.backgroundColor = '#3c6666'
    }
    let buttonToDisable = document.querySelector(`.${eventValue}`);
    buttonToDisable.style.backgroundColor = '#84C8A4'
    buttonToDisable.setAttribute('disabled', 'disabled')
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
    },

  displaySearchedFavorite(favorite) {
    this.recipeData.forEach(recipe => {
      if (recipe.id !== favorite.id){
        this.hideRecipes(recipe)
      } 
    })
  },

  displaySearchedByIngredient(favorites) {
    let nonFilteredRecipes = this.recipeData.reduce((acc, recipeData) => {
     if (!favorites.includes(recipeData)) {
       acc.push(recipeData)
     }
    return acc
    }, [])
    nonFilteredRecipes.forEach(recipe => this.hideRecipes(recipe))
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

//gotta 
  cookMessage() {
    console.log('boo');
  }
}


module.exports = domUpdates
