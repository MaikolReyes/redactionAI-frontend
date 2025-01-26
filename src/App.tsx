import { useState } from "react";
import axios from "axios";

function App() {
  const [texto, setTexto] = useState("");
  const [estilo, setEstilo] = useState("");
  const [resultado, setResultado] = useState("");

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const response = await axios.post("https://redaction-ai.onrender.com/reescribir", {
        texto: texto,
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
      <h1 className="title text-center font-sans mt-10">Reescribir Artículos</h1>
      <form onSubmit={manejarEnvio}>
        <div className="">
          <label className="text-xl">Texto original:</label>
          <textarea className="texto rounded-lg p-5 bg-gray-400"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={10}
            cols={50}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label>Estilo deseado:</label>
          <input
            className="bg-gray-400 p-2 rounded-lg"
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
          <p className="mx-0 border border-gray-500 p-4 rounded-lg">
            {resultado.split('.').map((frase, index) => (
              frase.trim() && (
                <span key={index}>
                  {frase.trim()}.
                  <br />
                </span>
              )
            ))}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

