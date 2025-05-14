function operation() {
    const searchInput = document.getElementById('inputsearch').value.trim().toLowerCase();
    const showResults = document.getElementById('searchresults');
    showResults.innerHTML = "";

    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let results = "";
            let found = false;

          
            const categories = ["beaches", "temples", "countries"];

            categories.forEach(category => {
                if (category === "countries") {
                    data.countries.forEach(country => {
                        country.cities.forEach(city => {
                        if (searchInput.length>3) {
                            if (city.name.toLowerCase().includes(searchInput) || country.name.toLowerCase().includes(searchInput)) {
                                results += formatResult(city);
                                found = true;
                            }
                        }
                            
                        });
                    });
                } 
                else {
                    data[category].forEach(item => {
                        if (searchInput.length>3) {
                            if ( searchInput === category || searchInput === category.slice(0, -1) || category.includes(searchInput) || item.name.toLowerCase().includes(searchInput)&& !data.countries.some(country => searchInput === country.name.toLowerCase())) {
                            results += formatResult(item);
                            found = true;
                        }
                        }
                        
                    });
                }
            });

            if (found) {
                showResults.innerHTML = results;
            } else {
                alert("Enter a valid keyword!");
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}


function formatResult(item) {
    return `<div class='results'>
                <img src="${item.imageUrl}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
            </div>`;
}


document.getElementById("searchbtn").addEventListener("click", operation);
document.getElementById("resetbtn").addEventListener("click", () => {
    document.getElementById('inputsearch').value = '';
    document.getElementById('searchresults').innerHTML = '';
});