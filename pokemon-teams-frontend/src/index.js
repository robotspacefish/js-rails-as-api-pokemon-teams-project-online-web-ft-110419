const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main');

function fetchData(url, callback) {
  fetch(url)
    .then(resToJson)
    .then(callback)
    .catch(error => console.log(error.message))
}

function renderTrainerCards(trainers) {
  trainers.forEach(trainer => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', trainer.id);

    const pNickname = document.createElement('p');
    pNickname.innerText = trainer.name

    const addBtn = document.createElement('button');
    addBtn.setAttribute('data-trainer-id', trainer.id);
    addBtn.innerText = "Add Pokemon";
    addBtn.addEventListener(
      'click',
      (e) => fetchNewPokemon(e, trainer)
    );

    const ul = document.createElement('ul');
    renderPokemonList(trainer.pokemons).forEach(
      trainerLi => ul.appendChild(trainerLi)
    );

    [pNickname, addBtn, ul].forEach(el => card.appendChild(el));
    main.appendChild(card);
  });
}

function renderPokemonList(pokemons) {
  const pokemonLis = [];
  pokemons.forEach(pokemon => {
    pokemonLis.push(renderPokemonLi(pokemon));
  });

  return pokemonLis;
}

function renderPokemonLi(pokemon) {
  const li = document.createElement('li');
  li.innerText = `${pokemon.nickname} (${pokemon.species})`;

  const releaseBtn = document.createElement('button');
  releaseBtn.innerText = "Release";
  releaseBtn.classList.add('release');
  releaseBtn.setAttribute('data-pokemon-id', pokemon.id);
  releaseBtn.addEventListener('click', function (e) {
    releasePokemon(e, pokemon.id);
  });

  li.appendChild(releaseBtn);

  return li;
}

function fetchNewPokemon(e, trainer) {
  if (e.target.parentNode.querySelectorAll('li').length >= 6) {
    alert("Your team is full.");
    return;
  }

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify({ trainer_id: trainer.id })
  }

  fetch(POKEMONS_URL, config)
    .then(resToJson)
    .then(pokemon => renderAddedPokemon(pokemon, e));
}

function renderAddedPokemon(pokemon, e) {
  e.target.parentNode.querySelector('ul')
    .appendChild(renderPokemonLi(pokemon));
}

function releasePokemon(e, pokemonId) {
  fetch(`${POKEMONS_URL}/${pokemonId}`, { method: "DELETE" })
    .then(() => deletePokemonLi(e))
    .catch(error => console.log(error.message));
}

function deletePokemonLi(e) {
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
}

function resToJson(res) {
  return res.json();
}

fetchData(TRAINERS_URL, renderTrainerCards);