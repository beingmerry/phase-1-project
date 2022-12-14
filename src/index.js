// โ ๏ธ ReadMe First! โ ๏ธ
//  ๐จ  1. Helper functions are located in the helper.js file ๐จ
//  ๐  2. Global variables are located in the global.js file ๐
// ๐๏ธ Current Tasks
//  ๐ฏ๐ข 1. Flesh out the rest of the HTML elements
//  ๐ฏ๐ข 2. Build Basic CSS (top bar, 2 columns, footer) w/ Bootstrap styles
//  ๐ฏ๐ข 3. Construct JS to perform search function for city
//  ๐ฏ๐ข 4. Build the like function into each brewery, when liked, load that brewery into local db
//  ๐ฏโ 5. Build the "Add to my bar hop" function

// ๐ฅ Initialize all scripts, forms, and event listeners
const init = () => {
    // ๐ All init function on this page, all other functions in helper.js
    initBrewerySearchForm();
    initBreweryAddButton();
    initNextButton();
    initPreviousButton();
    initPartyToggleButton();
    cityFetch();
    favoritesFetch();

    initWebStorageToggleButton();
};

// ๐๏ธ๐๏ธ๐ฉ๐งช On click, activate webStorageMode
const initWebStorageToggleButton = () => {
  const webStorageModeToggleButton = document.querySelector('#webStorageModeFlexSwitch')
  
  webStorageModeToggleButton.checked = localStorage.length !== 0
  webStorageMode = webStorageModeToggleButton.checked
  serverStateGood = webStorageMode ? false: true
  webStorageModeToggleButton.addEventListener('click', () => {
    if (webStorageMode) {
      serverStateGood = true
      webStorageModeToggleButton.checked = false
      localStorage.clear()
      webStorageMode = false
    } else {
      webStorageMode = true
      serverStateGood = false
      webStorageModeToggleButton.checked = true
      localStorage.setItem('webStorageMode', true)
      localStorage.setItem('localFavoriteBreweries', [])
    }
  })
}

// ๐ On click, to party or not to party, that is the question
const initPartyToggleButton = () => {
  const partyToggleButton = document.querySelector('#partyModeFlexSwitch')
  const confettiElement = document.querySelector('#world')
  partyToggleButton.checked = false
  partyToggleButton.addEventListener('click', () => {
    if (partyToggleButton.checked) {
      confettiElement.removeAttribute("hidden")
    } else {
      confettiElement.setAttribute("hidden", "")
    }
  })
}

// ๐ฝ On submit or click, search by city
const initBrewerySearchForm = () => {
    brewerySearchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const city = brewerySearchForm.city.value;
        if (city !== "") {
            cityFetch(city);
        }
    });
};
// ๐ฝ On button click, add brewery to favorites
const initBreweryAddButton = () => {
    breweryAddButton.addEventListener("click", () => postNewBrewery());
};
// ๐ฝ On button click, change shown elements by index - 10
const initPreviousButton = () => {
  previousPageButton.addEventListener("click", (e) => {
    if (currentPage > 1) {
      currentPage--
      nextPageButton.removeAttribute("disabled")
      const startElement = 10 * (currentPage - 1)
      loadSearchResults([...allBreweries].splice(startElement, 10))
      if (currentPage === 1) {
        previousPageButton.setAttribute("disabled", "true")
      }
    }
  });
};
// ๐ฝ On button click, change shown elements by index + 10
const initNextButton = () => {
  nextPageButton.addEventListener("click", (e) => {
    if (currentPage < totalPages) {
      currentPage++
      previousPageButton.removeAttribute("disabled")
      const startElement = 10 * (currentPage - 1)
      loadSearchResults([...allBreweries].splice(startElement, 10))
      if (currentPage === totalPages) {
        nextPageButton.setAttribute("disabled", "true")
      }
    }
  })
}


// โ Wait until document loaded to run initialization
document.addEventListener("DOMContentLoaded", init);
