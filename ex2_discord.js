function findElement(A, a, b, index = 0) {


    if (index >= A.length) {
        return `Aucun élément trouvé`;
    }

    else if (A[index] >= a && A[index] <= b) {
        return `L'élément trouvé est A[${index}] = ${A[index]}`;
    }

    return findElement(A, a, b, index + 1);
}



const B = [3, 7, 8, 43 ,556];
console.log(findElement(B, 40, 50));