// 🌐 Global Variables
let allBreweries   = [];
let currentBrewery = {};
let favorites      = [];
let currentPage    = 1
let totalPages     = 1
let resultsCount   = 0

// 🏗️🗄️🚩 WebStorage Mode - ToDo
let webStorageMode = false
let localFavoriteBreweries = []

//Server State Check
let serverStateGood = true 

// Page button constants
const previousPageButton = document.querySelector('#search-previous-button')
const nextPageButton     = document.querySelector('#search-next-button')

// Error section constants
const errorDiv     = document.querySelector('#error-container')
const errorMessage = document.querySelector('#error-message')

// Results section constants
const breweryResultsTable = document.querySelector('tbody#results-table-body');
const breweryResultsCount = document.querySelector('#results-value');

// Detail section constants
const breweryName       = document.querySelector('#brewery-name');
const breweryType       = document.querySelector('#brewery-type');
const breweryAddress    = document.querySelector('#brewery-address');
const brewerySite       = document.querySelector('#brewery-url');
const brewerySearchForm = document.querySelector('#search-form');

// Favorites section constants
const myBreweriesList  = document.querySelector('#my-breweries-list');
const breweryAddButton = document.querySelector('#add-brewery-button')