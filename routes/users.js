const express = require("express");
const { getAllUsers, deleteUser, insertUser, updateUser, authenticateUser, getAdmins, getSellers } = require("../services/users");
const router = express.Router();

router.get("/getUsers", async (req, res) => {
    const result = await getAllUsers();
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(500).json("Error retrieving users");
    }
});
router.get("/getAdmins", async (req, res) => {
    const result = await getAdmins();
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(500).json("Error retrieving users");
    }
});
router.get("/getSellers", async (req, res) => {
    const result = await getSellers();
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(500).json("Error retrieving users");
    }
});

router.post("/insertUser", async (req, res) => {
    const { user } = req.body;
    const result = await insertUser(user);
    res.status(200).json(result);
});

router.post("/updateUser", async (req, res) => {
    const { user } = req.body;
    const result = await updateUser(user);
    res.status(200).json(result);
})

router.post("/deleteUser", async (req, res) => {
    const { id } = req.body;
    try {
        res.status(200).json({ message: "deleted succssfully" });
    } catch (error) {
        res.status(500).json({ message: "error occured while deleting the record." });
    }
    const result = await deleteUser(id);

});

router.post("/authenticateUser", async (req, res) => {
    const { user } = req.body;
    console.log(user);
    const result = await authenticateUser(user);
    if (result.message === "success") {
        res.status(200).json(result.result)
    } else {
        // res.status(200).json("Unauthenticated");
        res.status(200).json(result.message);
    }

})

// router.delete("/deleteUser/:id", async (req, res) => {
//     const id = req.params.id;
//     console.log(id);
//     // Add your logic to delete the user using the provided ID
//   });

router.post("/register", (req, res) => {
    res.status(200).json(register(req.query));
});

module.exports = router;
