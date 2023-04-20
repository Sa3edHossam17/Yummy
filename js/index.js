let rowData = document.getElementById("rowData");
let searchData = document.getElementById("searchData");
let submitBtn;

$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});

function closeNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate({ left: -boxWidth }, 500);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-xmark");
  $(".links li").animate({ top: 300 }, 500);
}

function openNav() {
  $(".side-nav-menu").animate({ left: 0 }, 500);
  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-xmark");
  for (i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
    //eq==> to select order of list
  }
}
closeNav();

$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});

async function getMealByName(term) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();
  // console.log(response.meals)
  dispalyMeal(response.meals);
}

function dispalyMeal(arr) {
  let cartona = "";
  for (i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-3">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img src="${arr[i].strMealThumb}" class="w-100" alt="">
            <div class="meal-layer position-absolute p-2 d-flex justify-content-center align-items-center">
                <h3 class= "text-black">${arr[i].strMeal}</h3>
            </div>
        </div>
    </div>
        
        `;
  }
  rowData.innerHTML = cartona;
}

async function getCategories() {
  searchData.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  //  console.log(response.categories)
  displayCategories(response.categories);
  closeNav();
}

function displayCategories(arr) {
  let cartona = "";
  for (i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-3">
        <div onclick = "getCategoryMeal('${
          arr[i].strCategory
        }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img src="${arr[i].strCategoryThumb}" class="w-100" alt="">
            <div class="meal-layer position-absolute p-2 text-center text-black">
                <h3 class= "text-black">${arr[i].strCategory}</h3>
                <P> ${arr[i].strCategoryDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</P>
                
            </div>
        </div>
    </div>
        
        `;
    //split(" ").slice(0,15).join(" ") ==> to show only 15 word of description
  }
  rowData.innerHTML = cartona;
}

async function getArea() {
  searchData.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  // console.log(response.meals)
  displayArea(response.meals);
  closeNav();
}
function displayArea(arr) {
  let cartona = "";
  for (i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-3">
        <div>
            
            <div onclick ="getAreaMeal('${arr[i].strArea}')" class= "rounded-2 text-center text-white cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${arr[i].strArea}</h3>
           
                
            </div>
        </div>
    </div>
        
    `;
  }
  rowData.innerHTML = cartona;
}
async function getIngredient() {
  searchData.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  console.log(response.meals);
  displayIngredient(response.meals.slice(0, 20));
  closeNav();
}
function displayIngredient(arr) {
  let cartona = "";
  for (i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-3">
        <div>
            
            <div onclick ="getIngredientMeal('${
              arr[i].strIngredient
            }')" class= "rounded-2 text-center text-white ingredient cursor-pointer ">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3 class="mt-2">${arr[i].strIngredient}</h3>
                <P class = "text-muted"> ${arr[i].strDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</P>
           
                
            </div>
        </div>
    </div>
        
    `;
  }
  rowData.innerHTML = cartona;
}

async function getCategoryMeal(category) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();
  // console.log(response.meals)
  dispalyMeal(response.meals.slice(0, 20));
  // to show meals when click on any div in category
  closeNav();
}
async function getAreaMeal(area) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  // console.log(response.meals)
  dispalyMeal(response.meals.slice(0, 20));
  // to show meals when click on any div in area
  closeNav();
}

async function getIngredientMeal(ingredient) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  response = await response.json();
  // console.log(response.meals)
  dispalyMeal(response.meals.slice(0, 20));
  // to show meals when click on any div in ingredient
  closeNav();
}

async function getMealDetails(mealID) {
  closeNav();
  rowData.innerHTML = "";

  searchData.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json();

  displayMealDetails(respone.meals[0]);
}

function displayMealDetails(meal) {
  searchData.innerHTML = "";

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  // let tags = meal.strTags.split(",")
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  rowData.innerHTML = cartoona;
  closeNav();
}

function showSearchInputs() {
  searchData.innerHTML = `
<div class="row py-4">
<div class="col-md-6">
    <input  onkeyup="searchByName(this.value)" type="text" class="text-white search px-5 bg-transparent " placeholder="search by Name">
</div>
<div class="col-md-6">
    <input  onkeyup="searchByFirsttLetter(this.value)" maxlength=1 type="text" class=" search bg-transparent text-white px-5  " placeholder="search by First Letter">
</div>
</div> 
`;
  rowData.innerHTML = ""; // to hide meals when click on search...
  closeNav();
}

