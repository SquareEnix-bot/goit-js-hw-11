export const list = ({ flags, name, ...other }) => {
  return `<li class="list__item">
            <img class="list__img" src="${flags.svg}" alt="${name.common}">
            <h2 class="list__title">${name.common}</h2>
          </li>
          `
}

export const card = ({ flags, name, capital, population, languages }) => {
  const langsMarkup = Object.values(languages).join(', ');

  console.log('langsMarkup: ', langsMarkup);
  return `<div class="card">
            <div class="card__wrapper">
              <img class="card__img" src="${flags.svg}" alt="${name.common}">
              <h2 class="card__title">${name.common}</h2>
            </div>
            <div class="card__desc">
              <p class="card__text">Capital: <span class="card__text--normal">${capital}</span></p>
              <p class="card__text">Population: <span class="card__text--normal">${population}</span></p>
              <p class="card__text">Languages: <span class="card__text--normal">${langsMarkup}</span></p>
            </div>
          </div>
          `
}