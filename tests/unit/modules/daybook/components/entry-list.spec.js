import { shallowMount } from "@vue/test-utils";
import journal from "@/modules/daybook/store/journal";
import EntryList from '@/modules/daybook/components/EntryList'
import { journalState } from "../../../mock-data/test-journal-state";
import { createStore } from "vuex";

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

describe('Pruebas en el EntryList Component', () => {
    
    const store = createVuexStore(journalState)

    const mockRouter ={
        push:jest.fn()
    }
    
    let wrapper
    
    beforeEach(() =>{

        jest.clearAllMocks()

        wrapper = shallowMount(EntryList,{
            global:{
                mocks:{
                    $router: mockRouter
                },
                plugins:[store]
            },
            
        })
    })
    

    test('debe de llamar el getEntriesByTerm sin termino y mostrar dos entradas', () => {
        //console.log(wrapper.html());
        expect(wrapper.findAll('entry-stub').length).toBe(2)
    });

    test('debe de llamar el getEntriesByTerm y filtrar las entradas', async () => {
         const input = wrapper.find('input')
         await input.setValue('Hola')

         expect(wrapper.findAll('entry-stub').length).toBe(1)

    });

    test('el boton de nuevo debe de redireccionar a /new', () => {
        

        wrapper.find('button').trigger('click')

        expect(mockRouter.push)
            .toHaveBeenCalledWith({name:'entry', params:{id:'new'}})
    });

    
});