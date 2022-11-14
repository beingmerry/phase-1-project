// 🎯🟢 Fetch the breweries near you! Boulder by default
const loadSearchResults = (breweries) => {
    breweries.forEach(brewery => {
      const newBreweryListElement = document.createElement('li')
      newBreweryListElement.textContent = brewery.name
      newBreweryListElement.id          = `${brewery.id}`
      listBreweries.appendChild(newBreweryListElement)
    });
  }