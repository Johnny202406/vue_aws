<template>
    <div>
        <h1>Carreras</h1>
        <RouterLink :to="{ name: '/' }">Ir al dashboard</RouterLink>
        <ul>
            <ul>
                <li v-for="(item, index) in carreras" :key="index">
                    {{item.id}}-{{ item.name }}
                    </li>
            </ul>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
const carreras = ref();

(async () => {
    const { data, error } = await supabase.from('carrera').select()
    if (error) console.log(error)
    carreras.value = data
    console.log(data)
})()
</script>

<style scoped></style>