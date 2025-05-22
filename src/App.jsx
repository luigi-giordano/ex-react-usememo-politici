import { useState, useEffect } from "react"

function App() {

  const API_URL = "http://localhost:3333";

  const [politici, setPolitici] = useState([]);

  useEffect(() => {

    fetch(`${API_URL}/politicians`)
      .then(res => res.json())
      .then(data => setPolitici(data))
      .catch(error => console.error(error));
  }, []);

  console.log(politici);

  return (
    <div>
      <h1>Lista Politici</h1>
      <div className="politicians-list">
        {politici.map(p => (
          <div className="card" key={p.id}>
            <img src={p.image} alt={p.name} />
            <h2>{p.name}</h2>
            <p><strong>Posizione:</strong>{p.position}</p>
            <p>{p.biography}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
