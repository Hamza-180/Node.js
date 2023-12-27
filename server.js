const express = require('express')
const  mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.get('/',(req,res)=>{
    res.send('hello node  API')
})


app.get('/blog',(req,res)=>{
    res.send('hello blog my name is hamza')
})

app.get('/products' , async(req , res )=>{

    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){

        res.status(500).json({message: error.message})
    }

})

app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/products', async(req, res) =>{
   try{
    const product = await Product.create(req.body)
    res.status(200).json(product);


   } catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message})

   }
})

app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        
        if(!product){
            return res.status(404).json({message: `product niet gevonden ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Product is niet gevonden ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.set("strictQuery",false)
mongoose.
connect('mongodb+srv://admin:hamza1030@hamzaapi.jqp5uxn.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000, ()=>{
    console.log('Node API app  is running on port 3000');
    });

    
}).catch(()=>{

    console.log(error)
})