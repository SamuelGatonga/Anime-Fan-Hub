// Add anime form
const animeForm = document.getElementById('animeForm');
if (animeForm) {
  animeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const episodes = document.getElementById('episodes').value.trim();
    const description = document.getElementById('description').value.trim();
    const image = document.getElementById('image').value.trim();

    if (name && genre && episodes && description) {
      const newAnime = { name, genre, episodes, description, image };
      const animeList = JSON.parse(localStorage.getItem('animeList')) || [];
      animeList.push(newAnime);
      localStorage.setItem('animeList', JSON.stringify(animeList));
      alert('Anime added successfully!');
      animeForm.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  });
}

// Load anime list
const animeListEl = document.getElementById('anime-list');
function loadAnime() {
  const animeList = JSON.parse(localStorage.getItem('animeList')) || [];
  if (animeListEl) {
    animeListEl.innerHTML = '';

    const genres = new Set();
    animeList.forEach(anime => {
      genres.add(anime.genre);

      const div = document.createElement('div');
      div.className = 'anime-card';
      div.setAttribute('data-genre', anime.genre.toLowerCase());
      div.innerHTML = `
        <h3>${anime.name}</h3>
        <div class="genre-tag">${anime.genre}</div>
        <p><strong>Episodes:</strong> ${anime.episodes}</p>
        <p>${anime.description}</p>
        ${anime.image ? `<img src="${anime.image}" alt="${anime.name}" style="width:100%; height:auto;">` : ''}
      `;
      animeListEl.appendChild(div);
    });

    const genreFilter = document.getElementById('genre-filter');
    if (genreFilter) {
      genreFilter.innerHTML = '<option value="all">All Genres</option>';
      genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.toLowerCase();
        option.textContent = genre;
        genreFilter.appendChild(option);
      });
    }
  }
}
loadAnime();

// Search
const searchInput = document.getElementById('search');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const animeCards = document.querySelectorAll('.anime-card');
    animeCards.forEach(card => {
      if (card.textContent.toLowerCase().includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Filter by genre
const genreFilter = document.getElementById('genre-filter');
if (genreFilter) {
  genreFilter.addEventListener('change', (e) => {
    const selectedGenre = e.target.value;
    const animeCards = document.querySelectorAll('.anime-card');
    animeCards.forEach(card => {
      const cardGenre = card.getAttribute('data-genre');
      if (selectedGenre === 'all' || cardGenre === selectedGenre) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Dark mode toggle
const toggleButton = document.getElementById('dark-mode-toggle');
if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  });

  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
  }
}