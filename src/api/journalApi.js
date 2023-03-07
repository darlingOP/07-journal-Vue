import axios from "axios"

const journalApi = axios.create({
    baseURL:'https://vue-journal-demo-efb0f-default-rtdb.firebaseio.com'
})

//esto se ejecuta cuando se intercepte un peticion http que use mi estancia de axios
journalApi.interceptors.request.use((config) =>{

    config.params = {
        auth: localStorage.getItem('idToken')
    }


    return config

})   


    
export default journalApi