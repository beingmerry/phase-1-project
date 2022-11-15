// 🌐 Global Variables
const listBreweries = document.querySelector('ol#list-breweries') 
let allBreweries =[];
const breweryName = document.querySelector('#brewery-name');
const breweryType = document.querySelector('#brewery-type');
const breweryAdd = document.querySelector('#brewery-address');
const brewerySite = document.querySelector('#brewery-url');
const brewerySearchForm = document.querySelector('#search-form')

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
  fetch(`https://api.openbrewerydb.org/breweries?by_city=boulder`)
  .then(response => response.json())
  .then(breweries => loadSearchResults(breweries))
}
// ⌛ Wait until document loaded to run initialization
document.addEventListener('DOMContentLoaded', init)

brewerySearchForm.addEventListener('submit', ()=>{
  e.preventDefault()
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${}`)
  .then(response => response.json())
  .then(breweries => loadSearchResults(breweries)
})