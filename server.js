const express = require('express')
const  mongoose = require('mongoose')
const Product = require('./models/productModel')
const Comment = require('./models/commentModel');
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

app.get('/products/search', async (req, res) => {
    const { fieldName, value } = req.query;
    const filter = {};
    filter[fieldName] = value;

    try {
        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get('/products/paginate', async (req, res) => {
    const { limit = 10, offset = 0 } = req.query;
    try {
        const products = await Product.find({}).limit(parseInt(limit)).skip(parseInt(offset));
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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


app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find({});
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/comments', async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(200).json(comment);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.put('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndUpdate(id, req.body);

        if (!comment) {
            return res.status(404).json({ message: `Comment not found ${id}` });
        }
        const updatedComment = await Comment.findById(id);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).json({ message: `Comment not found ${id}` });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


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