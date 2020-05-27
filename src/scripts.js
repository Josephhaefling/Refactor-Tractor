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


let allRecipesBtn = document.querySelector(".show-all-btn");
let filterBtn = document.querySelector(".filter-btn");
let fullRecipeInfo = document.querySelector(".recipe-instructions");
let main = document.querySelector("main");
let menuOpen = false;
let pantryBtn = document.querySelector(".my-pantry-btn");
// let pantryInfo = [];
let recipes = [];
let savedRecipesBtn = document.querySelector(".saved-recipes-btn");
let showPantryRecipes = document.querySelector(".show-pantry-recipes-btn");
let tagList = document.querySelector(".tag-list");
let user;


// window.addEventListener("load", generateUser);
allRecipesBtn.addEventListener("click", domUpdates.showAllRecipes);
filterBtn.addEventListener("click", findCheckedBoxes);
main.addEventListener("click", addToMyRecipes)
// pantryBtn.addEventListener("click", toggleMenu);
// savedRecipesBtn.addEventListener("click", showSavedRecipes);
// showPantryRecipes.addEventListener("click", findCheckedPantryBoxes);

fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData')
.then(response => response.json())
.then(data => createUserRepo(data.wcUsersData))
.catch(err => console.error(err.message))

fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/ingredients/ingredientsData')
.then(response => response.json())
.then(data => createIngredientsRepo(data.ingredientsData))
.catch(err => console.error(err.message))

fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/recipes/recipeData')
.then(response => response.json())
.then(data => createRecipesRepo(data.recipeData))
.catch(err => console.error(err.message))

// const getUser = (user) => {
//   console.log(user);
//   main.addEventListener("click", domUpdates.addToMyRecipes)
// }


function createUserRepo(wcUsersData) {
  console.log('userRepo');
  let randomNum = Math.floor(Math.random() * wcUsersData.length)
  let userRepository = new UserRepository(wcUsersData)
  generateUser(userRepository.userData[randomNum])
}

function createIngredientsRepo(ingredientsData) {
  console.log('ingredientsRepo');
  let ingredientsRepository = new IngredientsRepository(ingredientsData)
  return ingredientsData
}

function createRecipesRepo(recipeData) {
  console.log(user);
  console.log('createRecipesRepo');
  let recipesRepository = new RecipesRepository(recipeData)
  createCards(recipesRepository.recipeData)
  findTags(recipesRepository.recipeData)
  return recipeData
}

// GENERATE A USER ON LOAD
function generateUser(userInfo) {
  console.log('genUser');
  const pantry = new Pantry(userInfo.pantry)
  user = new User(userInfo, pantry);
  const firstName = user.name.split(" ")[0];
  domUpdates.getWelcomeMessage(firstName)
  // getUser(user)
  // domUpdates.user(user)
  // updateUserPantry(user)
  // findPantryInfo();
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

function findTaggedRecipes(selected) {
  let filteredResults = [];
  selected.forEach(tag => {
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



// // FAVORITE RECIPE FUNCTIONALITY





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

// function showSavedRecipes() {
//   let unsavedRecipes = recipes.filter(recipe => {
//     return !user.favoriteRecipes.includes(recipe.id);
//   });
//   unsavedRecipes.forEach(recipe => {
//     let domRecipe = document.getElementById(`${recipe.id}`);
//     domRecipe.style.display = "none";
//   });
//   showMyRecipesBanner();
// }

// // CREATE RECIPE INSTRUCTIONS

// function generateRecipeTitle(recipe, ingredients) {
//   let recipeTitle = `
//     <button id="exit-recipe-btn">X</button>
//     <h3 id="recipe-title">${recipe.name}</h3>
//     <h4>Ingredients</h4>
//     <p>${ingredients}</p>`
//   fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
// }

// function addRecipeImage(recipe) {
//   document.getElementById("recipe-title").style.backgroundImage = `url(${recipe.image})`;
// }

// function generateIngredients(recipe) {
//   return recipe && recipe.ingredients.map(i => {
//     return `${capitalize(i.name)} (${i.quantity.amount} ${i.quantity.unit})`
//   }).join(", ");
// }

// function generateInstructions(recipe) {
//   let instructionsList = "";
//   let instructions = recipe.instructions.map(i => {
//     return i.instruction
//   });
//   instructions.forEach(i => {
//     instructionsList += `<li>${i}</li>`
//   });
//   fullRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
//   fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol>${instructionsList}</ol>`);
// }


// // TOGGLE DISPLAYS
// function showMyRecipesBanner() {
//   document.querySelector(".welcome-msg").style.display = "none";
//   document.querySelector(".my-recipes-banner").style.display = "block";
// }



// function filterNonSearched(filtered) {
//   let found = recipes.filter(recipe => {
//     let ids = filtered.map(f => f.id);
//     return !ids.includes(recipe.id)
//   })
//   hideUnselectedRecipes(found);
// }

// function createRecipeObject(recipes) {
//   recipes = recipes.map(recipe => new Recipe(recipe));
//   return recipes
// }

// function toggleMenu() {
//   var menuDropdown = document.querySelector(".drop-menu");
//   menuOpen = !menuOpen;
//   if (menuOpen) {
//     menuDropdown.style.display = "block";
//   } else {
//     menuDropdown.style.display = "none";
//   }
// }



// // CREATE AND USE PANTRY
// function findPantryInfo() {
//   user.pantry.forEach(item => {
//     let itemInfo = ingredientsData.find(ingredient => {
//       return ingredient.id === item.ingredient;
//     });
//     let originalIngredient = pantryInfo.find(ingredient => {
//       if (itemInfo) {
//         return ingredient.name === itemInfo.name;
//       }
//     });
//     if (itemInfo && originalIngredient) {
//       originalIngredient.count += item.amount;
//     } else if (itemInfo) {
//       pantryInfo.push({name: itemInfo.name, count: item.amount});
//     }
//   });
//   displayPantryInfo(pantryInfo.sort((a, b) => a.name.localeCompare(b.name)));
// }

// function displayPantryInfo(pantry) {
//   pantry.forEach(ingredient => {
//     let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
//       <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
//     document.querySelector(".pantry-list").insertAdjacentHTML("beforeend",
//       ingredientHtml);
//   });
// }

// function findCheckedPantryBoxes() {
//   let pantryCheckboxes = document.querySelectorAll(".pantry-checkbox");
//   let pantryCheckboxInfo = Array.from(pantryCheckboxes)
//   let selectedIngredients = pantryCheckboxInfo.filter(box => {
//     return box.checked;
//   })
//   showAllRecipes();
//   if (selectedIngredients.length > 0) {
//     findRecipesWithCheckedIngredients(selectedIngredients);
//   }
// }

// function findRecipesWithCheckedIngredients(selected) {
//   let recipeChecker = (arr, target) => target.every(v => arr.includes(v));
//   let ingredientNames = selected.map(item => {
//     return item.id;
//   })
//   recipes.forEach(recipe => {
//     let allRecipeIngredients = [];
//     recipe.ingredients.forEach(ingredient => {
//       allRecipeIngredients.push(ingredient.name);
//     });
//     if (!recipeChecker(allRecipeIngredients, ingredientNames)) {
//       let domRecipe = document.getElementById(`${recipe.id}`);
//       domRecipe.style.display = "none";
//     }
//   })
// }
