import MyAxios from '../axios/index'

const myAxios = new MyAxios({})

export function MySignIn(url, config) {
    return myAxios.get(url, config)
}


export function GetProductById(url, config) {
    return myAxios.get(url, config)
}
