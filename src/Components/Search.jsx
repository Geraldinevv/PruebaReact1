import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const breed = searchTerm.trim().toLowerCase();
    if (breed) {
      fetch(`https://dog.ceo/api/breeds/list/all=${breed}`)
        .then((response) => response.json())
        .then((data) => {
          if (data[0]) {
            onSearch(data[0].url);
          } else {
            alert('No se encontraron resultados para esa raza de perro.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Ocurrió un error al buscar la raza de perro. Por favor, inténtalo de nuevo más tarde.');
        });
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input type="text" value={searchTerm} onChange={handleChange} placeholder="Buscar raza de perro..." />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default Search;