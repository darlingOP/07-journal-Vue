import { shallowMount } from "@vue/test-utils";
import AboutView from '@/views/AboutView'

describe('pruebas en el About View', () =>{
  test('debe concordar con el snapshot', () => {
    
    const wrapper = shallowMount(AboutView)

    expect(wrapper.html()).toMatchSnapshot()
  });  
})