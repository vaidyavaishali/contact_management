const express = require("express")
const bodyparser = require("body-parser")
const data_router = express.Router()
const Data_models = require("../models/dataModel")

data_router.post("/v1/contacts", async (req, res) => {
    try {
        const new_user = await Data_models.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone
        })
        res.status(201).json({
            status: "Success",
            result: new_user
        })
    } catch (e) {
        res.status(404).json({
            status: "Failed,",
            message: e.message
        })
    }
})
data_router.get("/v1/contacts", async (req, res) => {
    try {
        const user = await Data_models.find()
        res.status(200).json({
            status: "Success",
            result: user
        })
    } catch (e) {
        res.status(404).json({
            status: "Failed,",
            message: e.message
        })
    }
})

data_router.get("/v1/contacts/:id", async (req, res) => {
    try {
        const findByID = await Data_models.findOne({ _id: req.params.id })
        if (findByID) {
            res.status(200).json({
                status: "Success",
                result: findByID
            })
        } else {
            res.status(404).json({
                status: "ID not found",
            })
        }
    } catch (e) {
        res.status(404).json({
            status: "Failed,",
            message: "Invalid Id"
        })
    }
})

data_router.delete("/v1/contacts/:id", async (req, res) => {
    try {
        const findByID = await Data_models.findOne({ _id: req.params.id })
        if (findByID) {
            await Data_models.deleteOne({ _id: req.params.id })
            res.status(204).json({
                status: "Successfully deleted",
            })
        } else {
            res.status(404).json({
                status: "ID not found",
            })
        }

    } catch (e) {
        res.status(404).json({
            status: "Failed,",
            message: "There is no contact with that id"
        })
    }
})


data_router.put("/v1/contacts/:id", async (req, res) => {
    try {
        const findByID = await Data_models.findOne({ _id: req.params.id })
        if (findByID) {
            await Data_models.updateOne({ _id: req.params.id }, req.body)
            res.status(204).json({
                status: "success"
            })
        } else {
            res.status(404).json({
                status: "ID not found",
            })
        }

    } catch (e) {
        res.status(404).json({
            status: "Failed,",
            message: "There is no contact with that id"
        })
    }

})
data_router.patch("/v1/contacts/:id", async (req, res) => {
    try {
        const findByID = await Data_models.findOne({ _id: req.params.id })
        if (findByID) {
            const update = await Data_models.updateOne({ _id: req.params.id }, { $set: { firstName: req.body.firstName } })
            res.status(204).json({
                status: "Successfully updated",
            })
        } else {
            res.status(404).json({
                status: "ID not found",
            })
        }

    }
    catch (e) {
        res.status(404).json({
            status: "Failed,",
            message: "There is no contact with that id"
        })
    }

})
module.exports = data_router