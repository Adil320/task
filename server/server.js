const express = require("express");
const mongoose = require("mongoose");

const cors  = require("cors")
const app = express();

app.use(express.json());

app.use(cors())
const url = "mongodb://127.0.0.1:27017/mydb";

mongoose.connect(url, ({useNewUrlParser :true,useUnifiedTopology: true}))
.then(console.log("Connected to MongoDB"))
.catch(err => console.log(err))

const valueSchema = new mongoose.Schema({
    title: String,
    isEditValue: {type: Boolean, default: false}
});

const Value = mongoose.model('value',valueSchema);

app.get("/values", (req,res) =>{
    Value.find().then(value => res.json(value))
})

app.post("/value", (req,res) => {
    const newValue = new Value({
        title: req.body.title
    })
    newValue.save().then(value => res.json(value))
})

app.delete("/value/:id", (req,res) =>{
    Value.findByIdAndDelete(req.params.id)
    .then(() => res.json({remove: true}))
})

app.post('/value/changeValue',  (req, res) => {
    const { id,title } = req.body;
    Value.findByIdAndUpdate(
        { _id: id },
        { title: title },
        function(err, result) {
          if (err) {
    res.send(err);
          } else {
    res.send(result);
          }
        }
      );
})

app.listen(5000, () => {
    console.log("Server start");
})