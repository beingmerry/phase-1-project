// 🌐 Global Variables
let allBreweries   = [];
let currentBrewery = {};
let favorites      = [];

const listBreweries = document.querySelector('ol#list-breweries');

const breweryName       = document.querySelector('#brewery-name');
const breweryType       = document.querySelector('#brewery-type');
const breweryAddress    = document.querySelector('#brewery-address');
const brewerySite       = document.querySelector('#brewery-url');
const brewerySearchForm = document.querySelector('#search-form');

const myBreweriesList  = document.querySelector('#my-breweries-list');
const breweryAddButton = document.querySelector('#add-brewery-button')

// ⚠️ Warnings ⚠️
// ⚠️ Helper functions are located in the helper.js file ⚠️
// 🏗️ Current Tasks
// 🎯 1. Flesh out the rest of the HTML to have all elements (only create if required)
// 🎯 2. Build Basic CSS to spit the screen into it's space (top bar, 2 columns, footer, etc.)
// 🎯 3. Construct JS to perform search function for city
// 🎯 4. Build the like function into each brewery, when liked, load that brewery into local db
// 🎯 5. Build the "Add to my bar hop" function

// 🥇 Initialize all scripts, forms, and event listeners


const init = () => {
  // 📕 All init function on this page, all other functions in helper.js
  initBrewerySearchForm()
  initBreweryAddButton()
  cityFetch()
  favoritesFetch()
}
// 🔽 On submit or click, search by city
const initBrewerySearchForm = () => {
  brewerySearchForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const city = brewerySearchForm.city.value
    if (city !== ''){
      cityFetch(city)
    }
  })
}
// 🔽 On button click, add brewery to favorites
const initBreweryAddButton = () => {
  breweryAddButton.addEventListener('click', (e)=>{
    e.preventDefault()
    postNewBrewery()
  })
}

// ⌛ Wait until document loaded to run initialization
document.addEventListener('DOMContentLoaded', init)