import { shallowMount } from "@vue/test-utils"
import { createStore } from "vuex"
import {journalState} from '../../../mock-data/test-journal-state'

import Swal from 'sweetalert2'

import EntryView from '@/modules/daybook/views/EntryView'
import journal from "@/modules/daybook/store/journal"

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
    
    jest.mock('sweetalert2',() =>({
        fire:jest.fn(),
        showLoading:jest.fn(),
        close:jest.fn()
    }))

describe('pruebas en el EntryView Component', () => {

    const store = createVuexStore(journalState)
    store.dispatch = jest.fn()

    const mockRouter ={
        push:jest.fn()
    }
    
    let wrapper
    
    beforeEach(() =>{

        jest.clearAllMocks()

        wrapper = shallowMount(EntryView,{
            props:{
                id: '-NPOBHZzviGrfCNWtPlq'
            },
            global:{
                mocks:{
                    $router: mockRouter
                },
                plugins:[store]
            },
            
        })
    })


    test('debe sacar al usuario si el id no existe', () => {
       
        const wrapper = shallowMount(EntryView,{
            props:{
                id:'este ID no existe en el store'
            },
            global:{
                mocks:{
                    $router: mockRouter
                },
                plugins:[store]
            },
        })

        //console.log(mockRouter);
        expect(mockRouter.push).toHaveBeenCalledWith({name:'no-entry'})
    }); 

    test('debe de mostrar la entrada correctamente', () => {
        
        expect(wrapper.html()).toMatchSnapshot()

        expect(mockRouter.push).not.toHaveBeenCalled()
    });

    test('debe de borrar la entrada y salir', async () => {
        
        Swal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed:true}))

        await wrapper.find('.btn-danger').trigger('click')

        
        expect(Swal.fire).toHaveBeenCalledWith({
            title: '¿Está seguro?',
            text: 'Una vez borrado, no se puede recuperar',
            showDenyButton: true,
            confirmButtonText: 'Si, estoy seguro'
        }) 

        expect(store.dispatch).toHaveBeenCalledWith("journal/deleteEntry", "-NPOBHZzviGrfCNWtPlq")
        
        //expect(mockRouter.push).toHaveBeenCalled()


        
        



    });
});