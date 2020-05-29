import $ from 'jquery';

import UserRepository from '../src/userRepository';
import IngredientsRepository from '../src/ingredientsRepository';
import RecipesRepository from '../src/recipesRepository';
import domUpdates from '../src/domUpdates';
import './css/base.scss';
import './css/styles.scss';

import User from './user';
import Recipe from './recipe';
import ingredientsData from './data/ingredient-data';
import Pantry from '../src/pantry'
import './images/apple-logo-outline.png'
import './images/apple-logo.png'
import './images/cookbook.png'
import './images/seasoning.png'



let allRecipesBtn = document.querySelector(".show-all-btn");
let filterBtn = document.querySelector(".filter-btn");
let fullRecipeInfo = document.querySelector(".recipe-instructions");
let main = document.querySelector("main");
let pantryBtn = document.querySelector(".my-pantry-btn");
let savedRecipesBtn = document.querySelector(".saved-recipes-btn");
let showPantryRecipes = document.querySelector(".show-pantry-recipes-btn");
let tagList = document.querySelector(".tag-list");
let recipes = [];
let ingredientsRepository;
let user;


allRecipesBtn.addEventListener("click", function() {
  domUpdates.showAllRecipes(recipes)
});
filterBtn.addEventListener("click", function() {
  findCheckedBoxes(recipes)
});
main.addEventListener("click", function() {
  addToMyRecipes();
  domUpdates.displayRecipeCost();
  getRecipeCost();
});
pantryBtn.addEventListener("click", domUpdates.toggleMenu);
savedRecipesBtn.addEventListener("click", showSavedRecipes);
showPantryRecipes.addEventListener("click", function() {
  findCheckedPantryBoxes(ingredientsRepository);
});

Promise.all([
fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData').then(response => response.json()),
fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/ingredients/ingredientsData').then(response => response.json()),
fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/recipes/recipeData').then(response => response.json())
])
.then(data => createDataSets(data[0].wcUsersData, data[1].ingredientsData, data[2].recipeData))
.catch(err => console.error(err))


const createDataSets = (wcUsersData, ingredientsData, recipeData) => {
  createUserRepo(wcUsersData)
  createIngredientsRepo(ingredientsData)
  createRecipesRepo(recipeData)
  domUpdates.defineData(recipeData, ingredientsData)
}

function createUserRepo(wcUsersData) {
  let randomNum = Math.floor(Math.random() * wcUsersData.length)
  let userRepository = new UserRepository(wcUsersData)
  generateUser(userRepository.userData[randomNum])
}

function createIngredientsRepo(ingredientsData) {
  ingredientsRepository = new IngredientsRepository(ingredientsData)
  findPantryInfo(ingredientsRepository)
  return ingredientsData
}

function createRecipesRepo(recipeData) {
  let recipesRepository = new RecipesRepository(recipeData)
  createCards(recipesRepository.recipeData)
  findTags(recipesRepository.recipeData)
  return recipeData
}

// GENERATE A USER ON LOAD
function generateUser(userInfo) {
  const pantry = new Pantry(userInfo.pantry)
  user = new User(userInfo, pantry);
  const firstName = user.name.split(" ")[0];
  domUpdates.getWelcomeMessage(firstName)
  domUpdates.defineUser(user)
}


// const updateUserPantry = (user) => {
//   const user.
//   // updateUserInfo()
//   }
//
//
// const updateUserInfo = (userID, updatedIngredient) => {
//   fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData', {
//     method: 'POST',
//     headers: {
//       'Content-Type' : 'application/JSON'
//     },
//     body: JSON.stringify({
//       "userId": userID,
//       "ingredientID": 123,
//       "ingredientModification": 3
//     })
//   })
// }

// CREATE RECIPE CARDS
function createCards(recipeData) {
  recipeData.forEach(recipe => {
    let recipeInfo = new Recipe(recipe);
    let shortRecipeName = recipeInfo.name;
    recipes.push(recipeInfo);
    if (recipeInfo.name.length > 40) {
      shortRecipeName = recipeInfo.name.substring(0, 40) + "...";
    }
    domUpdates.addRecipesToDom(recipeInfo, shortRecipeName)
  });
}

// FILTER BY RECIPE TAGS
function findTags(recipeData) {
  let tags = [];
  recipeData.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  tags.sort();
  domUpdates.listTags(tags);
}

function findCheckedBoxes() {
  let tagCheckboxes = document.querySelectorAll(".checked-tag");
  let checkboxInfo = Array.from(tagCheckboxes)
  let selectedTags = checkboxInfo.filter(box => {
    return box.checked;
  })
  findTaggedRecipes(selectedTags);
}

