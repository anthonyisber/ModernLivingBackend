const db = require("../DB/db");


const getAllProperty = async () => {

    const sql = `SELECT * FROM property`;
    try {
        const users = await db.query(sql);
        return users
    } catch (error) {
        console.error(error);
        return { message: "internal error" }
    }
}
const addProperty = async (property) => {
    const { name, desc, price, qts, isAvailable, img, bedrooms, baths, surface, property_agent } = property;
    const sql = `INSERT INTO property (property_Name, property_desc, property_price, property_qts, isAvailable, property_img, property_bedrooms, property_baths, property_surface, user_id ) VALUES (?, ?, ?, ?, ? , ?, ?, ?, ?)`;
    try {
        await db.query(sql, [name, desc, price, qts, isAvailable, img, bedrooms, baths, surface, property_agent]);
        return { message: "records inserted successfully." }
    } catch (error) {
        console.error(error);
        return { message: "Failed to insert" }
    }
}
const deleteProperty = async (id) => {
    const sql = `DELETE FROM property WHERE property_id = ?`;
    try {
        await db.query(sql, [id]);
        return { message: "deleted succssfully!" };
    } catch (error) {
        console.error(error);
        return { message: "internal error" };
    }
}
const updateProperty = async (property) => {

    const { id, name, desc, price, qts, isAvailable, img, bedrooms, baths, surface, property_agent } = property;
    const sql = `UPDATE property SET property_Name = ?, property_desc = ?, property_price = ?, property_qts = ?, isAvailable = ?, property_img = ?, property_bedrooms = ?, property_baths = ?, property_surface = ?, property_agent = ? WHERE property_id = ?`;
    try {
        await db.query(sql, [id, name, desc, price, qts, isAvailable, img, bedrooms, baths, surface, property_agent]);
        return { message: "updated succssfully!" };
    } catch (error) {
        console.error(error);
        return { message: "internal error" };
    }
}

const getPropertyById = async (id) => {
    const sql = `SELECT * FROM property WHERE property_id = ?`;
    try {
        const property = await db.query(sql, [id]);
        return property;
    } catch (error) {
        console.error(error);
        return { message: "internal error" };
    }
}



module.exports = {
    getAllProperty,
    addProperty,
    deleteProperty,
    updateProperty,
    getPropertyById

}

