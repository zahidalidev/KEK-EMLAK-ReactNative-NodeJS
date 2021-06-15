const express = require("express");
const sql = require("mssql/msnodesqlv8");
const fs = require('fs-extra')

const conn = require("../config/db")

const router = express.Router();

function getDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hou = `${date.getHours()}`
    const min = `${date.getMinutes()}`
    const sec = `${date.getSeconds()}`
    return `${year}${month}${day}${hou}${min}${sec}`
}

router.post("/", async (req, res) => {
    let date = getDateString()
    const dbPath = `images/${date}.png`
    const path = `./assets/${dbPath}`
    fs.writeFile(path, req.body.imgsource, 'base64', (err) => {
        if (err) throw err
    })

    const name = req.body.data.name;
    const details = req.body.data.details;
    const location = req.body.data.location;
    const price = req.body.data.price;
    const area = req.body.data.area;
    const image = dbPath;
    const userId = req.body.data.userId;

    try {
        await conn.connect();

        const request = new sql.Request(conn);

        request.query(`insert into products(name, details, location, price, area, image, userId) 
                values('${name}', '${details}', '${location}', '${price}', '${area}', '${image}', ${userId})`, (error, responce) => {
            if (error) {
                conn.close();
                return res.status(400).send(error);
            }

            conn.close();
            return res.send(responce.rowsAffected)
        })


    } catch (error) {
        conn.close();
        return res.status(500).send(error);
    }
})


router.get("/", async (req, res) => {
    try {
        await conn.connect();

        const request = new sql.Request(conn);
        request.query(`select * from products`, (error, responce) => {

            if (error) return res.status(404).send("Not found");

            if (responce.recordset.length != 0) {
                conn.close();
                return res.send(responce.recordset);
            } else {
                conn.close();
                return res.status(404).send("Not Found");
            }

        })
    } catch (error) {
        conn.close();
        return res.status(500).send(error);
    }

})

router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        await conn.connect();

        const request = new sql.Request(conn);
        request.query(`select * from products where userId = '${userId}'`, (error, responce) => {

            if (error) return res.status(404).send("Not found");

            if (responce.recordset.length != 0) {
                conn.close();

                return res.send(responce.recordset);
            } else {
                conn.close();
                return res.status(404).send("Not Found");
            }

        })
    } catch (error) {
        conn.close();
        return res.status(500).send(error);
    }

})



module.exports = router;
