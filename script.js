const parent = document.getElementsByClassName('countries')

const getData = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(countries =>
            countries.map((country) => {
                const name = country.name.common;
                const population = country.population;
                const capital = country.capital === undefined ? ('not found') : (country.capital[0]);
                const continents = country.continents[0]
            })
        )
}

getData()

                // country.name.common,
                // country.population
                // country.continents[0]

