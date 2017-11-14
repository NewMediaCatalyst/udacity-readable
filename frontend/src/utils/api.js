// type:    category, post, comment;
// action:  all, byCat, add, get, vote, edit, delete
function setVals(vals) {
    // constants
    const baseURL = 'http://localhost:3001';
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

    // CATEGORIES
    if (action === "category") { // only 1 api type for categories
        settings.url += "/categories"; settings.hdr.method = 'GET';

    // POSTS
    } else if (action === "post") {
        switch (type) {
            case "all":    // get all posts
                settings.url += "/posts"; settings.hdr.method = 'GET'; break;
            case "byCat":  // get all posts by a category
                settings.url += `/${body.category}/posts`; settings.hdr.method = 'GET'; break;
            case "add":     // create a new post
                settings.url += "/posts";
                settings.hdr.method = 'POST';
                settings.hdr.body = JSON.stringify(body);
                break;
            case "get":     // get single post
                settings.url += `/posts/${body.id}`; settings.hdr.method = 'GET'; break;
            case "vote":     // vote on a post; string: "upVote", "downVote"
                settings.url += `/posts/${body.id}`;
                settings.hdr.method = 'POST';
                settings.hdr.body = JSON.stringify(body);
                break;
            case "edit":     // edit a post
                settings.url += `/posts/${body.id}`; settings.hdr.method = 'PUT'; break;
            case "delete":  // delete a post
                settings.url += `/posts/${body.id}`; settings.hdr.method = 'DELETE'; break;
            default:
                console.log("apiFetch :: " + vals.action + ":" + vals.type + " :: SWITCH didn't find type");
        }

    // COMMENTS
    } else if (action === "comment") {
        switch (type) {
            case "all":     // get all comments for a post
                settings.url += `/posts/${body.parentId}/comments`; settings.hdr.method = 'GET'; break;
            case "add":     // add comment to post
                settings.url += `/comments`; settings.hdr.method = 'POST'; break;
            case "get":     // get single comment
                settings.url += `/comments/${body.id}`; settings.hdr.method = 'GET'; break;
            case "vote":    // vote on a comment; string: "upVote", "downVote"
                settings.url += `/comments/${body.id}`;
                settings.hdr.method = 'POST';
                settings.hdr.body = JSON.stringify(body);
                break;
            case "edit":    // edit a comment
                settings.url += `/comments/${body.id}`;
                settings.hdr.body = JSON.stringify(body);
                settings.hdr.method = 'PUT';
                break;
            case "delete":  // delete a comment
                settings.url += `/comments/${body.id}`; settings.hdr.method = 'DELETE'; break;
            default:
                console.log("apiFetch :: " + vals.action + ":" + vals.type + " :: SWITCH didn't find type");
        }
    }

    if (action === "post" && type === "add") {
        console.log("setVals: settings: ", settings);
    }

    return settings;
}

export function apiFetch(vals) { // vals: {action:'post', type: 'get', etc}
    let settings = setVals(vals), {url, hdr} = settings;

    if (vals.action === "comment" && vals.type === "edit") {
        console.log("apiFetch :: settings: ", settings);
        console.log("apiFetch :: hdr: ", hdr);
    }


    return fetch(url, hdr).then(function (res) {
            let json = res.json();
            console.log("apiFetch :: " + vals.action + ":" + vals.type + " :: ", json);
            return json;
        })
        .catch((err) => console.log("apiFetch :: " + vals.action + ":" + vals.type + " :: ERROR: ", err));
}
