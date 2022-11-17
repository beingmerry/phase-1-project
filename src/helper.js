// 🎯🟢 Fetch the breweries near you! Boulder by default

const cityFetch = (city = "Boulder") => {
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}&per_page=100`)
        .then((response) => response.json())
        .then((breweries) => {
            if (breweries.length === 0) {
                errorMessage.textContent = "No Breweries Found";
                errorMessage.classList.toggle("hidden")
            } else {
                allBreweries = [...breweries];
                activePageBreweries = [...allBreweries].splice(0,10)
                totalPages = Math.ceil(allBreweries.length / 10)
                previousPageButton.setAttribute("disabled", "true")
                if (totalPages > 1) {
                    nextPageButton.removeAttribute("disabled")
                } else {
                    nextPageButton.setAttribute("disabled", "true")
                }
                loadSearchResults(activePageBreweries);
            }
        })
        .catch((error) => {
            console.error(error);
            errorMessage.textContent = "⛔ API SERVER ERROR";
            showErrorMessage()
        });
    // add code to show city on screen
    const citySearched = document.querySelector('#city-searched')
    citySearched.textContent = city
};

// 🎯 Go to local db and grab favorites list, render at page load
const favoritesFetch = () => {
    myBreweriesList.innerHTML = "";
    if(serverStateGood){
    fetch(`http://localhost:3000/myBreweryList`)
        .then((response) => response.json())
        .then((myBreweries) =>
            myBreweries.forEach((brewery) => renderFavorite(brewery))
        )
        .catch((error) => {
            serverStateGood = false
            console.warn("⚠️ - No Server Detected at http://localhost:3000, running in local mode - favorites will not persist.")
            errorMessage.textContent = "⚠️ - No Server Detected at http://localhost:3000, running in local mode - favorites will not persist."
            showErrorMessage()
        });
    }
};

const showErrorMessage = () => {
    errorDiv.classList.remove("hidden")
    errorDiv.classList.add("visible")
    setTimeout(() => {
        errorDiv.classList.add("hidden")
        errorDiv.classList.remove("visible")
    }, 5000)
}
const loadSearchResults = (breweries) => {
    breweryResultsTable.innerHTML = "";
    breweries.forEach((brewery) => renderBreweryRow(brewery));
    renderBrewery(breweries[0]);
};
const renderBreweryRow = (brewery) => {
    const newBreweryRowElement = document.createElement("tr");
    const firstElementResultNumber = 1 + 10 * (currentPage - 1);
    newBreweryRowElement.classList.add("brewery-row-result");
    const tableRowCount = document.querySelectorAll(".brewery-row-result").length;
    const currentResultNumber = tableRowCount + firstElementResultNumber;
    let phoneNumberCheck = "N/A"
    if (brewery.phone !== null) {
        phoneNumberCheck = `(${brewery.phone.slice(0,3)}) ${brewery.phone.slice(3,6)}-${brewery.phone.slice(6)}`
    }
    newBreweryRowElement.innerHTML = `
        <td><button id="quick-add-brewery-${currentResultNumber}">➕</button></td>
        <td><button id="see-brewery-details-${currentResultNumber}">ℹ️</button></td>
        <td>${currentResultNumber}</td>
        <td>${brewery.name}</td>
        <td class="brewery-type-data">${brewery.brewery_type}</td>
        <td>${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}</td>
        <td>${phoneNumberCheck}</td>
    `;
    newBreweryRowElement.id          = `${brewery.id}`
    newBreweryRowElement.classList.add('brewery-list-element')
    breweryResultsTable.appendChild(newBreweryRowElement)
    
    const addButton    = document.querySelector(`#quick-add-brewery-${currentResultNumber}`)
    const detailButton = document.querySelector(`#see-brewery-details-${currentResultNumber}`)
    addButton.addEventListener('click',    ()=> postNewBrewery(brewery))
    detailButton.addEventListener('click', ()=> renderBrewery(brewery))
};

const renderBrewery = (brewery) => {
    const oldActiveRow = document.querySelector("tr.active")
    if (oldActiveRow !== null) {oldActiveRow.classList.remove("active")}
    const newActiveRow = document.querySelector(`#${brewery.id}`)
    newActiveRow.classList.add("active")
    currentBrewery.breweryApiId = brewery.id;
    currentBrewery.name = brewery.name;
    currentBrewery.breweryType = brewery.brewery_type;
    currentBrewery.breweryFullAddress = `${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`;
    currentBrewery.url = brewery.website_url;

    breweryName.dataset.id = currentBrewery.breweryApiId;
    breweryName.textContent = currentBrewery.name;
    breweryType.textContent = currentBrewery.breweryType;
    breweryAddress.textContent = currentBrewery.breweryFullAddress;
    brewerySite.textContent = currentBrewery.url;
    brewerySite.href = currentBrewery.url;
};

const renderFavorite = (brewery) => {
    const newBrewery = document.createElement("li");
    const idValue = brewery.id
    newBrewery.classList.add("my-brewery-list-element");
    newBrewery.id = `my-brewery-${idValue}`;
    newBrewery.textContent = `${brewery.name}   ` ;
    favorites = [...favorites, brewery.name];
    myBreweriesList.appendChild(newBrewery);

    const breweryDeleteBtn = document.createElement("button")
    breweryDeleteBtn.id = `delete-btn-${idValue}`
    breweryDeleteBtn.classList.add = "btn"
    breweryDeleteBtn.textContent = "X"
    newBrewery.appendChild(breweryDeleteBtn)
    breweryDeleteBtn.addEventListener('click', ()=>{
        if(serverStateGood){
            fetch(`http://localhost:3000/myBreweryList/${idValue}`, {
                method: `DELETE`,
            })
            .then(response => console.log(response.json()))
            .then(() =>{
                favorites.splice(favorites.indexOf(brewery.name), 1)
                myBreweriesList.removeChild(newBrewery)
            })
        } else {
            favorites.splice(favorites.indexOf(brewery.name), 1)
            myBreweriesList.removeChild(newBrewery)
        }       
    })
};

const postNewBrewery = (newBrewery = currentBrewery) => {
    // 🎯🟢 Check current favorites before posting duplicate to db.json
    if (
        0 ===
        favorites.filter((favorite) => favorite === newBrewery.name).length
    ) {
        if(serverStateGood){
            fetch(`http://localhost:3000/myBreweryList`, {
                method: `POST`,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(newBrewery),
            })
            .then((response) => response.json())
            .then((breweryAdded) => renderFavorite(breweryAdded))
        } else {
            console.log("No server at http://localhost:3000, rendering locally only...")
            renderFavorite(newBrewery)
        }    
    }
};
