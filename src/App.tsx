import { useState } from "react";
import axios from "axios";

function App() {
  const [texto, setTexto] = useState("");
  const [estilo, setEstilo] = useState("");
  const [resultado, setResultado] = useState("");

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const response = await axios.post("http://127.0.0.1:8000/reescribir", {
        texto: texto,   // Este es el nombre correcto del campo
        estilo: estilo
      });

      // Verificamos si el campo "resultado" está presente en la respuesta
      if (response.data.resultado) {
        setResultado(response.data.resultado); // Asignamos el texto reescrito
      } else {
        console.error("Error en la API:", response.data.error || "Respuesta inesperada");
      }
    } catch (error) {
      console.error("Error al reescribir el texto:", error);
    }
  };


  return (
    <div>
      <h1 className="title text-center">Reescribir Artículos</h1>
      <form onSubmit={manejarEnvio}>
        <div>
          <label className="text-xl">Texto original:</label>
          <textarea className="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={10}
            cols={50}
          />
        </div>
        <div>
          <label>Estilo deseado:</label>
          <input
            type="text"
            value={estilo}
            onChange={(e) => setEstilo(e.target.value)}
          />
        </div>
        <button className="mt-5 text-white" type="submit">Reescribir</button>
      </form>
      {resultado && (
        <div className="w-2/4 mx-auto mt-5">
          <h2 className="text-center text-xl">Texto Reescrito:</h2>
          <p className="mx-0">{resultado}</p>
        </div>
      )}
    </div>
  );
}

export default App;

