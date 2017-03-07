export function setConfig(config){
    window.sessionStorage.setItem("config", JSON.stringify(config));
}
export function getConfig(){
    var config = window.sessionStorage.getItem("config");
    return JSON.parse(config);
}
export function setUser(user){
    window.sessionStorage.setItem("user", JSON.stringify(user));
}// setAccessToken
export function getUser(){
    var config = window.sessionStorage.getItem("user");
    return JSON.parse(config);
}
export function clearSession(){
    var config = getConfig();
    // delete all session  accept the configuration!
    window.sessionStorage.clear();
    setConfig(config);
}
export function setAccessToken(token){
    window.sessionStorage.setItem("token", JSON.stringify(token));
}
export function getAccessToken(){
    var token = window.sessionStorage.getItem("token");
    return JSON.parse(token);
}
