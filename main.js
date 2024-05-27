const bodyParser = require('body-parser');
let express = require('express');
let fs = require('fs');

let app = express()

app.use(bodyParser.json())

app.get('/students', (req, res) => {
    let data = fs.readFileSync("data.json", "utf-8")
    res.send(data)
}
)

app.get('/students/:ID', (req, res) => {

    let data = getdatafunction()
    let items = data.find((items) => items.id === parseInt(req.params.ID))
    res.send(items)
})

app.post('/students', (req, res) => {
    let data = getdatafunction()
    data.push(req.body)
    fs.writeFileSync("data.json", JSON.stringify(data))
    res.send('Added successfully.');
})

app.put('/students/:ID',(req,res)=>{
    let data = getdatafunction()
    let index = data.findIndex((i)=>i.id === parseInt(req.params.ID))
    if (index!= -1){
        data[index] = req.body;
        fs.writeFileSync("data.json",JSON.stringify(data))
        res.send('Edited successfully.');
    }
    else{
        res.send("Index not found")
    }
    
})

app.delete('/students/:ID',(req,res)=>{
    let data =getdatafunction()
    let index=data.findIndex((i)=>i.id === parseInt(req.params.ID))  
    if(index!= -1)
        {
            data.splice(index,1)
            fs.writeFileSync("data.json",JSON.stringify(data))
            res.send(`Data of index ${index} deleted`)
        }
    else
    {
        res.send("Index not found")
    }
})

app.listen(5000)


function getdatafunction() {
    let data = fs.readFileSync("data.json", "utf-8")
    return JSON.parse(data)
}