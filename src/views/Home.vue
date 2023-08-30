<template>
   <div>这是Home
    <hr/>
    <div class="wrap">
        <p>count: {{ count }}</p>
    </div>
   </div> 
</template>
<script setup>
// import { computed  } from 'vue';
// import { useStore } from 'vuex';
const store = useStore()
const count = computed(()=> store.state.count)
</script>
<style lang="scss" scoped>
.wrap {
    background: yellow;
    p {
        color: blue($color: #000000);
        font-size: 24px;
    }
}
</style>