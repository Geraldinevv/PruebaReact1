import React, { useState, useEffect } from 'react';
import Search from './Search';

const MiApi = () => {
  const [memoria, setMemoria] = useState([]);
  const [llenarDeNuevo, setllenarDeNuevo] = useState(false);
  const [results, setResults] = useState([]);
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (llenarDeNuevo) {
      obtenerImagenesDePerros();
    }
  }, [llenarDeNuevo]);

  const obtenerImagenesDePerros = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random/10');
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status === 'success') {
        setMemoria(data.message);
        setResults(data.message);
      } else {
        console.error('Error:', data.message);
      }

      console.log('Cargando...');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOnClick = () => {
    setMemoria([]);
    setllenarDeNuevo(true);
  };

  const handleOnSort = () => {
    const sorted = [...results].sort((a, b) =>
      a.localeCompare(b.split('/').pop())
    );

    setSortedResults(sorted);
    setResults(sorted);
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (index < results.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = memoria.filter((image) => {
      const breed = image.split('/').pop().split('.')[0];
      return breed.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setResults(filtered);
    setMemoria(filtered);
    setIndex(0);
  };

  return (
    <>
      <div>
        <h1>API PERROS</h1>
        <Search onSearch={handleSearch} />
        <button onClick={handleOnClick}>Cargar </button>
        <hr />
        {results.length ? (
          <img src={results[index]} alt="Perro" />
        ) : (
          <h1>Espera estoy consultando...</h1>
        )}
        <hr />
        <button onClick={handlePrev}>Anterior</button>
        
        <button onClick={handleNext}>Siguiente</button>
      </div>
    </>
  );
};

export default MiApi;