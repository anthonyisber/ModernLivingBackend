const express = require("express");
const { getAllProperty, deleteProperty, addProperty, updateProperty, getPropertyById } = require("../services/property");
const router = express.Router();
router.get("/getAllProperty", async (req, res) => {
    const result = await getAllProperty();
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(500).json("Error retrieving properties");
    }
});

router.post("/addProperty", async (req, res) => {
    const result = await addProperty(req.body);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(500).json("Error adding property");
    }
}
);

router.delete("/deleteProperty/:id", async (req, res) => {
    const result = await deleteProperty(req.params.id);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(500).json("Error deleting property");
    }
}
);

router.put("/updateProperty", async (req, res) => {
    const result = await updateProperty(req.body);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(500).json("Error updating property");
    }
}
);

router.get("/getPropertyById/:id", async (req, res) => {
    const result = await getPropertyById(req.params.id);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(500).json("Error retrieving property");
    }
}
);



module.exports = router;




