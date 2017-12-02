export function capitalize(word) {
    let text = word;
    return text.substr(0,1).toUpperCase() + text.substr(1).toLowerCase();
}

export function whichPostAction(match) {
    if (match === undefined && match.path === undefined) { return "create"; }
    switch (match.path) {
        case "/post/edit/:id": return "edit";
        case "/post/:id": return "read";
        case "/post/create": return "create";
        default: return "create";
    }
}

export function getMatchId(match) {
    console.log("getMatchId :: match: ", match);
    // console.log("getMatchId :: match.params.id: ", match.params.id);
    return (match && match.params && typeof match.params.id !== 'undefined')
        ? match.params.id : "";
}

export function postCheck(posts, matchId) {
    return (posts && posts.all && typeof posts.all[matchId] !== 'undefined');
}