//Do we need to use the method in the user?
//Figure out how to filter only favorites by type when on favorites section
function findTaggedRecipes(selected, recipeList) {
  recipeList = user.viewingFavorites ? user.favoriteRecipes : recipes;
  let filteredResults = [];
  selected.forEach(tag => {
    console.log(recipeList);
    
    let allRecipes = recipes.filter(recipe => {
      return recipe.tags.includes(tag.id);
    });
    allRecipes.forEach(recipe => {
      if (!filteredResults.includes(recipe)) {
        filteredResults.push(recipe);
      }
    })
  });
  domUpdates.showAllRecipes(filteredResults);
  if (filteredResults.length > 0) {
    filterRecipes(filteredResults);
  }
}

function filterRecipes(filtered) {
  let foundRecipes = recipes.filter(recipe => {
    return !filtered.includes(recipe);
  });
  domUpdates.hideUnselectedRecipes(foundRecipes)
}

function addToMyRecipes() {
 if (event.target.className === "card-apple-icon") {
   let cardId = parseInt(event.target.closest(".recipe-card").id)
   if (!user.favoriteRecipes.includes(cardId)) {
     user.saveRecipe(cardId);
     domUpdates.fillAppleIcon(event)
   } else {
     user.removeRecipe(cardId);
     domUpdates.emptyAppleIcon(event)
   }
 } else if (event.target.id === "exit-recipe-btn") {
   domUpdates.exitRecipe();
 } else if (isDescendant(event.target.closest(".recipe-card"), event.target)) {
   domUpdates.openRecipeInfo(event);
 }
}


function isDescendant(parent, child) {
  let node = child;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function showSavedRecipes() {
  let unsavedRecipes = recipes.filter(recipe => {
    return !user.favoriteRecipes.includes(recipe.id);
  });
  unsavedRecipes.forEach(recipe => {
    let domRecipe = document.getElementById(`${recipe.id}`);
    domRecipe.style.display = "none";
  });
  domUpdates.showMyRecipesBanner();
  user.viewingFavorites = true;
}










// // TOGGLE DISPLAYS




// function filterNonSearched(filtered) {
//   let found = recipes.filter(recipe => {
//     let ids = filtered.map(f => f.id);
//     return !ids.includes(recipe.id)
//   })
//   hideUnselectedRecipes(found);
// }






// CREATE AND USE PANTRY
function findPantryInfo(ingredientsRepository) {
  const fullPantryIngredients = []
  const pantryIngredients = user.pantry.ingredients

  pantryIngredients.forEach(pantryIngredient => {
    fullPantryIngredients.push(ingredientsRepository.getIngredientName(pantryIngredient, 'ingredient'))
  })
  displayPantryInfo(fullPantryIngredients.sort((a, b) => a.name.localeCompare(b.name)), pantryIngredients);
}

function displayPantryInfo(pantry, amountsPantry) {
  pantry.forEach(ingredient => {
    let amountOfIngredient = amountsPantry.find(userIngredient => userIngredient.ingredient === ingredient.id)
    let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
      <label for="${ingredient.name}">${ingredient.name}, ${amountOfIngredient.amount}</label></li>`;
    document.querySelector(".pantry-list").insertAdjacentHTML("beforeend",
      ingredientHtml);
  });
}

function findCheckedPantryBoxes(ingredientsRepository) {
  let pantryCheckboxes = document.querySelectorAll(".pantry-checkbox");
  let pantryCheckboxInfo = Array.from(pantryCheckboxes)
  let selectedIngredients = pantryCheckboxInfo.filter(box => {
    return box.checked;
  })
  domUpdates.showAllRecipes();
  if (selectedIngredients.length > 0) {
    findRecipesWithCheckedIngredients(selectedIngredients, ingredientsRepository);
  }
}

function findRecipesWithCheckedIngredients(selected, ingredientsRepository) {
  let recipeChecker = (arr, target) => target.every(v => arr.includes(v));
  let ingredientNames = selected.map(item => {
    return item.id;
  })
  recipes.forEach(recipe => {
    let allRecipeIngredients = [];    
    recipe.ingredients.forEach(ingredient => {  
      let ingredientName = ingredientsRepository.getIngredientName(ingredient, 'id');      
      allRecipeIngredients.push(ingredientName.name);
    });
    if (!recipeChecker(allRecipeIngredients, ingredientNames)) {
     domUpdates.hideRecipes(recipe);
    }
  })
}

function getRecipeCost() {
  let recipeId = event.path.find(e => e.id).id;
  let recipe = recipes.find(recipe => recipe.id === Number(recipeId));
  let userChecked = user.checkUserPantryForIngredients(recipe);
  // let checkedPantry = user.pantry.checkPantryForIngredients(recipe.ingredients);
  // let checkedAmount = user.pantry.checkIngredientAmount(recipe.ingredients);
  console.log(userChecked);
    
}
