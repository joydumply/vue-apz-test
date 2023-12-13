<template>
    <div class="user-registration-section">
        <Heading content="Working with POST request"/>    

        <div class="user-registration-form">
            <el-input v-model="input" placeholder="Please input" />
        </div>
    </div>
</template>
<script>
import Heading from '../basic/Heading.vue'
import {ref} from 'vue';
export default {
    components:{
        Heading
    },
    setup(){
        const input = ref('');

        return {input}
    }
}
</script>
<style lang="scss">
    
</style>