
import 'setimmediate'
import cloudinary from 'cloudinary'
import axios from "axios";
import uploadImage from "@/modules/daybook/helpers/uploadImage";


cloudinary.config({
    cloud_name:'dgkfe6tqs',
    api_key:'163474398896389',
    api_secret:'EGpLMnvFDfQCAXtqmG8kidOU-pc'
})


describe('pruebas del uploadImage', () => {
    
    //en este test si se sube la imagen a cloudinary.com
    test('debe de cargar un archivo y retornar el url', async () => {
        
       const {data} = await axios.get('https://res.cloudinary.com/dgkfe6tqs/image/upload/v1677609896/cld-sample-4.jpg',{
            responseType:'arraybuffer'
        })

        const file = new File([data], 'foto.jpg')

        const image = await uploadImage(file)

        expect(typeof image.secure_url).toBe('string')


        //Limpieza de archivos subidos despues de pruebas


       await cloudinary.v2.api.delete_resources([image.public_id])



    });
});