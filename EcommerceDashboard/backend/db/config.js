const mongoose = require('mongoose');
const conn = mongoose.connect('mongodb://localhost:27017/ecommdashboard');

module.exports = conn



// const connectDB = async()=>{
//     mongoose.connect('mongodb://localhost:27017/ecommdashboard')        // mdb localhost conn string / database name
//     const productSchema = new mongoose.Schema({});
//     const product = mongoose.model('products',productSchema);
//     console.log('MongoDB Connected...'); 
//     const data = await product.find();
//     console.log(data)
// }