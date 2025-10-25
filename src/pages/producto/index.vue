<template>
  <div>
    <h1>Productos</h1>
    <div class="box">
      <RouterLink to="/">Ir al dashboard</RouterLink>
      <span class="message">{{ message }}</span>
      <div class="row">
        <button @click="crearProductos(1)" :disabled="disabled">CREAR 1 PRODUCTO</button>
        <button @click="crearProductos(5)" :disabled="disabled">CREAR 5 PRODUCTOS</button>
      </div>
    </div>
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Descuento %</th>
          <th>Categoría (ID)</th>
          <th>Marca (ID)</th>
          <th>Creado</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in productos" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.descripcion }}</td>
          <td>{{ item.precio }}</td>
          <td>{{ item.descuento_porcentaje }}</td>
          <td>{{ item.id_categoria }}</td>
          <td>{{ item.id_marca }}</td>
          <td>{{ item.created_at }}</td>
          <td><button @click="eliminarProducto(item.id)" :disabled="disabled">Eliminar</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { fakerES_MX as faker } from '@faker-js/faker'
import { ref } from 'vue'
const productos = ref()
const message = ref<string>('Empieze creando productos o elimine')
const disabled = ref<boolean>(false)
const getProducts = async () => {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('id', { ascending: false })
  if (error) {
    message.value="Ocurrio un error al traer los productos, recargue la pagina"
    return
  }
  productos.value = data
  console.log(data)
}
;(async () => {
  await getProducts()
})()

const crearProductos = async (number: number) => {
  const start = performance.now()
  message.value = `Creando ${number} productos..., espere`
  disabled.value = true
  const productos = []

  for (let index = 0; index < number; index++) {
    productos.push({
      nombre: faker.commerce.productName(),
      descripcion: faker.commerce.productDescription(),
      precio: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
      descuento_porcentaje: faker.number.float({ min: 0, max: 50 }),
      id_categoria: faker.helpers.arrayElement(['electronica', 'ropa', 'hogar']),
      id_marca: faker.helpers.arrayElement(['sony', 'nike', 'samsung']),
      created_at: faker.date.past(),
    })
  }
  const { data, error } = await supabase.from('productos').insert(productos).select('id')
  if (error) {
    disabled.value = false
    message.value = `Ocurrio un error al crear el ${number} productos, intente de nuevo`
    return
  }

  await getProducts()
  disabled.value = false
  const end = performance.now()
  message.value = `Se creo ${number} producto(s) en ${end - start} ms`
  return
}
const eliminarProducto = async (id: number) => {
  const start = performance.now()
  message.value = `Eliminando producto con ID:${id} ..., espere`
  disabled.value = true
  const { data, error } = await supabase.from('productos').delete().eq('id', id).select('id')
  if (error) {
    disabled.value = false
    message.value = `Ocurrio un error al eliminar el producto con ID:${id}, intente de nuevo`
    return
  }

  await getProducts()
  disabled.value = false
  const end = performance.now()
  message.value = `Se elimino el producto con ID:${id} en ${end - start} ms`
  return
}
</script>

<style scoped>
.message {
  display: inline-block;
  padding: 6px 12px;
  background-color: #42b983; /* color principal estilo Vue */
  color: white;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.message:hover {
  background-color: #369870; /* más oscuro al pasar el mouse */
}

.row {
  display: flex;
  gap: 10px;
}
.box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
table {
  margin-top: 20px;
}
button {
  width: max-content;
  background-color: #1f2937;
  color: #e5e7eb;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.1s;
}

button:hover {
  background-color: #374151;
  transform: translateY(-2px);
}

button:active {
  transform: scale(0.97);
}
button:disabled {
  background-color: #cbd5e1;
  color: #64748b;
  border: 1px solid #94a3b8;
  cursor: not-allowed;
  opacity: 0.7;
  pointer-events: none;
}

</style>
