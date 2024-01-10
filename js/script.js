// Example: Add Recipe Logic
document.getElementById('add-recipe-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve input values
    const recipeName = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const preparationSteps = document.getElementById('preparation-steps').value;
    const image = document.getElementById('recipe-image').value;

    // Validate input (you can add more validation)
    if (recipeName && ingredients && preparationSteps) {
        // Create a recipe object
        const recipe = {
            name: recipeName,
            ingredients: ingredients.replace(/\n/g, '<br>'), // Replace newline with HTML line break
            steps: preparationSteps.replace(/\n/g, '<br>'), // Replace newline with HTML line break
            image: image,
        };

        // Store the recipe in local storage
        saveRecipe(recipe);

        // Clear the form
        clearAddRecipeForm();

        // Refresh the recipe list
        displayRecipes();
    } else {
        alert('Please fill in all required fields.');
    }
});

// Example: Search Logic
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const searchQuery = document.getElementById('search-query').value.toLowerCase();
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const searchResults = recipes.filter(function (recipe) {
        // Check if the search query is present in the recipe name or ingredients or steps
        return (
            recipe.name.toLowerCase().includes(searchQuery) ||
            recipe.ingredients.toLowerCase().includes(searchQuery) ||
            recipe.steps.toLowerCase().includes(searchQuery)
        );
    });

    // Display the search results
    displaySearchResults(searchResults);
});

// Function to display search results
function displaySearchResults(results) {
    const searchResultsList = document.getElementById('search-results');

    // Clear previous content
    searchResultsList.innerHTML = '';

    if (results.length === 0) {
        // Display a message when there are no search results
        const message = document.createElement('p');
        message.textContent = 'No matching recipes found.';
        searchResultsList.appendChild(message);
    } else {
        // Display each search result
        results.forEach(function (recipe) {
            // Create an li element to display the search result
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = recipe.image;
            img.alt = recipe.name;
            img.classList.add('recipe-image');

            // Attach a click event listener to show the full recipe
            img.addEventListener('click', function () {
                showFullRecipe(recipe);
            });

            // Append the image to the li element
            li.appendChild(img);
            searchResultsList.appendChild(li);
        });
    }
}

// Function to display all recipes
function displayRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipeList = document.getElementById('recipe-list');

    // Clear previous content
    recipeList.innerHTML = '';

    // Display each recipe
    recipes.forEach(function (recipe) {
        // Create an li element to display the recipe image
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = recipe.image;
        img.alt = recipe.name;
        img.classList.add('recipe-image');

        // Attach a click event listener to show the full recipe
        img.addEventListener('click', function () {
            showFullRecipe(recipe);
        });

        // Append the image to the li element
        li.appendChild(img);
        recipeList.appendChild(li);
    });
}

// Function to show the full recipe
function showFullRecipe(recipe) {
    // Get the modal element
    const modal = document.getElementById('recipeModal');

    // Get the elements inside the modal
    const modalContent = document.getElementById('modalContent');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    // Populate modal with recipe details
    modalContent.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <p><strong>Preparation Steps:</strong> ${recipe.steps}</p>
    `;

    // Show the modal
    modal.style.display = 'block';

    // Close modal when close button is clicked
    modalCloseBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close modal if the user clicks outside the modal
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Example: Save Recipe Function
function saveRecipe(recipe) {
    // Retrieve existing recipes from local storage
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Add the new recipe
    recipes.push(recipe);

    // Save the updated recipes to local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Example: Clear Add Recipe Form
function clearAddRecipeForm() {
    document.getElementById('recipe-name').value = '';
    document.getElementById('ingredients').value = '';
    document.getElementById('preparation-steps').value = '';
    document.getElementById('recipe-image').value = '';
}

// Example: Refresh Recipe List
function refreshRecipeList() {
    displayRecipes();
}

// Call displayRecipes on page load
document.addEventListener('DOMContentLoaded', function () {
    displayRecipes();
});
document.getElementById('delete-all-recipes').addEventListener('click', function () {
    if (confirm('Are you sure you want to delete all recipes?')) {
        localStorage.removeItem('recipes');
        displayRecipes(); // Refresh the recipe list after deletion
    }
});