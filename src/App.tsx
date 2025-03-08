import { useState } from "react";
import axios from "axios";

function App() {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState("");

  const [loading, setLoading] = useState(false);

  const manejarReset = () => {
    setLoading(true);
    setTexto("");
    setResultado("")// Resetea el texto
    setTimeout(() => setLoading(false), 500); // Simulación de tiempo de espera
  };

  const manejarEnvio = async (e: React.FormEvent) => {

    e.preventDefault();
    try {

      const response = await axios.post("https://redaction-ai.onrender.com/reescribir", {
        texto: texto,
      });

      // Verificamos si el campo "resultado" está presente en la respuesta
      if (response.data.resultado) {
        setResultado(response.data.resultado);
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

        <div className="flex gap-5">
          <button className="mt-5 text-white" type="submit">Reescribir</button>

          <button disabled={loading} className={`mt-5 px-4 py-2 rounded-lg ${loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-dark text-white"
            }`} onClick={manejarReset}>Reset</button>
        </div>

      </form>

      <div className="flex gap-5">

        <div className="w-2/4 mx-auto p-5">
          <h2 className="text-center text-xl">Texto Reescrito:</h2>
          <p className="mx-0 border border-gray-500 p-4 rounded-lg">
            {resultado}
          </p>
        </div>
      </div>

    </div>
  );
}

export default App;

