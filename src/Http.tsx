import { global } from "@/Utils";
import {DefRes} from "@/types";
const parseUrl = (url: string, params?: any) => {
    let queryStr = "";
    if (params) {
        Object.keys(params).forEach(e => {
            queryStr += `&${e}=${params[e]}`;
        })
    }
    if (url.indexOf("http") != 0) {
        let _url = global.APIHost + url + (url.indexOf("?") == -1 ? queryStr.replace("&", "?") : queryStr)
        return _url;
    } else {
        let _url = url + (url.indexOf("?") == -1 ? queryStr.replace("&", "?") : queryStr)
        return _url;
    }
}
const success = async (res: Response): Promise<DefRes> => {
    let json: any = await res.json();
    if (json && json.code == 0) {
        return {
            code: json.code as number,
            message: json.message as string,
            result: json.result,
        };
    } else {
        console.error(json)
        return { code: 999, message: "服务开小差" };
    }
}
const defaultHeaders = {
    "Content-Type": "application/json",
    "app_id": "101",
    "scenes": "10131",
    "version": "600016",
    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMDEiLCJleHAiOjE2OTU2ODg3MjQsImlhdCI6MTY5NTA4MzkyNCwiaXNzIjoiY29tLmludGJlZS51YyIsInN1YiI6IjYzMDZlMzc3NzU4NTI1MjNhZmRmY2M2NCIsImp0aSI6ImVGQUU4bzZ1X3FwMG4tcnBYYWhOeXc9PSIsImFwcGlkIjoiMTAxIiwiYXV0aF9tb2RlIjoicmVmcmVzaCIsImF1dGhfaWQiOiI2MzA2ZTM3Nzc1ODUyNTIzYWZkZmNjNjQifQ.S2Z2IDPZJdr0DIK-T7zguGDCgc1suiA002PT80KjqNk"
}
export default {
    post: (url: string, data?: object, headers?: object) => {
        return fetch(parseUrl(url), {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                // "access_token": global.user?.accessToken || "",
                ...defaultHeaders,
                ...headers
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(success);
    },
    get: (url: string, data?: object, headers?: object) => {
        return fetch(parseUrl(url, data), {
            method: 'GET',
            headers: {
                // "access_token": global.user?.accessToken || "",
                ...defaultHeaders,
                ...headers
            },
        }).then(success);
    },
    put: (url: string, data?: object, headers?: object) => {
        return fetch(parseUrl(url), {
            method: 'PUT',
            headers: {
                // "access_token": global.user?.accessToken || "",
                ...defaultHeaders,
                ...headers
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(success);
    },
    delete: (url: string, data?: object, headers?: object) => {
        return fetch(parseUrl(url), {
            method: 'DELETE',
            headers: {
                // "access_token": global.user?.accessToken || "",
                ...defaultHeaders,
                ...headers
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(success);
    },
}