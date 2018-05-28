import _ from 'lodash';

export function capitalize(word) {
    let text = word;
    return text.substr(0,1).toUpperCase() + text.substr(1).toLowerCase();
}

export function whichPostAction(match, url) {
    let path = (match && match.path) ? match.path : url;
    switch (path) {
        case "/post/edit/:id": return "edit";
        case "/:category/:id": return "read";
        case "/post/create": return "create";
        default: return "loading";
    }
}

export function getMatchId(match) {
    return (match && match.params && typeof match.params.id !== 'undefined')
        ? match.params.id : "";
}

export function postCheck(posts, matchId) {
    return (posts && posts.all && typeof posts.all[matchId] !== 'undefined');
}

export function setCategoryTitle(categories, category) {
    let catTitle = " posts", baseTitle = "Welcome", catObj, nonTickerCat = ["all", "create"];

    if (!_.isUndefined(categories.categories) && !nonTickerCat.some(item => item !== nonTickerCat)) {
        catObj = Object.values(categories.categories).filter(item => item.ticker === category)[0];
        return (!_.isUndefined(catObj.name))
            ? capitalize(catObj.name) + catTitle
            : baseTitle;
    }
    return baseTitle;
}
