const getMealBtn = document.getElementById('get_meal');
const mealContainer = document.getElementById('meal');

getMealBtn.addEventListener('click',()=>{
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
        createMeal(res.meals[0])
    });
});

function createMeal(meal) {
    const ingredients = [];
    for(i=1; i<=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }else{
            break;
        }
    }
    console.log(ingredients);

    mealContainer.innerHTML = `
        <div class="row">
            <div class = "column five">
                <img src="${meal.strMealThumb}" alt="Meal Img">
            </div>
            <p>
            <strong>Category: </strong> 
            ${meal.strCategory}
            <strong> | </strong>
            <strong>Origin: </strong>
            ${meal.strArea}
            <strong> | </strong>
            <strong>Tags: </strong>
            ${meal.strTags.split(',').join(' , ')}
            <h3>Ingredients</h5>
            <ol>
            ${ingredients.map(ingredient => `
            <li>${ingredient}</li>
            `).join('')}
            </ol>
            </p>
            <div class = "column seven">
                <h3>${meal.strMeal}</h4>
                <p>${meal.strInstructions}</p>
            </div>
            <div class="row">
            <h4>Video Recipe</h4>
            <div class="wrapper">
            <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"/>
            </div>
            </div>
        </div>
    `;
}


