const express = require("express")
const app = express()

//memanggil model untuk member
const member = require("../models/index").member

// //memmanggil auth
// // panggil fungsi auth -> validasi token
// const {auth} = require("./login")
 
// // fungsi auth dijadikan middleware
// app.use(auth)
// // ---------------------------------

//perangkat untuk memmaggil request dari body
//agar bisa membaca data yang di body

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//end-point akses data member dg method get
app.get("/",async(req, res)=>{
    member.findAll()
    .then(result =>{
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// end-point add new member
app.post("/", async(req, res) => {
    // tampung data request yg akan dimasukkan
    let newMember = {
        nama_member: req.body.nama_member,
        alamat: req.body.alamat,
        jenis_kelamin: req.body.jenis_kelamin,
        tlp: req.body.tlp
    }
 
    // execute insert new member
    member.create(newMember)
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
 
// end-point mengubah data member dg method PUT
app.put("/", async(req, res) => {
    // key yg menunjukkan data yg akan diubah
    let param = {
        id_member: req.body.id_member
    }
 
    // tampung data request yg akan diubah
    let data = {
        nama_member: req.body.nama_member,
        alamat: req.body.alamat,
        jenis_kelamin: req.body.jenis_kelamin,
        tlp: req.body.tlp
    }
 
    // execute update data
    member.update(data, {where: param})
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
 
// end-point menghapus data member berdasarkan 'id_member' dg method DELETE
app.delete("/:id_member", async(req, res) => {
    // tampung data yg akan dihapus
    let param = {
        id_member: req.params.id_member
    }
 
    // execute delete data
    member.destroy({where: param})
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
