import router from "./../starter/router.js";
import database from "./../config/database.js";
import Lessons from "./../models/Lessons.js";
const route = router
database.connect("mongodb+srv://humanrizki:humanrizki123@cluster0.d5pql.mongodb.net/bisajs?retryWrites=true&w=majority")

route.get('/', async(_, res)=>{
    const lessons = await Lessons.find()
    return res.status(200).json(
        lessons
    )
})
route.post('/lessons', async(req, res)=>{
    const {body} = req
    // console.log(body)
    Lessons.create({...body}, (err, less)=>{
        if(err) return res.status(500).json({
            "message":"Gagal memasukkan data"
        })
        return res.status(201).json({
            less,
            "message":"Berhasil memasukkan data"
        })
    })

})
route.patch('/lessons', async(req, res)=>{
    const {body} = req
    Lessons.updateOne(
        {"_id":body._id}, 
        {...body}, 
        (err, less)=>{
        if(err) return res.status(500).json({
            "message":"Gagal mengubah data"
        })
        return res.status(200).json({
            less,
            "message":"Berhasil mengubah data"
        })
    })
})
route.delete('/lessons/:_id', async(req, res)=>{
    const {params} = req
    Lessons.deleteOne({_id: params._id}, (err)=>{
        if(err) return res.status(500).json({
            "message":"Gagal menghapus data"
        })
        return res.status(200).json({
            "message":"Berhasil menghapus data"
        })
    })

})
export default route