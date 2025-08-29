import { useState } from 'react';

const API_BASE = 'https://redaction-ai.onrender.com';

function RedactorAI() {
    // Reescritura
    const [textoOriginal, setTextoOriginal] = useState('');
    const [titles, setTitles] = useState('');
    const [resumen, setResumen] = useState('');
    const [textoReescrito, setTextoReescrito] = useState('');
    // Traducción
    const [textoIngles, setTextoIngles] = useState('');
    const [titles_en, setTitlesEn] = useState('');
    const [resumen_en, setResumenEn] = useState('');
    // Resumir para Redes Sociales
    const [resumen_ig, setResumenIG] = useState('');
    const [resumen_twitter, setResumenTwitter] = useState('');
    // const [imagenUrl, setImagenUrl] = useState('');
    // Cargando estados
    const [loadingReescribir, setLoadingReescribir] = useState(false);
    const [loadingTraducir, setLoadingTraducir] = useState(false);
    const [loadingResumenIG, setLoadingResumenIG] = useState(false);
    const [loadingResumenTwitter, setLoadingResumenTwitter] = useState(false);


    const manejarReset = () => {
        setLoadingReescribir(true);
        setTextoOriginal("");
        setTextoReescrito("")// Resetea el texto
        setTextoIngles("");
        setTitles("");
        setTitlesEn("");
        setResumenIG("")
        setResumenTwitter("")
        setResumen("");
        setResumenEn("");
        setTimeout(() => setLoadingReescribir(false), 500); // Simulación de tiempo de espera
    };

    const copiarAlPortapapeles = (texto: string) => {
        if (!texto) return;
        navigator.clipboard.writeText(texto)
            .then(() => alert("Texto copiado!"))
            .catch(() => alert("Error al copiar"));
    };

    const handleReescribir = async () => {
        setLoadingReescribir(true);
        try {
            // 1. Reescribir
            const res1 = await fetch(`${API_BASE}/reescribir`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto: textoOriginal }),
            });
            const data1 = await res1.json();
            const titles = data1.titulos;
            const resumen = data1.resumen;
            const reescrito = data1.resultado;
            setTitles(titles);
            setResumen(resumen);
            setTextoReescrito(reescrito);
        } catch (error) {
            console.error('Error en el proceso:', error);
        } finally {
            setLoadingReescribir(false);
        }
    };

    const handleTraducir = async () => {
        setLoadingTraducir(true);
        try {
            const res = await fetch(`${API_BASE}/traducir`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    texto: textoReescrito,
                    titulos: Array.isArray(titles) ? titles.join("\n") : titles,
                    resumen: resumen,
                }),
            });
            const data = await res.json();
            const enIngles = data.resultado;
            const titles_en = data.titles_en;
            const resumen_en = data.resumen_en;
            setTitlesEn(titles_en);
            setResumenEn(resumen_en);
            setTextoIngles(enIngles);
        } catch (error) {
            console.error('Error en la traducción:', error);
        } finally {
            setLoadingTraducir(false);
        }
    }

    const handleResumeIG = async () => {
        setLoadingResumenIG(true);
        try {
            const res = await fetch(`${API_BASE}/resumeIG`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    texto: textoOriginal,
                }),
            });
            const data = await res.json();
            const resumen_ig = data.resume_ig;
            setResumenIG(resumen_ig)

        } catch (error) {
            console.error('Error en la traducción:', error);
        } finally {
            setLoadingResumenIG(false);
        }
    }

    const handleResumeTwitter = async () => {
        setLoadingResumenTwitter(true);
        try {
            const res = await fetch(`${API_BASE}/resumeTwitter`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    texto: textoOriginal,
                }),
            });
            const data = await res.json()
            const resumen_twitter = data.resume_twitter;
            setResumenTwitter(resumen_twitter)

        } catch (error) {
            console.error('Error en la traducción:', error);
        } finally {
            setLoadingResumenTwitter(false);
        }
    }
    // 3. Crear imagen
    // const res3 = await fetch(`${API_BASE}/create-image`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ prompt: enIngles }),
    // });
    // const data3 = await res3.json();
    // setImagenUrl(data3.imagen);

    return (

        <>
            <h1 className='text-center p-8'>Redactor con Inteligencia Artificial</h1>

            <div className="p-4 mx-auto max-w-3xl">
                <textarea
                    value={textoOriginal}
                    onChange={(e) => setTextoOriginal(e.target.value)}
                    placeholder="Pegá aquí tu artículo original..."
                    className="w-full h-40 p-2 border mb-4"
                />

                <div className='flex gap-5 justify-center'>

                    <button
                        onClick={handleReescribir}
                        disabled={loadingReescribir}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                    >
                        {loadingReescribir ? 'Procesando...' : 'Reescribir Artículo'}
                    </button>

                    <button
                        onClick={handleTraducir}
                        disabled={loadingTraducir}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                    >
                        {loadingTraducir ? 'Procesando...' : 'Traducir al Inglés'}
                    </button>

                    <button
                        onClick={handleResumeIG}
                        disabled={loadingResumenIG}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                    >
                        {loadingResumenIG ? 'Procesando...' : 'Resumen para Instagram'}
                    </button>

                    <button
                        onClick={handleResumeTwitter}
                        disabled={loadingResumenTwitter}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                    >
                        {loadingResumenTwitter ? 'Procesando...' : 'Resumen para Twitter'}
                    </button>

                    <button
                        disabled={loadingReescribir}
                        className={`px-4 py-2 rounded hover:bg-gray-700 ${loadingReescribir
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

                {(titles || resumen || textoReescrito) && (
                    <div className='flex flex-col gap-5 w-full'>
                        {titles && (
                            <div className="mt-4 border p-4 rounded-lg bg-gray-100">
                                <h2 className="font-bold text-center text-lg mb-5">Títulos en Español:</h2>
                                <ol className="pl-5">
                                    {titles.split('\n').map((title, index) => (
                                        <li key={index} className="mb-2 border-2 border-gray-600 rounded p-2">{title}</li>
                                    ))}
                                </ol>
                            </div>
                        )}

                        {resumen && (
                            <div className="mt-4 border p-4 rounded-lg bg-gray-100">
                                <h2 className="font-bold text-center text-lg mb-5">Resumen en Español:</h2>
                                <ul className='pl-5'>
                                    {resumen.split('\n').map((resumen, index) => (
                                        <li key={index} className="mb-2 list-disc">{resumen}</li>
                                    ))}
                                </ul>
                                <div className='text-center'>
                                    <button
                                        onClick={() => copiarAlPortapapeles(resumen)}
                                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Copiar resumen
                                    </button>
                                </div>

                            </div>
                        )}

                        {textoReescrito && (
                            <div className="mt-4 border p-4 rounded-lg bg-gray-100">
                                <h2 className="font-bold text-center text-lg mb-5">Artículo en Español:</h2>
                                <p>{textoReescrito}</p>
                                <div className="text-center">
                                    <button
                                        onClick={() => copiarAlPortapapeles(textoReescrito)}
                                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Copiar texto
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}


                {(titles_en || resumen_en || textoIngles) && (
                    <div className='flex flex-col gap-5 w-full'>
                        {titles_en && (
                            <div className="mt-4 border p-4 rounded-lg bg-gray-100">
                                <h2 className="font-bold text-center text-lg mb-5">Titulos en Ingles:</h2>
                                <ul className="pl-5">
                                    {titles_en.split('\n').map((title_en, index) => (
                                        <li key={index} className="mb-2 border-2 border-gray-600 rounded p-2">{title_en}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {resumen_en && (
                            <div className="mt-4 border p-4 rounded-lg bg-gray-100">
                                <h2 className="font-bold text-center text-lg mb-5">Resumen en inglés:</h2>
                                <ul className='pl-5'>
                                    {resumen_en.split('\n').map((resumen_en, index) => (
                                        <li key={index} className="mb-2 list-disc">{resumen_en}</li>
                                    ))}
                                </ul>

                                <div className='text-center'>
                                    <button
                                        onClick={() => copiarAlPortapapeles(resumen_en)}
                                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Copiar resumen
                                    </button>
                                </div>
                            </div>
                        )}

                        {textoIngles && (
                            <div className="mt-4 border p-4 rounded-lg bg-gray-100">
                                <h2 className="font-bold text-center text-lg mb-5">Artículo en inglés:</h2>
                                <p>{textoIngles}</p>
                                <div className='text-center'>
                                    <button
                                        onClick={() => copiarAlPortapapeles(textoIngles)}
                                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Copiar texto
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                )}

                {(resumen_ig || resumen_twitter) && (
                    <div className='flex flex-col gap-5 w-full'>
                        {resumen_ig && (
                            <div className="mt-4 border p-4 rounded-lg bg-gray-100">
                                <h2 className="font-bold text-center text-lg mb-5">Artículo para Instagram:</h2>
                                <p>{resumen_ig}</p>
                                <div className='text-center'>
                                    <button
                                        onClick={() => copiarAlPortapapeles(resumen_ig)}
                                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Copiar texto
                                    </button>
                                </div>
                            </div>
                        )}

                        {resumen_twitter && (
                            <div className="mt-4 border p-4 rounded-lg bg-gray-100">
                                <h2 className="font-bold text-center text-lg mb-5">Artículo para Twitter:</h2>
                                <ul>
                                    {resumen_twitter.split(/(\d️⃣)/).map((resumen_x, index) => (
                                        <li key={index} className="mb-2">{resumen_x}</li>
                                    ))}

                                </ul>
                                <div className='text-center'>
                                    <button
                                        onClick={() => copiarAlPortapapeles(resumen_twitter)}
                                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Copiar texto
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div >
        </>
    );
}

export default RedactorAI;