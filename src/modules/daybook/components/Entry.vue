<template lang="">
    <div 
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({name:'entry', params:{id: 10}})">
        <!--Titulo-->
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">15</span>
            <span class="mx-1 fs-5">Julio</span>
            <span class="mx-2 fw-light">2021, jueves</span>
        </div>

        <div class=entry-description>
            Quis ex esse minim adipisicing duis. Magna et ea ex magna. In aute aliqua nisi laboris incididunt ad mollit aliquip in ut cillum aliquip. Proident ut esse pariatur ut nulla amet quis adipisicing cupidatat dolor velit labore consequat esse. Reprehenderit voluptate do ipsum ea. Lorem consectetur qui labore veniam velit nulla aliqua irure aute elit pariatur ad eiusmod. Duis sint proident incididunt adipisicing pariatur enim eu exercitation consequat.
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .entry-container{
        border-bottom: 1px solid #2c3e50;
        transition: 0.2 all ease-in;

        &:hover{
            background-color: lighten($color:grey, $amount:45);
            transition: 0.2 all ease-in;
        }

        .entry-description{
            font-size: 12px;
        }
    }
</style>