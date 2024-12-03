document.addEventListener('DOMContentLoaded', () => {
    const colorBox = document.getElementById('color-box');
    const changeColorBtn = document.getElementById('change-color-btn');

    function getRandomColor() {
        
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return randomColor;
    }

    changeColorBtn.addEventListener('click', () => {
        const newColor = getRandomColor();
        colorBox.style.backgroundColor = newColor;
    });
});
