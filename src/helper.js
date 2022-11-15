// 🎯🟢 Fetch the breweries near you! Boulder by default



const loadSearchResults = (breweries) => {
    allBreweries = [...breweries]
    console.log(allBreweries)
    breweries.forEach(brewery => {  
      const newBreweryListElement = document.createElement('li')
      newBreweryListElement.textContent = brewery.name
      newBreweryListElement.id          = `${brewery.id}`
      newBreweryListElement.addEventListener('click', ()=>renderBrewery(brewery))
      listBreweries.appendChild(newBreweryListElement)
    });
    renderBrewery(breweries[0])
  }


  const renderBrewery = (brewery)=>{
    breweryName.textContent = brewery.name
    breweryType.textContent = brewery.brewery_type.toUpperCase()
    breweryAdd.textContent = brewery.street
    brewerySite.src = brewery.website_url
}