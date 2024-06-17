// details.js

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get('name');
  
    if (pokemonName) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
  
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Pokemon not found.');
          }
          return response.json();
        })
        .then(data => {
          displayPokemonDetails(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          displayErrorMessage('Pokemon not found.');
        });
    } else {
      displayErrorMessage('Pokemon name not specified!');
    }
  
    function displayPokemonDetails(pokemon) {
      const pokemonNameElement = document.getElementById('pokemonName');
      const pokemonImageElement = document.getElementById('pokemonImage');
      const pokemonDetailsElement = document.getElementById('pokemonDetails');
  
      pokemonNameElement.textContent = pokemon.name.toUpperCase();
      pokemonImageElement.src = pokemon.sprites.front_default;
      pokemonImageElement.alt = pokemon.name;
  
      pokemonDetailsElement.innerHTML = `
        <h5>Abilities:</h5>
        <ul>
          ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
        </ul>
        <h5>Types:</h5>
        <ul>
          ${pokemon.types.map(type => `<li>${type.type.name}</li>`).join('')}
        </ul>
        <h5>Stats:</h5>
        <ul>
          <li><strong>HP:</strong> ${getStatValue(pokemon, 'hp')}</li>
          <li><strong>Attack:</strong> ${getStatValue(pokemon, 'attack')}</li>
          <li><strong>Defense:</strong> ${getStatValue(pokemon, 'defense')}</li>
          <li><strong>Special Attack:</strong> ${getStatValue(pokemon, 'special-attack')}</li>
          <li><strong>Special Defense:</strong> ${getStatValue(pokemon, 'special-defense')}</li>
          <li><strong>Speed:</strong> ${getStatValue(pokemon, 'speed')}</li>
        </ul>
      `;
    }
  
    function displayErrorMessage(message) {
      const pokemonDetailsElement = document.getElementById('pokemonDetails');
      pokemonDetailsElement.innerHTML = `<p class="text-danger">${message}</p>`;
    }
  
    function getStatValue(pokemon, statName) {
      const stat = pokemon.stats.find(stat => stat.stat.name === statName);
        return stat ? stat.base_stat : '-';
  }
});
  