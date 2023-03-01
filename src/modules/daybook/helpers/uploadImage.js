import axios from 'axios'


//funcion para subir imagen a la base mediante url
const uploadImage = async (file) =>{
    if(!file) return

    try {
        
        //FormData ya es propio de js, se prepara para subir la imagen
        const formData = new FormData()
        formData.append('upload_preset','curso-vue') //uploat_preset de cloudinary
        formData.append('file',file) //el archivo (imagen) que se quiere subir

        const url = 'https://api.cloudinary.com/v1_1/dgkfe6tqs/image/upload'
        //el axios .post recibe el url para la peticion asi como el formData preparado anteriormente
        const {data} = await axios.post(url,formData)
        console.log(data);

        return data

    } catch (error) {
        console.log('error al cargar la imagen,revisar logs');
        console.log(error);
        return null
    }
}

export default uploadImage