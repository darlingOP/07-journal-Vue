import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";
import { journalState } from "../../../../mock-data/test-journal-state";

const createVuexStore = (initialState) => 
    createStore({
        modules:{
            journal:{
                //se desestructura para poder mandarle un estado inicial en caso de quererlo de cierta manera
                ...journal,
                state:{...initialState}
            }
        }
    })  



describe('vuex - pruebas en el journal module', () => {
    
    //basicas
    test('este es el estado inicial, debe tener este state', () => {
        
        const store = createVuexStore(journalState)

        //console.log(store.state);

        const {isLoading, entries} = store.state.journal

        expect(isLoading).toBeFalsy
        expect(entries).toEqual(journalState.entries)
    });

    //mutations
    test('mutations: setEntries', () => {
        
        const store = createVuexStore({ isLoading:true, entries:[] })

        //commit dispara las mutations
        store.commit('journal/setEntries',journalState.entries)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()
    });

    test('mutation: updateEntry', () => {
        
        //create store con entries
        const store = createVuexStore(journalState)
        
        const updatedEntry = {
            id: '-NPOBHZzviGrfCNWtPlq',
            date:1677607369360,
            text:'Aprendiendo Vue actualizado'
         }

        
        //commit de la mutacion
         store.commit('journal/updateEntry', updatedEntry)
        //expect
        //entries.length = 2
        expect(store.state.journal.entries.length).toBe(2)
        //entries tiene que existir el updatedEntry con toEqual
        expect(store.state.journal.entries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)
    });

    test('mutation: addEntry and deleteEntry', () => {
        
        const store = createVuexStore(journalState)
        
        //addEntry
        store.commit('journal/addEntry',{id:'ABC-123', text:'Hola mundo'})
        //console.log(store.state.journal.entries);
        expect(store.state.journal.entries.length).toBe(3)
        //existe la nueva entrada
        //expect(store.state.journal.entries.find(e => e.id === 'ABC-123')).toEqual({id:'ABC-123', text:'Hola mundo'})
        expect(store.state.journal.entries.find(e => e.id === 'ABC-123')).toBeTruthy()
        
        //deleteEntry
        store.commit('journal/deleteEntry', 'ABC-123')
        //console.log(store.state.journal.entries);
        expect(store.state.journal.entries.length).toBe(2)
        //ya no existe la entrada eliminada
        expect(store.state.journal.entries.find(e => e.id === 'ABC-123')).toBeFalsy()

        
    });
    
    //getters: ====================================
    
    test('getters: getEntriesByTerm and getEntryById', () => {
        
        const store = createVuexStore(journalState)

        const [entry1,entry2] = journalState.entries

        //getEntryByTerm
        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('Hola').length).toBe(1)
        expect(store.getters['journal/getEntriesByTerm']('Hola')).toEqual([entry2])
        
        
        //getEntryByTerm
        
        expect(store.getters['journal/getEntryById']('-NPOBHZzviGrfCNWtPlq')).toEqual(entry1)
        
    });

    // Actions ==========================================

    test('actions: loadEntries', async () => {
        
        const store = createVuexStore({ isLoading:true, entries:[] })

        await store.dispatch('journal/loadEntries')

        expect(store.state.journal.entries.length).toBe(2)
        
    });
    
    test('actions: updateEntry', async () => {
        
        const store = createVuexStore(journalState)
        
        const updatedEntry = {
            id: '-NPOBHZzviGrfCNWtPlq',
            date:1677607369360,
            text:'Aprendiendo Vue',
            author:'Darling Olvera',
        }
        
        await store.dispatch('journal/updateEntry',updatedEntry)
        
        //console.log(store.state.journal.entries);

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === updatedEntry.id)).toEqual({
            id: '-NPOBHZzviGrfCNWtPlq',
            date:1677607369360,
            text:'Aprendiendo Vue', 
        })

    });

    test('actions: createEntry and deleteEntry', async () => {
        
        const store = createVuexStore(journalState)

        const newEntry ={
            date: 1677685157391,
            text:'nueva entrada desde las pruebas'
        }

       const entryId = await store.dispatch('journal/createEntry',newEntry)

       //se espera que el id recibido sea un string
        expect(typeof entryId).toBe('string')

        expect(
            store.state.journal.entries.find(e => e.id === entryId)
        ).toBeTruthy()

        
        await store.dispatch('journal/deleteEntry', entryId)

        expect(
            store.state.journal.entries.find(e => e.id === entryId)
        ).toBeFalsy()

    });



});