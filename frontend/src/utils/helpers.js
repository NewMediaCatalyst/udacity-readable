export function capitalize(word) {
    let text = word;
    return text.substr(0,1).toUpperCase() + text.substr(1).toLowerCase();
}

export function whichPostAction(match) {
    if (match === undefined && match.path === undefined) { return "read"; }
    switch (match.path) {
        case "/post/edit/:id": return "edit";
        case "/post/create": return "create";
        default: return "read";
    }
}