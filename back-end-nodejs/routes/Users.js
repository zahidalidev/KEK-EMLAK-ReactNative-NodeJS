const express = require("express");
const sql = require("mssql/msnodesqlv8");
const conn = require("../config/db")

const router = express.Router();

router.get("/:email/:password", async (req, res) => {
    try {

        const email = req.params.email.trim().toLowerCase();
        const password = req.params.password;

        await conn.connect();

        const request = new sql.Request(conn);
        request.query(`select * from users where email = '${email}' and password = '${password}'`, (error, userResponce) => {

            if (error) return res.status(404).send("Not found");

            if (userResponce.recordset.length != 0) {
                conn.close();
                return res.send(userResponce.recordset[0]);
            } else {
                conn.close();
                return res.status(404).send("Email or Password is Incorrect");
            }

        })
    } catch (error) {
        conn.close();
        return res.status(500).send(error);
    }

})


router.post("/", async (req, res) => {
    const name = req.body.name.trim();
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;
    const role = req.body.role;
    try {
        await conn.connect();

        const request = new sql.Request(conn);

        request.query(`select email from users where email = '${email}'`, (verificationError, verificationResponce) => {
            if (verificationError) {
                conn.close();
                return res.status(400).send(verificationError);
            };

            if (verificationResponce.recordset.length != 0) {
                conn.close();
                return res.status(400).send("Email already registered");
            } else {
                request.query(`insert into users(name, email, password, role) 
                values('${name}', '${email}', '${password}', '${role}')`, (error, userResponce) => {
                    if (error) {
                        conn.close();
                        return res.status(400).send(error);
                    }

                    conn.close();
                    return res.send(userResponce.rowsAffected)
                })
            }

        })

    } catch (error) {
        conn.close();
        return res.status(500).send(error);
    }
})

module.exports = router;
