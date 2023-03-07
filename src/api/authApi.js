import axios from "axios"

const authApi = axios.create({
    baseURL:'https://identitytoolkit.googleapis.com/v1/accounts',
    params:{
        key:'AIzaSyBoMAD78tvNwNwMIzpHkl07tBxvUdXKe30'
    }
})

export default authApi