<template>
    <div>这是About
        <hr/>
       <button @click="increase"></button>
       <hr/>
       count: {{ count }}
    </div> 
 </template>
 <script setup>
//  import { useStore } from 'vuex';
 const store = useStore()
 let count = 3
 function increase() {
    count ++
    store.commit('increase',count)
 }
 </script>