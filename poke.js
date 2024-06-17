
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
  
    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase();
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;
  
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Pokemon not found.');
          }
          return response.json();
        })
        .then(data => {
          window.location.href = `details.html?name=${pokemonInput}`;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          displayErrorMessage('Pokemon not found.');
        });
    });
  
    function displayErrorMessage(message) {
      const resultContainer = document.getElementById('resultContainer');
      resultContainer.innerHTML = `<p class="error-message">${message}</p>`;
    }
  });
  