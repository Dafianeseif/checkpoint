async function awaitCall() {
    try {
        const data = await simulateApiCall(); 
        console.log("Données reçues:", data);
    } catch (error) {
        console.error("Erreur lors de l'appel API:", error);
    }
}

function simulateApiCall() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve({ message: "Succès!" });
            } else {
                reject(new Error("Échec de l'API"));
            }
        }, 1000);
    });
}