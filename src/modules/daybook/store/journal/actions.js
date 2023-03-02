import journalApi from "@/api/journalApi"

export const loadEntries = async( {commit} ) => {
    //peticion axios 
    const {data} = await journalApi.get('/entries.json')
    //console.log(data);

    //si la data es nula 
    if(!data){
        commit('setEntries',[])
        return
    }
    const entries = []

    //Object.keys es propio de js
    for (let id of Object.keys(data)){
        entries.push({
            id,
            ...data[id]
        })
    }

    //console.log(entries);

    commit('setEntries', entries)
}

export const updateEntry = async( {commit}, entry)  => { //entry debe ser parametro

    //console.log(entry,'actions');
    
    //extraer solo lo que se necesita 
    const {date,picture,text} = entry

    const dataToSave = {date,picture,text}

    //hacer peticion await del journal 
    const resp = await journalApi.put(`/entries/${entry.id}.json`, dataToSave)

    dataToSave.id = entry.id
    //commut mutasion update entry
                        //uso del spread para evitar que el objeto se pase por referencia
    commit('updateEntry', {...dataToSave})
}

export const createEntry = async( {commit}, entry) => {

    const {date,picture,text} = entry
    const dataToSave = {date,picture,text}

    const {data} = await journalApi.post('/entries.json', dataToSave)

    dataToSave.id = data.name

    commit('addEntry',dataToSave)

    return data.name

}

export const deleteEntry = async ({commit}, id) =>{


     await journalApi.delete(`/entries/${id}.json`)

     commit('deleteEntry',id)

     return id 
}