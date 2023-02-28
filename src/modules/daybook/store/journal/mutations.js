
export const setEntries = ( state, entries ) =>{

    //desestructuracion con el operador spread
    //se crea un arreglo con los valores anteriores con los valores nuevos
    state.entries = [...state.entries, ...entries]
    state.isLoading = false
}

export const updateEntry = (state, entry) =>{ //entrada actualizada

    // state. entries => un arreglo ...
    const idx = state.entries.map(e => e.id).indexOf(entry.id)

    //state.entries = ...entry
    state.entries[idx] = entry
}

export const addEntry = (state, entry) =>{

    //se coloca al inicio la nueva entrada y todas las demas van despues
    state.entries = [entry, ...state.entries]
}

export const deleteEntry = (state, id) =>{

    state.entries = state.entries.filter(e => e.id !== id)

}

