// type:    category, post, comment;
// action:  all, byCat, add, get, vote, edit, delete
function setVals(vals) {
    // constants
    const baseURL = 'http://172.16.0.9:3001';
    const hdrBase = {
        "Authorization": "arbitrary-string-1",
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    let {type, action, body} = vals,
        settings = {
            url: baseURL,
            hdr: { method: "", headers: new Headers(hdrBase)},
        };
    if (body) { settings.body = body; }

    if (action === "category") { // only 1 api type for categories
        settings.url += "/categories"; settings.hdr.method = 'GET';

    } else if (action === "post") {
        switch (type) {
            case "all":    // get all posts
                settings.url += "/posts"; settings.hdr.method = 'GET'; break;
            case "byCat":  // get all posts by a category
                settings.url += `/${body.category}/posts`; settings.hdr.method = 'GET'; break;
            case "add":     // create a new post
                settings.url += "/posts"; settings.hdr.method = 'POST'; break;
            case "get":     // get single post
                settings.url += `/posts/${body.id}`; settings.hdr.method = 'GET'; break;
            case "vote":     // vote on a post; string: "upVote", "downVote"
                settings.url += `/posts/${body.id}`; settings.hdr.method = 'POST'; break;
            case "edit":     // edit a post
                settings.url += `/posts/${body.id}`; settings.hdr.method = 'PUT'; break;
            case "delete":  // delete a post
                settings.url += `/posts/${body.id}`; settings.hdr.method = 'DELETE'; break;
            default:
                console.log("action:post :: didnt find type");
        }

    } else if (action === "comment") {
        switch (type) {
            case "all":     // get all comments for a post
                settings.url += `/posts/${body.id}/comments`; settings.hdr.method = 'GET'; break;
            case "add":     // add comment to post
                settings.url += `/comments`; settings.hdr.method = 'POST'; break;
            case "get":     // get single comment
                settings.url += `/comments/${body.id}`; settings.hdr.method = 'GET'; break;
            case "vote":    // vote on a comment; string: "upVote", "downVote"
                settings.url += `/comments/${body.id}`; settings.hdr.method = 'POST'; break;
            case "edit":    // edit a comment
                settings.url += `/comments/${body.id}`; settings.hdr.method = 'PUT'; break;
            case "delete":  // delete a comment
                settings.url += `/comments/${body.id}`; settings.hdr.method = 'DELETE'; break;
            default:
                console.log("action:comment :: didnt find type");
        }
    }

    return settings;
}

export function apiFetch(vals) { // vals: {action:'post', type: 'get', etc}
    let settings = setVals(vals), {url, hdr} = settings;

    return fetch(url, hdr).then(function (res) {
            let json = res.json();
            console.log("apiFetch :: " + vals.type + ":" + vals.action + " :: ", json);
            return json;
        })
        .catch((err) => console.log("apiFetch :: " + vals.type + ":" + vals.action + " :: ERROR: ", err));
}

export const getCatAll = (vals = {action: "category", type: "all"}) => {
    return apiFetch(vals).then((res) => res);
}


