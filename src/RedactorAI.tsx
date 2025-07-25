import { useState } from 'react';

const API_BASE = 'https://redaction-ai.onrender.com';

function RedactorAI() {
    const [textoOriginal, setTextoOriginal] = useState('');
    const [textoReescrito, setTextoReescrito] = useState('');
    const [textoIngles, setTextoIngles] = useState('');
    // const [imagenUrl, setImagenUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const manejarReset = () => {
        setLoading(true);
        setTextoOriginal("");
        setTextoReescrito("")// Resetea el texto
        setTimeout(() => setLoading(false), 500); // Simulación de tiempo de espera
    };

    const manejarTodo = async () => {
        setLoading(true);

        try {
            // 1. Reescribir
            const res1 = await fetch(`${API_BASE}/reescribir`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto: textoOriginal }),
            });
            const data1 = await res1.json();
            const reescrito = data1.resultado;
            setTextoReescrito(reescrito);

            // 2. Traducir
            const res2 = await fetch(`${API_BASE}/traducir`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto: reescrito }),
            });
            const data2 = await res2.json();
            const enIngles = data2.resultado;
            setTextoIngles(enIngles);

            // 3. Crear imagen
            // const res3 = await fetch(`${API_BASE}/create-image`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ prompt: enIngles }),
            // });
            // const data3 = await res3.json();
            // setImagenUrl(data3.imagen);

        } catch (error) {
            console.error('Error en el proceso:', error);
        } finally {
            setLoading(false);
        }
    };

    return (

        <>
            <h1 className='text-center p-8'>Redactor con Inteligencia Artificial</h1>

            <div className="p-4 mx-auto">
                <textarea
                    value={textoOriginal}
                    onChange={(e) => setTextoOriginal(e.target.value)}
                    placeholder="Pegá aquí tu artículo original..."
                    className="w-full h-40 p-2 border mb-4"
                />

                <div className='flex gap-5 justify-center'>

                    <button
                        onClick={manejarTodo}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                    >
                        {loading ? 'Procesando...' : 'Reescribir y Traducir'}
                    </button>

                    <button
                        disabled={loading}
                        className={`px-4 py-2 rounded hover:bg-gray-700 ${loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-dark text-white"
                            }`}
                        onClick={manejarReset}>
                        Reset
                    </button>

                </div>

            </div>

            {/* <div className='mx-auto w-3/4 p-5'>
                {imagenUrl && (
                    <div className="mt-4">
                        <h2 className="font-bold">Imagen generada:</h2>
                        <img src={imagenUrl} alt="Generada por IA" className="w-3/4" />
                    </div>
                )}
            </div> */}

            <div className='flex gap-5 w-3/4 mx-auto p-5'>

                {textoReescrito && (
                    <div className="mt-4 border p-4 rounded-lg bg-gray-100">
                        <h2 className="font-bold text-center text-lg mb-5">Artículo reescrito:</h2>
                        <p>{textoReescrito}</p>
                    </div>
                )}

                {textoIngles && (
                    <div className="mt-4 border p-4 rounded-lg bg-gray-100">
                        <h2 className="font-bold text-center text-lg mb-5">Traducción en inglés:</h2>
                        <p>{textoIngles}</p>
                    </div>
                )}

            </div>

        </>
    );
}

export default RedactorAI;