import  express ,{json,response} from "express";
import cors from "cors"
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import multer from "multer";
// import P from "../client/ecommerce/src/components/login/protection";
// const saltRounds = 10;

const app=express()
const port=3000



app.use(cors())
app.use(express.json())


app.use(express.static("images"))

//multer for image


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       
      cb(null, './images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
//multer

mongoose.connect("mongodb://127.0.0.1:27017/database")// database=database name

// try{
//     console.log('connected')
// }catch(error){
//     console.log("error.message")
// }



app.get("/",(req,res)=>{
    res.send()
    console.log("api called")
})


app.post("/api/register",(req,res)=>{

    // console.log('post');
    console.log(req.body);

    //password encrypt



    bcrypt.hash(req.body.password,10,(err,hash)=>{

        console.log(hash)
        mongoose.connection.collection("admin").insertOne({...req.body,password:hash}).then((response)=>{   //admin =collection name
            res.json({message:"successfully inserted user into db"})

    
    // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {

    //     // mongoose.connection.collection("admin").insertOne(req.body.password).then((response)=>{    //admin =collection name (before encrypt)
    //     //         res.json({message:"successfully inserted"})
        


        // Store hash in your password DB.
    });





    })

    // mongoose.connection.collection("admin").insertOne(req.body).then((response)=>{ //admin =collection name (before encrypt)
    //     res.json({message:"successfully inserted"})

    })
  




//login


 
app.get("/",(req,res)=>{
    res.send()
    console.log("api called")
})


app.post('/api/login', async(req, res) => {
    console.log(req.body);
  
      let response = await mongoose.connection.collection('admin').findOne({ email: req.body.email })
  
          // decryption........
  
      if (response) {
          bcrypt.compare(req.body.password, response.password).then(function(result) {
              // result == true
              if(result){
  
                  res.status(200).json({ uses: response, message: 'Successfull' })
              }else{
                  res.status(400).json({  message: 'password error' })
  
              }
          });
      }
  
      else {
          res.status(400).json({ message: "Invalid Email or Password" })
      }
  });


// app.get("/",(req,res)=>{
//     res.send()
//     console.log("api called")
// })


// // app.post("/api/login",(req,res)=>{

// //     // console.log('post');
// //     console.log(req.body);

//     // mongoose.connection.collection("admin").insertOne(req.body).then((response)=>{ //admin =collection name
//     //     res.json({message:"successfully inserted"})

//     // })
  
// })
//product add


// app.post("/api/product/",(req,res) => {


//     mongoose.connection.collection("product").insertOne(req.body).then((response)=>{ 
//            res.status(200).json({product:response,message:"successfully"});

// }).catch((err)=>{
//     res.status(400).json({message:err.message||"error"})
// })
// });
app.get("/api/product/",async(req,res)=>{


     const response=await mongoose.connection.collection("product").find().toArray();
        if(response.length===0){
            return res.status(404).json("no entries yet");
        }else{
            return res.status(200).json({product:response});
        }
})


app.get("/api/product/:id", async (req, res) => {

    const response = await mongoose.connection.collection("product").findOne({_id:new mongoose.Types.ObjectId(req.params.id)});

    if (response) {
        return res.status(200).json({ product: response });
    } else {
        return res.status(404).json("no entries yet");
    }
})


//edit data
app.put("/api/product/:id", async (req, res) => {

    console.log(req.params.id);

    const response = await mongoose.connection.collection("product").updateOne({ _id: new mongoose.Types.ObjectId(req.params.id) },{$set:req.body})

    if (response) {
        return res.status(200).json({ message: "updated" });
    } else {
        return res.status(400).json({ message: "errror in update of product" });
    }
})









//product delete

app.delete("/api/product/:id", async(req,res) =>{

console.log(req.params.id);

const response = await mongoose.connection.collection("product").deleteOne({_id:new mongoose.Types.ObjectId(req.params.id)})

if(response) {
    return res.status(200).json("deleeted")
}else{
    return res.status(400).json({message:"error in delete of product"})
}

})


//image

app.post("/api/product/", upload.single('image'),(req, res) => {
    console.log(req.file,'file');
    mongoose.connection.collection("product").insertOne({...req.body,profile:req.file?.filename}).then((response) => {
        res.status(200).json({ product: response, message: "Succesfully" });

    }).catch((err) => {
        res.status(400).json({ message: err.message || "error" })
    })
});











// app.listen(port,()=>{
//     console.log(`app listening${port}`);

app.listen(port,()=>console.log("server is listening to the port 3000"))