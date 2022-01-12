const express = require("express")
const app = express()
 
// call model for member
const paket = require("../models/index").paket
 
// *** call auth ***
 
// middleware for allow the request from body (agar bisa membaca data yg dibody)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
 
// end-point akses data paket dg method GET
app.get("/", async(req, res) => {
    paket.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})
 
// end-point akses data member berdasarkan 'id_paket' tertentu dg method GET
app.get("/:id_paket", async(req, res) => {
    paket.findOne({where: {id_paket: req.params.id_paket}})
    .then(paket => {
        res.json(paket)
    })
    .catch(error => {
        res.json({message: error.message})
    })
})
 
// end-point add new paket
app.post("/", async(req, res) => {
    // tampung data request yg akan dimasukkan
    let newPaket= {
        jenis_paket: req.body.jenis_paket,
        harga: req.body.harga
    }
 
    // execute insert new paket
    paket.create(newPaket)
    .then(result => {
        res.json({
            message: "Data Success",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})
 
// end-point mengubah data paket dg method PUT
app.put("/", async(req, res) => {
    // key yg menunjukkan data yg akan diubah
    let param = {
        id_paket: req.body.id_paket
    }
 
    // tampung data request yg akan diubah
    let data = {
        jenis_paket: req.body.jenis_paket,
        harga: req.body.harga
        
    }
 
    // execute update data
    paket.update(data, {where: param})
    .then(result => {
        res.json({
            message: "Data Updated",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})
 
// end-point menghapus data paket berdasarkan 'id_paket' dg method DELETE
app.delete("/:id_paket", async(req, res) => {
    // tampung data yg akan dihapus
    let param = {
        id_paket: req.params.id_paket
    }
 
    // execute delete data
    paket.destroy({where: param})
    .then(result => {
        res.json({
            message: "Data Deleted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})
 
module.exports = app
