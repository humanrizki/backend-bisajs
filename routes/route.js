import { Router } from "express";
import Lessons from "./../models/Lessons.js";
const route = Router()
route.get('/lessons', async(_, res)=>{
    const lessons = await Lessons.find(
        {}, 
        {
            _id:0,
            name:1,
            description:1,
            slug:1
        }
    ).exec()
    return res.status(200).json(
        lessons
    )
})
route.get('/lessons/:slug', async(req, res)=>{
    const {params} = req
    Lessons.findOne(
        {slug: params.slug},
        {
            _id:0,
            name:1,
            description:1,
            slug:1
        },
        (_, lesson)=>{
            if(lesson == null) return res
            .status(404)
            .json({
                "message":"Data tidak ditemukan"
            })
            return res
            .status(200)
            .json({
                "message":"Data berhasil ditemukan",
                lesson
            })
        })
})
route.post('/lessons', async(req, res)=>{
    const {body} = req
    Lessons.create(
        {...body}, 
        async(err, less)=>{
            if(err) return res.status(500).json({
                "message":"Gagal memasukkan data"
            })
            const lesson = await Lessons.findById(less._id, 
                {
                    _id:0,
                    name:1,
                    description:1,
                    slug:1
                }
            ).exec();
            return res.status(201).json({
                lesson,
                "message":"Berhasil memasukkan data"
            })
        }
    )

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