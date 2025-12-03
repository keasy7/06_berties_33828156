const express = require("express")
const router = express.Router()


router.get('/books', function (req, res, next) {
    // getting paramaters from url
    const search = req.query.search;
    const min = req.query.minprice;
    const max = req.query.max_price;
    const sort = req.query.sort; //sort by type

    //creating query base and other specified inputs
    let sqlquery = "SELECT * FROM books";
    const conditions = [];
    const params = [];

    if (search) {
        conditions.push("name LIKE ?");
        params.push(`%${search}%`);
    }
    if (min) {
        conditions.push("price >= ?");
        params.push(min);
    }
    if (max) {
        conditions.push("price <= ?");
        params.push(max);
    }

    if (conditions.length > 0) { //building query with conditions
        sqlquery += " WHERE " + conditions.join(" AND ");
    }

    if (sort === "name" || sort === "price") { //changing the order of returned results last
        sqlquery += " ORDER BY " + sort;
    }
    // Execute the sql query
    db.query(sqlquery, params, (err, result) => {
        // Return results as a JSON object
        if (err) {
            res.json(err)
            next(err)
        }
        else {
            res.json(result)
        }
    })
})
module.exports = router
//this is my books list route
    // router.get('/list', function(req, res, next) {
    //     let sqlquery = "SELECT * FROM books"; // query database to get all the books
    //     // execute sql query
    //     db.query(sqlquery, (err, result) => {
    //         if (err) {
    //             next(err)
    //         }
    //         res.render("list.ejs", {availableBooks:result})
    //      });
    // });

    //they are extremely similar but this one returns json data and also doesnt render a page