import {apiFetch} from './api';

export const apiGetPostsAll = (vals = {action: "post", type: "all"}) => {
    return apiFetch(vals).then((res) => res);
}
