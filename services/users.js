const db = require("../DB/db");
const bcrypt = require('bcrypt');
const saltRounds = 5;

const getAllUsers = async () => {

    const sql = `SELECT * FROM user`;
    try {
        const users = await db.query(sql);
        return users
    } catch (error) {
        console.error(error);
        return { message: "internal error" }
    }
}

const getAdmins = async () => {

    const sql = `SELECT * FROM user where user_role = 'admin'`;
    try {
        const users = await db.query(sql);
        return users
    } catch (error) {
        console.error(error);
        return { message: "internal error" }
    }
}

const getSellers = async () => {

    const sql = `SELECT * FROM user where user_role = 'seller'`;
    try {
        const users = await db.query(sql);
        return users
    } catch (error) {
        console.error(error);
        return { message: "internal error" }
    }
}
const deleteUser = async (id) => {
    const sql = `DELETE FROM user WHERE user_id = ?`;
    try {
        await db.query(sql, [id]);
        return { message: "deleted succssfully!" };
    } catch (error) {
        console.error(error);
        return { message: "internal error" };
    }
}

const insertUser = async (user) => {
    const { firstName, lastName, email, password, phone, dob, countryid, gender, address, role } = user;
    const myPlaintextPassword = password;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            password = hash;
        });
    });
    const sql = `INSERT INTO user (user_firstName, user_lastName, user_email,user_password, user_phoneNumber, user_dob,user_countryId,user_gender,user_address,user_role) VALUES (?, ?, ?, ?, ? , ?, ?, ?, ?, ?)`;
    try {
        await db.query(sql, [firstName, lastName, email, password, phone, dob, countryid, gender, address, role]);
        return { message: "records inserted successfully." }
    } catch (error) {
        console.error(error);
        return { message: "Failed to insert" }
    }
}


const updateUser = async (user) => {
    const { firstname, lastname, email, password, phone, dob, countryid, gender, address, role, id } = user;
    const myPlaintextPassword = password;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            password = hash;
        });
    });
    const sql = `UPDATE user set user_firstName = ?, user_lastName = ?, user_email = ?, user_password = ?, user_phoneNumber = ?, user_dob= ?, user_countryId = ?, user_gender = ?, user_address = ?, user_role= ? WHERE client_id = ?`;
    try {
        await db.query(sql, [firstname, lastname, email, password, phone, dob, countryid, gender, address, role, id]);
        return { message: "records updated successfully." }
    } catch (error) {
        return { message: "Failed to updated" }
    }
}

const authenticateUser = async (user) => {
    const { email, password } = user;
    const myPlaintextPassword = password;

    const sql = ``;
    bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
        if (result) {
            sql = `SELECT * FROM user WHERE user_email = ? AND user_password = ?`;
        }
        else {
            return { message: "Wrong Username/password" }
        }
    });
    try {
        const result = await db.query(sql, [email, password]);
        if (result && result.length > 0) {
            return { message: "success", result: result[0] }
        }
    } catch (error) {
        return { messagge: "error" }
    }
}


module.exports = {
    getAllUsers,
    deleteUser,
    insertUser,
    updateUser,
    authenticateUser,
    getAdmins,
    getSellers
}