import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}


export function localStoreSetToken(token) {
  //return Cookies.set(TokenKey, token)
  return localStorage.setItem('my-Token', token);
}

export function localStoreGetToken(token) {
  return localStorage.getItem('my-Token');
}



export function removeToken() {
  return Cookies.remove(TokenKey)
}
