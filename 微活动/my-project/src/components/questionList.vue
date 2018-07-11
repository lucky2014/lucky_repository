<template>
    <div>
        <p class="font-large white-color bold m-b-2">★.{{distribuated.list.question.content}}</p>
        <div class="question-list" v-if="distribuated.list.question!==undefined" v-for="(list,index) in distribuated.list.question.optionList" :key="index">
            <mu-raised-button v-on:click="()=>{questionClk(index)}" 
                :label="list.content" 
                :class="'white-bg-color font-large-2 '+(index==0?'':'m-t-1')+' question-list-btn theme-question-color '+(list.active?'btn-active-color white-color':'')"/>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed:mapState({
        distribuated:'distribuated'
    }),
    watch:{
        'this.distribuated'(to){
            
        }
    },
    methods:{
        questionClk(index){
            this.distribuated.list.question.optionList.map((list,i)=>{
                if(i==index){
                    list.active = !list.active;
                }else{
                    list.active = false;
                }
            })
        }
    },
    mounted(){
        
    }
}
</script>
<style>
    .question-list-btn{
        width:100%;
    }
</style>


