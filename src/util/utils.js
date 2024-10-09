function toCamelCase(input) {
    return input
        .toLowerCase()
        .split(/[-.]/)  // Divide el nombre en palabras usando - y . como separadores
        .map((word, index) => index === 0 ? word : capitalizeFirstLetter(word))
        .join('');
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {toCamelCase, capitalizeFirstLetter}