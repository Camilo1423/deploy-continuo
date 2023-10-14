import mongoose from 'mongoose';

//conection mongodb
export const mongoConnect = async () => {
    const DB_URI = process.env.MONGODB_URI
    mongoose.set('strictQuery', false)
    try {
        await mongoose.connect(<string>DB_URI, {})
        .then(res => console.log('**** CONEXIÓN CREADA ****'))
        .catch(err => console.error('**** CONEXIÓN CORRUPTA ****'))
    } catch (error) {
        console.error('**** CONEXIÓN FALLIDA ****')
    }
}