// Vérificateur d'année bissextile
function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return `${year} est une année bissextile.`;
    } else {
        return `${year} n'est pas une année bissextile.`;
    }
}


//Prix des billets de cinéma
function ticketPricing(age) {
    if (age <= 12) {
        return "Le prix du billet est de 10 $.";
    } else if (age >= 13 && age <= 17) {
        return "Le prix du billet est de 15 $.";
    } else {
        return "Le prix du billet est de 20 $.";
    }
}







// Séquence de Fibonacci
function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Vérificateur de palindrome
function isPalindrome(str) {
    // Nettoyer la chaîne
    str = str.toLowerCase().replace(/[^a-z0-9]/g, "");

    function helper(left, right) {
        if (left >= right) return true;
        if (str[left] !== str[right]) return false;
        return helper(left + 1, right - 1);
    }

    return helper(0, str.length - 1);
}
//Fonction de puissance
function power(base, exp) {
    if (exp === 0) return 1;
    return base * power(base, exp - 1);
}

// Exemple d'utilisation
console.log(power(2, 3)); // 8
console.log(power(5, 0)); // 1
console.log(power(3, 4)); // 81

