async function parallelCalls(urls) {
    const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));

    try {
        const results = await Promise.all(fetchPromises);
        console.log("Réponses des appels parallèles:", results);
    } catch (error) {
        console.error("Erreur lors des appels parallèles:", error);
    }
}