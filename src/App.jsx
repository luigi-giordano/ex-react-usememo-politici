import React, { useState, useEffect, useMemo } from "react"

const PoliticianCard = React.memo(({ name, image, position, biography }) => {
  console.log("Card");

  return (
    <div className="card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p><strong>Posizione</strong>{position}</p>
      <p>{biography}</p>
    </div>
  )
});

function App() {

  const API_URL = "http://localhost:3333";

  const [politici, setPolitici] = useState([]);
  const [search, setSearch] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')

  useEffect(() => {

    fetch(`${API_URL}/politicians`)
      .then(res => res.json())
      .then(data => setPolitici(data))
      .catch(error => console.error(error));
  }, []);

  const positions = useMemo(() => {
    return politici.reduce((acc, p) => {
      if (!acc.includes(p.position)) {
        return [...acc, p.position]
      }
      return acc;
    }, [])
  }, [politici]);

  const filteredPoliticians = useMemo(() => {
    return politici.filter(p => {
      const isInName = p.name.toLowerCase().includes(search.toLowerCase())
      const isInBio = p.biography.toLowerCase().includes(search.toLowerCase())
      const isPositionValid = selectedPosition === '' || selectedPosition === p.position
      return (isInName || isInBio) && isPositionValid
    })
  }, [politici, search, selectedPosition])


  return (
    <div>
      <h1>Lista Politici</h1>
      <input
        type="text"
        placeholder="Cerca per nome o biografia"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select
        value={selectedPosition}
        onChange={e => setSelectedPosition(e.target.value)}
      >
        <option value="">Filtra per Posizione</option>
        {positions.map((position, index) => (
          <option key={index} value={position}>{position}</option>
        ))}
      </select>
      <div className="politicians-list">
        {filteredPoliticians.map(p => (
          <PoliticianCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  )
}

export default App
