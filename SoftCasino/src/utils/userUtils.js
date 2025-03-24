export function getToken(){
    return JSON.parse(localStorage.getItem("user"))?.token || ""
}

export function logOutUser(){
    localStorage.removeItem("user");
}