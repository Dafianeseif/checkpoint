function RankFirstPositf(E, index = 0) {
    if (index >= E.length) return -1;

    if (E[index] > 0) {
        return `L'élément trouvé est ${E[index]} à l'indice ${index}`;
    }

    return RankFirstPositf(E, index + 1);
}


const E = [1, 28, -2, 5, 4, -9, 0, 8, -2, 0];
console.log(RankFirstPositf(E));  
