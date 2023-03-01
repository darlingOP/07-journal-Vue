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
});