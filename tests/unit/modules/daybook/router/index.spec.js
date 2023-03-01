import daybookrouter from '@/modules/daybook/router'

describe('Pruebas en el router module del daybook', () => {
    
    test('el router debe tener esta configuracion', async () => {
        
        //comprobar que el index.js de mi modulo concuerde con el objeto que tengo aqui
        //mas que nada que concuerden los nombres asignados a las rutas

        expect(daybookrouter).toMatchObject({
            name:'daybook',
            component: expect.any(Function), //espera cualquier funcion del lado del index a evaluar
            children:[
                {
                    path:'',
                    name:'no-entry',
                    component: expect.any(Function),
                },
                {
                    path:':id',
                    name:'entry',
                    component: expect.any(Function),
                    props: expect.any(Function)
                }
            ]
        })


        const promiseRoutes=[ ]
        daybookrouter.children.forEach(child => promiseRoutes.push(child.component()))

        const routes = (await Promise.all(promiseRoutes)).map(r => r.default.name)

        //console.log(routes);

        expect(routes).toContain('EntryView')
        expect(routes).toContain('NoEntrySelected')

        
    });

    test('debe de retornar el id de la ruta', () => {
        
        const route = {
            params:{
                id:'ABC-123'
            }
        }

        //console.log(daybookrouter.children[1].props(route));
       
        // MUY RIGIDO: expect(daybookrouter.children[1].props(route)).toEqual({ id: 'ABC-123' })

        const entryRoute = daybookrouter.children.find(route => route.name === 'entry')
        //console.log(entryRoute);
        expect(entryRoute.props(route)).toEqual({ id: 'ABC-123' })
    });

    
});