<template >
    <template v-if="entryState">
        <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">{{ day }}</span>
            <span class="mx-1 fs-3">{{ month }}</span>
            <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
            
        </div>
        <div>
            <button class="btn btn-danger mx-2">
                <i class="fa fa-trash-alt"></i>
            </button>

            <button class="btn btn-primary">
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
    icon ="fa-save"/>

    <!--buscar imagen-->
    <img 
    src="https://www.xtrafondos.com/wallpapers/resized/guacamayos-1016.jpg?s=large" 
    alt="entry-picture"
    class="img-thumbnail">
</template>

<script>
import {  defineAsyncComponent} from "vue";
import { mapGetters } from "vuex";
import getDayMonthYear from "../helpers/getDayMonthYear";
export default {
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
            entryState:null
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
            const entry =this.getEntryById(this.id)
            
            //si no existe la entrada se redirecciona al usuario
            if(!entry) this.$router.push({name: 'no-entry'})

            //si existe
            this.entryState = entry
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