// 🎯🟢 Fetch the breweries near you! Boulder by default

const cityFetch = (city) =>{
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}`)
    .then(response => response.json())
    .then(breweries => {
       if(breweries.length === 0){ 
        listBreweries.textContent = "No Breweries Found"
       } else {
        loadSearchResults(breweries)
       }
    })
    .catch((error)=> {
        console.error(error)
        listBreweries.textContent = "API SERVER ERROR"
    })   
}

const loadSearchResults = (breweries) => {
    listBreweries.innerHTML = ""
    allBreweries = [...breweries]
    breweries.forEach(brewery => {  
      const newBreweryListElement = document.createElement('li')
      newBreweryListElement.textContent = brewery.name
      newBreweryListElement.id          = `${brewery.id}`
      newBreweryListElement.classList.add('brewery-list-element')
      newBreweryListElement.addEventListener('click', ()=>renderBrewery(brewery))
      listBreweries.appendChild(newBreweryListElement)
    });
    renderBrewery(breweries[0])
  }


const renderBrewery = (brewery)=>{
    breweryName.dataset.id     = brewery.id
    breweryName.textContent    = brewery.name
    breweryType.textContent    = brewery.brewery_type.toUpperCase()
    breweryAddress.textContent = `${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`
    brewerySite.textContent    = brewery.website_url
    brewerySite.href           = brewery.website_url
}