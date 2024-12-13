async function concurrentRequests() {
    const request1 = simulateApiCall();
    const request2 = simulateApiCall();

    try {
        const results = await Promise.all([request1, request2]);
        console.log("Résultats des requêtes:", results);
    } catch (error) {
        console.error("Erreur lors des requêtes simultanées:", error);
    }
}
