import axios from "axios"

const journalApi = axios.create({
    baseURL:'https://vue-journal-demo-efb0f-default-rtdb.firebaseio.com'
})

export default journalApi