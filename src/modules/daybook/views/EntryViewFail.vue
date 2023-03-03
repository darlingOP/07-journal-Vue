<template >
    <template v-if="entryState">
        <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">{{ day }}</span>
            <span class="mx-1 fs-3">{{ month }}</span>
            <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
            
        </div>
        <div>

            <!--Trabajar por referencia para manipularlo sin monstrarlo-->
            <input 
            type="file" 
            @change="onSelectedImg"
            ref="imgSelector"
            v-show="false"
            accept="image/png, image/jpeg">

            <button 
            v-if="entryState.id"
            class="btn btn-danger mx-2"
            @click="onDeleteEntry">
                <i class="fa fa-trash-alt"></i>
            </button>

            <button 
            class="btn btn-primary"
            @click="onSelectImg">
                subir foto
                <i class="fa fa-upload"></i>
            </button>
        </div>
        </div>
        <hr>
        <div class="d-flex flex-column px-3 h-75">
            <textarea 
            placeholder="What happened today?"
            v-model = "entryState.text"></textarea>
        </div>
    </template>
    
    <Fab
    icon ="fa-save"
    @on:click="saveEntry"/>

   
     <img v-if="entryState.picture && !localImg"
    :src="entryState.picture" 
    alt="entry-picture"
    class="img-thumbnail">

    <img 
    v-if="localImg"
    :src="localImg" 
    alt="entry-picture"
    class="img-thumbnail">
</template>

<script>
import {  defineAsyncComponent} from "vue";
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";

import getDayMonthYear from "../helpers/getDayMonthYear";
import uploadImage from "@/modules/daybook/helpers/uploadImage";
export default {
    name:'EntryView',
    props:{
        id:{
            type:String,
            required:true
        }
    },
    components:{
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    data(){
        return{
            entryState:null,
            localImg:null,
            file:null
        }
    },
    computed:{

        ...mapGetters('journal',['getEntryById']),

        day(){
            const {day} = getDayMonthYear(this.entryState.date)
            return day
        },
        month(){
            const {month} = getDayMonthYear(this.entryState.date)
            return month
        },
        yearDay(){
            const {yearDay} = getDayMonthYear(this.entryState.date)
            return yearDay
        }
    },
    methods: {
        loadEntry(){

            let entry

            if (this.id === 'new'){
                entry ={
                    text:'',
                    date: new Date().getTime()
                }
            }else{
                
                entry =this.getEntryById(this.id)
                
                //si no existe la entrada se redirecciona al usuario
                if(!entry) return this.$router.push({name: 'no-entry'})
    
            }
            //si existe
            this.entryState = entry
        },

        ...mapActions('journal',['updateEntry','createEntry','deleteEntry']),

        async saveEntry(){
            
            new Swal({
                title:'Espere por favor',
                allowOutsideClick:false,
            })

            Swal.showLoading()

           const picture = await uploadImage(this.file)
           this.entryState.picture = picture.secure_url

            if(this.entryState.id){
                //Actualizar
                await this.updateEntry(this.entryState)
            }else{
                // crear nueva entrada
                console.log('post nueva entrada');

               const id = await this.createEntry(this.entryState)

               //redirectTo para mostrar la nueva entrada creada
               this.$router.push({name:'entry', params:{id}})


            }
            
            this.file = null
            Swal.fire('Guardado','Entrada registrada con exito','success')
        },

        async onDeleteEntry(){
            
            const {isConfirmed} = await Swal.fire({
                title:'¿Estás seguro?',
                text:'Una vez borrado no se puede recuperar',
                showDenyButton:true,
                confirmButtonText:'Sí, estoy seguro'
            })

            if(isConfirmed){
                new Swal({
                    title:'Espere por favor',
                    allowOutsideClick:false
                })

                Swal.showLoading()
                await this.deleteEntry(this.entryState.id)
                this.$router.push({name:'no-entry'})

                Swal.fire('Eliminado','','success')
            }

           
        },

        onSelectedImg(event){
            
            const file = event.target.files[0]

            if(!file){
                //solo un return para que continue
                this.localImg=null
                this.file = null
                return
            }

            this.file = file

            //instancia FileReader ya viene en js
            const fr = new FileReader()
            fr.onload = () => this.localImg = fr.result
            fr.readAsDataURL(file)
           


        },
        onSelectImg(){
            this.$refs.imgSelector.click()
        }
    },
    created(){
        this.loadEntry()
        
    },

    watch:{
        id(){
            this.loadEntry()
        }
    }
}
</script>
<style lang="scss" scoped>
    textarea{
        font-size:20px;
        border: none;
        height: 100%;

        &:focus{
            outline:none;
        }
    }

    img{
        width:200px;
        position: fixed;
        bottom: 150px;
        right: 20px;
        box-shadow: 0px 5px 10px rgba($color:#000, $alpha:0.2);
    }
</style>