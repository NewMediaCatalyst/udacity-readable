export function capitalize(word) {
    let text = word;
    return text.substr(0,1).toUpperCase() + text.substr(1).toLowerCase();
}