async function searchByName(term) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();

  response.meals ? dispalyMeal(response.meals) : dispalyMeal([]); // if respone.meals have value return this value and if not have value return empty array
}
async function searchByFirsttLetter(term) {
  term == "" ? (term = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();

  response.meals ? dispalyMeal(response.meals) : dispalyMeal([]); // if respone.meals have value return this value and if not have value return empty array
}

function showContact() {
  rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
            <div class="container w-75 text-center">
                <div class="row g-4">
                    <div class="col-md-6">
                        <input id ="nameValidation" onkeyup="validationInputs()" type="text" placeholder="enter your name" class=" form-control is-invalid">
                    
   <div class="alert alert-danger w-100 mt-2 d-none" id="nameAlert">
    special characters not allowed .. 
   </div>
                    </div>
                    <div class="col-md-6">
                        <input id ="emailValidation" onkeyup="validationInputs()" type="email" placeholder="enter your email" class=" form-control is-invalid">
                        <div class="alert alert-danger w-100 mt-2 d-none" id="emailAlert">
                            example name@gmail.com .. 
                           </div> 
                    </div>
                    <div class="col-md-6">
                        <input id ="phoneValidation" onkeyup="validationInputs()" type="text" placeholder="enter your phone" class=" form-control is-invalid">
                        <div class="alert alert-danger w-100 mt-2 d-none" id="phoneAlert">
                           valid number phone .. 
                           </div>
                    </div>
                    <div class="col-md-6">
                        <input id ="ageValidation" onkeyup="validationInputs()" type="number" placeholder="enter your age" class=" form-control is-invalid">
                    
                        <div class="alert alert-danger w-100 mt-2 d-none" id="ageAlert">
                            age must between 1 to 200.. 
                           </div></div>
                    <div class="col-md-6">
                        <input id ="passwordValidation" onkeyup="validationInputs()" type="password" placeholder="enter your password" class=" form-control is-invalid">
                        <div class="alert alert-danger w-100 mt-2 d-none" id="passwordAlert">
                        Enter valid password *Minimum eight characters, at least one letter and one number:* 
                           </div>
                    </div>
                    <div class="col-md-6">
                        <input id ="repasswordValidation" onkeyup="validationInputs()" type="password" placeholder="enter repassword" class=" form-control is-invalid">
                        <div class="alert alert-danger w-100 mt-2 d-none" id="repasswordAlert">
                           write password again
                           </div>
                    </div>
                </div>
                <button id="submitBtn" disabled  class=" btn btn-outline-light px-2 mt-4 "> submit</button>
            </div>
        </div>`;
  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameValidation").addEventListener("focus", () => {
    nameInputTouched = true;
  });
  document.getElementById("ageValidation").addEventListener("focus", () => {
    ageInputTouched = true;
  });
  document.getElementById("phoneValidation").addEventListener("focus", () => {
    phoneInputTouched = true;
  });
  document.getElementById("emailValidation").addEventListener("focus", () => {
    emailInputTouched = true;
  });
  document
    .getElementById("passwordValidation")
    .addEventListener("focus", () => {
      passwordInputTouched = true;
    });
  document
    .getElementById("repasswordValidation")
    .addEventListener("focus", () => {
      repasswordInputTouched = true;
    });
  closeNav();
}

let nameInputTouched = false;
let ageInputTouched = false;
let phoneInputTouched = false;
let emailInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function validationInputs() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
      document
        .getElementById("nameValidation")
        .classList.replace("is-invalid", "is-valid");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
      document
        .getElementById("nameValidation")
        .classList.replace("is-valid", "is-invalid");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
      document
        .getElementById("phoneValidation")
        .classList.replace("is-invalid", "is-valid");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
      document
        .getElementById("phoneValidation")
        .classList.replace("is-valid", "is-invalid");
    }
  }

  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
      document
        .getElementById("emailValidation")
        .classList.replace("is-invalid", "is-valid");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
      document
        .getElementById("emailValidation")
        .classList.replace("is-valid", "is-invalid");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
      document
        .getElementById("ageValidation")
        .classList.replace("is-invalid", "is-valid");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
      document
        .getElementById("ageValidation")
        .classList.replace("is-valid", "is-invalid");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
      document
        .getElementById("passwordValidation")
        .classList.replace("is-invalid", "is-valid");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
      document
        .getElementById("passwordValidation")
        .classList.replace("is-valid", "is-invalid");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
      document
        .getElementById("repasswordValidation")
        .classList.replace("is-invalid", "is-valid");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
      document
        .getElementById("repasswordValidation")
        .classList.replace("is-valid", "is-invalid");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameValidation").value);
}
function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneValidation").value
  );
}
function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailValidation").value
  );
}
function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageValidation").value
  );
}
function passwordValidation() {
  return /(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&? "])[a-zA-Z0-9!#$@^%&?]{8,20}$/.test(
    document.getElementById("passwordValidation").value
  );
}
function repasswordValidation() {
  return (
    document.getElementById("repasswordValidation").value ==
    document.getElementById("passwordValidation").value
  );
}
