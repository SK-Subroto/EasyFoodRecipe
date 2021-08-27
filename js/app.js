const searchRecipe = () => {
    const recipeName = document.getElementById('recipe-input').value;
    const erroMessage = document.getElementById('error-message');
    if (recipeName.length == 0){
        // please enter
        erroMessage.innerText = 'Please Enter a Recipe Name';
    } else{
        erroMessage.innerText = '';
        loadRecipe(recipeName);
    }
}

const loadRecipe = (name) => {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.textContent = '';
    // loading
    const itemLoading = document.getElementById('item-loading');
    if (itemLoading.classList.contains('d-none')){
        itemLoading.classList.remove('d-none');
        itemLoading.classList.add('d-block');
    }
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

    fetch(url)
        .then(res => res.json())
        .then(json => displaySearchResult(json.meals))
}

const displaySearchResult = (data) => {
    console.log(data)
    const erroMessage = document.getElementById('error-message');

    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.textContent = '';
    // loading
    const itemLoading = document.getElementById('item-loading');
    if (itemLoading.classList.contains('d-block')) {
        itemLoading.classList.remove('d-block');
        itemLoading.classList.add('d-none');
    }
    if (data == null){
        // no result found
        erroMessage.innerText = 'No Recipe Found, Try Again!';
    } else{
        erroMessage.innerText = '';
        data.forEach(item => {
            const recipe = document.createElement('div');
            recipe.classList.add('col');
            recipe.innerHTML = `
                <div class="card">
                    <img src="${item.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${item.strMeal}</h5>
                        <p class="card-text">${item.strInstructions.slice(0, 200)}</p>
                    </div>
                    <div class="card-footer bg-white">
                        <button onclick="loadItemDetails(${item.idMeal})" data-bs-toggle="modal" data-bs-target="#itemModal" class="btn btn-primary float-end">Details</button
                    </div>
                </div>
            `;

            recipeContainer.appendChild(recipe);
        });
    }

}

const loadItemDetails = itemId => {
    document.getElementById('item-details').textContent = '';
    document.getElementById('item-details').innerHTML = `<div class="p-5 mx-auto">
                                                            <div class="spinner-border text-primary" role="status">
                                                                <span class="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>`;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meal => {
    console.log(meal);
    // document.getElementById('item-details').textContent = '';
    const mealModal = `
        
        
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${meal.strMeal}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            ${meal.strInstructions}
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Watch video</a>
        </div>
        
        
    `;
    document.getElementById('item-details').innerHTML = mealModal;
}