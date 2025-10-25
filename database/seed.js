import { fakerES_MX as faker } from '@faker-js/faker'



import { createClient } from '@supabase/supabase-js'



// Si crea los datos de prueba

// const name = faker.person.fullName()

// const apellidos = faker.person.bio()

// node database/seed.js

// console.log(`Generamos nombre: ${name}`)

// console.log(`Generamos biografía: ${apellidos}`)



// node --env-file=.env database/seed.js

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

//console.log(supabase)



const seedCarreras = async (number) => {
    console.time('time')

    const log = (tablaName, error) => {
        console.error(`A ocurrido un error en la tabla ${tablaName}con codigo ${error}:${error.message}`);
        process.exit(1)

    }
    const mensaje = (stepMessage) => {
        console.log(stepMessage);

    }
    const enviando = async()=>{
        mensaje('enviando datos')
    }
    const carreras = []

    for (let index = 0; index < number; index++) {

        carreras.push({

            name: faker.lorem.words(3),

            status: faker.helpers.arrayElement(['activo', 'inactivo', 'en reposo']),

            estudiantes: faker.helpers.arrayElements([1, 2, 3, 4]),

            anio: faker.date.past(),

            mes: faker.date.month({ context: 'standalone', length: 'wide' }),

        })

        console.timeLog('time')

    }

    const { data, error } = await supabase.from('carrera').insert(carreras).select('id')

    if (error) return log('carrera', error);

    mensaje('Datos enviados correctamente')
    console.timeEnd('time')

    return data


}


export const envioData = async (numero) => {
    await seedCarreras(numero)
}
const number = 5

envioData(number)