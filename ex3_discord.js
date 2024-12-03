function RankLastPositf(E , index=E.length-1) {
    
        if (index < 0) return -1;

        if (E[index] > 0) {
            return `L'élément trouvé est ${E[index]} = index ${index}`;
        }

        return RankLastPositf(E,index - 1);
    }



const E = [1, 28, -2, 5, 4, -9, 0, 8, -2, 0];
console.log(RankLastPositf(E)); 