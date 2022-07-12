const parent = document.querySelector('.countries');
const dropDown = document.querySelector('.dropdown')
const dropDownHeader = document.querySelector('.dropdown-header')
const back = document.querySelector('.back-button')
const details = document.querySelector('.details')
const searchAndFilter = document.querySelector('.searchAndFilter')
const flagAndDetails = document.querySelector('.flagAndDetails')

const dropdownToggler = () => {
    dropDown.classList.toggle('block')
}

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
                    <div class="country" onclick='getCountryDetails("${name}")'>
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
    dropdownToggler()
    dropDownHeader.innerHTML = `
                <p>${region}</p>
                <i class="fa-solid fa-angle-down"></i>
    
    `
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
                    <div class="country" onclick='getCountryDetails("${name}")'>
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

const search = (name) => {

    parent.innerHTML = `<h1 id="loading">Loading...</h1 >`
    fetch(`https://restcountries.com/v3.1/name/${name}`)
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
                    <div class="country" onclick='getCountryDetails("${name}")'>
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
        ).catch(e => {
            console.log(e)
            parent.innerHTML = `<h1>Not found</h1 >`
        })
}

back.addEventListener('click', () => {
    details.style.display = 'none';
    searchAndFilter.style.display = 'flex';
    parent.style.display = 'flex';
})

const getCountryDetails = (country) => {
    details.style.display = 'block';
    searchAndFilter.style.display = 'none';
    parent.style.display = 'none';

    fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
        .then(res => res.json())
        .then((country) => {
            const flag = country[0].flags.png
            const nativeName = country[0].name.official
            const population = country[0].population;
            const region = country[0].region
            const subRegion = country[0].subregion
            const capital = country[0].capital[0]
            const topLevelDomain = country[0].tld[0]
            const currencyObj = country[0].currencies
            const currencies = currencyObj[Object.keys(currencyObj)].name
            const languageObj = country[0].languages
            const languagesArr = Object.values(languageObj)
            const languages = languagesArr.toString()
            let borders

            if (country[0].borders === undefined) {
                borders = 'no border'
            } else {
                borders = country[0].borders
            }

            flagAndDetails.innerHTML = `
            <div class="detail-flag">
                <img src="${flag}" alt="flag">
            </div>
            <div class="country-details">
                <h2>${country[0].name.common}</h2>
                <div class="first-details">
                    <p>Native Name: <span>${nativeName}</span></p>
                    <p>Population: <span>${population}</span></p>
                    <p>Region: <span>${region}</span></p>
                    <p>Sub Region: <span>${subRegion}</span></p>
                    <p>Capital: <span>${capital}</span></p>
                </div>
                <div class="second-details">
                    <p>Top Level Domain: <span>${topLevelDomain}</span></p>
                    <p>Currencies: <span>${currencies}</span></p>
                    <p>Languages: <span>${languages}</span></p>
                </div>
                <div class="border-countries">
                    <h3>Border Countries:</h3>
                    <div class="buttons">
                    ${borders}
                        
                    </div>
                </div>
            </div>
            `
        })
}


getCountries()

