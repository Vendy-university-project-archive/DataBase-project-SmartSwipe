const express = require('express');
const router = express.Router();
const pool = require('../databaseConnection');

//Get all Categories
router.get('/', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            // connetion.release();
            return res.status(500).json({message : 'Internal Server Error'});
        }
        connetion.query('Select * from categories', (err, categories) => {
            connetion.release();

            if (!err) {
                res.send(categories)
            }
            else {
                return res.status(500).json({ message: err.message });
            }
        })

    })
});


//Post a Category
router.post('/', (req, res) => {


    
    pool.getConnection((err,connetion) =>{
        if (err){
            // connetion.release();
            return res.status(500).json({message : 'Internal Server Error'});
        }
        connetion.query('Insert into categories SET ? ',[req.body],(err,categories) =>{
            if(!err){
                return res.status(200).json({message: 'Inserted successfully!'})

            }
            else{
                return res.status(500).json({ message: err.message });
            }
        })
    })

});


//Delete a Category
router.delete('/:id', (req, res) => {
    pool.getConnection((err, connetion) => {
        if (err){
            // connetion.release();
            return res.status(500).json({message : 'Internal Server Error'});
        }
        connetion.query('Delete from categories where Category = ?', [req.params.id], (err, categories) => {
            connetion.release();

            if (!err) {
                return res.status(200).json({message: 'Deleted successfully!'})
            }
            else {
                return res.status(500).json({ message: err.message });
            }
        })

    })
});

module.exports = router;
