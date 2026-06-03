let meals = []
let categorys = []
async function getMeals(mealCategory = "pasta") {
  try {
    //await fetch return a promise that resolves to a Response object
    //לך תביא את הדאטה מהשרת, תמתין עד שתחזיר את התגובה ואז תמשיך

    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealCategory
    )

    const data = await response.json() //pjecyt with meals array inside
    console.log(data) // the whole response object
    meals = (data.meals || []).slice(0, 20) // assign the meals array from the response, if it's null assign an empty array

    console.log(meals.length) // array of users
    return render()
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}
function render() {
  const mealsContainer = document.getElementById("meals-container")
  mealsContainer.innerHTML = ""

  meals.forEach((meal, index) => {
    const mealCard = document.createElement("div")
    mealCard.className = "meal-card"

    mealCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
          
            <p>Category: ${meal.strCategory || ""}</p>
            <button class="delete-btn" onclick="deleteMeal(${index})">Delete Meal</button>
        `

    mealsContainer.appendChild(mealCard)
  })
}

getMeals()

// const categorySelect = document.getElementById("meal-category")
// categorySelect.addEventListener("change", (event) => {
//   const selectedCategory = event.target.value
//   getMeals(selectedCategory)
// })
// function selectCategory() {
//   const categorySelect = document.getElementById("meal-category")
//   const selectedCategory = categorySelect.value
//   getMeals(selectedCategory)
// }

function selectCategory() {
  const categorySelect = document.getElementById("meal-category")
  const selectedCategory = categorySelect.value
  getMealsByCategory(selectedCategory)
}

function searchMeal() {
  const searchInput = document.getElementById("search-input")
  getMeals(searchInput.value)
}
function deleteMeal(index) {
  meals.splice(index, 1) // remove the meal at the specified index from the meals array
  render() // re-render the meals to reflect the deletion
}

async function getMealsCategorys() {
  try {
    //await fetch return a promise that resolves to a Response object
    //לך תביא את הדאטה מהשרת, תמתין עד שתחזיר את התגובה ואז תמשיך

    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    )

    const data = await response.json() //pjecyt with meals array inside
    console.log(data) // the whole response object
    categorys = data.categories || [] // assign the meals array from the response, if it's null assign an empty array

    return renderCategorySelect()
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}
function renderCategorySelect() {
  const categorySelect = document.getElementById("meal-category")
  categorys.forEach((category) => {
    const option = document.createElement("option")
    option.value = category.strCategory
    option.textContent = category.strCategory
    categorySelect.appendChild(option)
  })
}
getMealsCategorys()

async function getMealsByCategory(category) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category
  )
  const data = await response.json()
  meals = (data.meals || []).slice(0, 20)
  render()
}
