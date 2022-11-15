// 🎯🟢 Fetch the breweries near you! Boulder by default
const loadSearchResults = (breweries) => {
    allBreweries = [...breweries]
    console.log(allBreweries)
    breweries.forEach(brewery => {  
      const newBreweryListElement = document.createElement('li')
      newBreweryListElement.textContent = brewery.name
      newBreweryListElement.id          = `${brewery.id}`
      newBreweryListElement.addEventListener('click', (e)=>{
        
    })
    
      listBreweries.appendChild(newBreweryListElement)
    });
  }
