const express=require("express")
const app=express()
const mongoose=require("mongoose")
const Listing = require("./models/listing");
const path=require("path")
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
const methodOveride=require("method-override")
const ejsMate=require("ejs-mate")

main().then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log("error detected")
})
async function main(){
    await mongoose.connect(MONGO_URL)
}

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}));
app.use(methodOveride("_method"))
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get('/',(req,res)=>{
    res.send("hello im root")
})

//index route
app.get('/listings',async (req,res)=>{
    const allListings=await Listing.find({})
    res.render("listings/index", { allListings });

})
//new route
app.get('/listings/new',(req,res)=>{
    res.render("listings/new.ejs")
})
//show route
app.get('/listings/:id',async (req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id)
    res.render("listings/show",{listing});

})
//create route
app.post('/listings',async (req,res)=>{
    //let {title,description,image,price,country,location}=req.body;
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

})
//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id)
    res.render("listings/edit",{listing})
})
//update route
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect(`/listings/${id}`);
});
//delete route

app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings")
})

// app.get('/TestListing',async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"Abhinav Arcade",
//         description:"by the beach",
//         price:12000,
//         location:"goa",
//         country:"India"
//     })
//     await sampleListing.save()
//     console.log("sample saved")
//     res.send("succesfully tested")
// })
app.listen(8080 ,()=>{
    console.log("server is listening on 8080")
})