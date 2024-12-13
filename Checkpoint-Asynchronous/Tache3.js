async function awaitCallWithErrorHandling() {
    try {
        const data = await simulateApiCall();
        console.log("Données reçues:", data);
    } catch (error) {
        console.error("Une erreur s'est produite: ", error.message);
    }
}