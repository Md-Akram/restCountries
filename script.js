const parent = document.querySelector('.countries');


const getCountries = () => {

    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then((countries) => {

            countries.map((country) => {
                let name = country.name.common;
                if (name.length > 20) {
                    let newName = `${name.slice(0, 15)}...`
                    name = newName;
                } else {
                    name = name
                }
                const population = country.population;
                let capital = country.capital === undefined ? ('not found') : (country.capital[0]);
                if (capital.length > 18) {
                    let newCapital = `${capital.slice(0, 15)}...`
                    capital = newCapital;
                } else {
                    capital = capital
                }
                const continents = country.continents[0]
                const flag = country.flags.png
                parent.innerHTML += `
                    <div class="country">
                        <div class="flag">
                            <img src="${flag}" alt="flag">
                        </div>
                        <div class="info">
                            <h3>${name}</h3>
                            <p>Population : <span>${population}</span></p>
                            <p>region : <span>${continents}</span></p>
                            <p>capital : <span>${capital}</span></p>
                        </div>
                    </div>
                `
            })
            changeLoadingState()

        }
        )
}

const changeLoadingState = () => {
    parent.removeChild(parent.firstElementChild)
}



const getFilteredCountries = (region) => {
    parent.innerHTML = `<h1 id="loading">Loading...</h1 >`

    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(res => res.json())
        .then((countries) => {
            countries.map((country) => {
                let name = country.name.common;
                if (name.length > 20) {
                    let newName = `${name.slice(0, 15)}...`
                    name = newName;
                } else {
                    name = name
                }
                const population = country.population;
                let capital = country.capital === undefined ? ('not found') : (country.capital[0]);
                if (capital.length > 18) {
                    let newCapital = `${capital.slice(0, 15)}...`
                    capital = newCapital;
                } else {
                    capital = capital
                }
                const continents = country.continents[0]
                const flag = country.flags.png
                parent.innerHTML += `
                    <div class="country">
                        <div class="flag">
                            <img src="${flag}" alt="flag">
                        </div>
                        <div class="info">
                            <h3>${name}</h3>
                            <p>Population : <span>${population}</span></p>
                            <p>region : <span>${continents}</span></p>
                            <p>capital : <span>${capital}</span></p>
                        </div>
                    </div>
                `
            })
            changeLoadingState()

        }
        )

}


getCountries()