// ⚠️ ReadMe First! ⚠️
//  🔨  1. Helper functions are located in the helper.js file 🔨
//  🌐  2. Global variables are located in the global.js file 🌐
// 🏗️ Current Tasks
//  🎯🚩1. Flesh out the rest of the HTML elements
//  🎯🚩 2. Build Basic CSS (top bar, 2 columns, footer) w/ Bootstrap styles
//  🎯🚩 3. Construct JS to perform search function for city
//  🎯🚩 4. Build the like function into each brewery, when liked, load that brewery into local db
//  🎯🚩 5. Build the "Add to my bar hop" function

// 🥇 Initialize all scripts, forms, and event listeners
const init = () => {
    // 📕 All init function on this page, all other functions in helper.js
    initBrewerySearchForm();
    initBreweryAddButton();
    cityFetch();
    favoritesFetch();
};
// 🔽 On submit or click, search by city
const initBrewerySearchForm = () => {
    brewerySearchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const city = brewerySearchForm.city.value;
        if (city !== "") {
            cityFetch(city);
        }
    });
};
// 🔽 On button click, add brewery to favorites
const initBreweryAddButton = () => {
    breweryAddButton.addEventListener("click", (e) => {
        e.preventDefault();
        postNewBrewery();
    });
};
// ⌛ Wait until document loaded to run initialization
document.addEventListener("DOMContentLoaded", init);
