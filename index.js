const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyx8zzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)

        const collection = client.db('book').collection("bookCollection")

        app.get('/books', async (req, res) => {
            const filter = req.query.search|| "";
            const query = filter ? {
                title: { $regex: search, $option: 'i' }} : {}
           
            try{
                const result = await collection.find(query).toArray();
                res.send(result) 
            }
            catch(error){
                console.error("Error", error);
                res.status(500).send("Unexpected error")
            }
        })

        app.post('/info', async (req,res)=>{
            const info = req.body;
            
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Book server is on")
})

app.listen(port, () => {
    console.log(`Server is running ${port}`);

})