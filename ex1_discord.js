// Vérifier si deux intervalles se chevauchent
function checkOverlap(intervals) {
    // Trier les intervalles par leur point de départ
    intervals.sort((a, b) => a[0] - b[0]);

    // Vérifier si un intervalle chevauche un autre
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= intervals[i - 1][1]) {
            return "Les intervalles se chevauchent";
        }
    }
    return "Aucun chevauchement d'intervalles";
}

// Exemple d'utilisation
console.log(checkOverlap([[1, 5], [6, 10], [12, 15], [3, 7]])); // Chevauchement
console.log(checkOverlap([[1, 5], [6, 10], [12, 15]]));        // Pas de chevauchement







// Trouver la plus longue sous-chaîne avec au plus K caractères uniques

function longestSubstringKUnique(s, k) {
    if (k === 0) {
        return "Pas assez de caractères uniques dans la chaîne";
    }

    let start = 0;
    let maxLength = 0;
    let maxSubstring = "";
    let charMap = {};

    for (let end = 0; end < s.length; end++) {
        charMap[s[end]] = (charMap[s[end]] || 0) + 1;

        // Réduire la fenêtre si le nombre de caractères uniques dépasse K
        while (Object.keys(charMap).length > k) {
            charMap[s[start]]--;
            if (charMap[s[start]] === 0) {
                delete charMap[s[start]];
            }
            start++;
        }

        // Mettre à jour la longueur maximale et la sous-chaîne
        if (end - start + 1 > maxLength) {
            maxLength = end - start + 1;
            maxSubstring = s.slice(start, end + 1);
        }
    }

    if (Object.keys(charMap).length <= k) {
        return `La plus longue sous-chaîne avec ${k} caractères uniques est : ${maxSubstring} avec une longueur de ${maxLength}`;
    }
    return "Pas assez de caractères uniques dans la chaîne";
}

// Exemple d'utilisation
console.log(longestSubstringKUnique("aabbaacdeeeeddded", 3));
console.log(longestSubstringKUnique("abcddefabc", 4));
console.log(longestSubstringKUnique("aaaabbbb", 4));






// Trouver deux éléments dont la somme est la plus proche de zéro
function closestSumToZero(arr) {
    arr.sort((a, b) => a - b);
    let left = 0;
    let right = arr.length - 1;
    let closestSum = Infinity;

    while (left < right) {
        let currentSum = arr[left] + arr[right];
        if (Math.abs(currentSum) < Math.abs(closestSum)) {
            closestSum = currentSum;
        }

        if (currentSum < 0) {
            left++;
        } else if (currentSum > 0) {
            right--;
        } else {
            break;
        }
    }

    return `Somme la plus proche de zéro dans le tableau est : ${closestSum}`;
}

// Exemple d'utilisation
console.log(closestSumToZero([1, 4, -5, 3, -2, 10, -6, 20]));
console.log(closestSumToZero([-5, 5]));
console.log(closestSumToZero([5, 8]));
console.log(closestSumToZero([-5, -5]));





// Compter les lettres, les chiffres, les séparateurs et les autres caractères dans une phrase



function isSeparator(d) {
    return ' ,;.!?'.includes(d);
}

function isLetter(d) {
    return /[a-zA-Z]/.test(d);
}

function isDigit(d) {
    return /\d/.test(d);
}

function countCharacters(sentence) {
    let letterCount = 0;
    let digitCount = 0;
    let separatorCount = 0;
    let otherCount = 0;

    for (let char of sentence) {
        if (char === '#') {
            break;
        } else if (isLetter(char)) {
            letterCount++;
        } else if (isDigit(char)) {
            digitCount++;
        } else if (isSeparator(char)) {
            separatorCount++;
        } else {
            otherCount++;
        }
    }

    return `Lettres: ${letterCount}, Chiffres: ${digitCount}, Séparateurs: ${separatorCount}, Autres caractères: ${otherCount}`;
}

// Exemple d'utilisation
let sentence = "Hello, world! 123#";
console.log(countCharacters(sentence));
