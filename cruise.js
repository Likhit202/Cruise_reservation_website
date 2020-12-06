const Cruise = require('../models/cruise');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category');
const cruise = require('../models/cruise');


exports.createCruise = (req, res) => {

    //res.status(200).json({ file: req.files, body: req.body  });
    const {
        name, ticketCost, facilities, destination , offer, port, noofseats,   category, createdBy
    } = req.body;
    
let cruisePictures = [];

if(req.files.length > 0){
    cruisePictures  =  req.files.map(file => {
        return { img : file.filename } 
    });
}

    const cruise = new Cruise({
        name: name,
        slug: slugify(name),
        ticketCost,
        facilities,
        destination,
        offer,
        port,
        noofseats,
        cruisePictures,
        category,
        createdBy: req.user._id
    }); 

cruise.save(((error, cruise) => {
    if(error) return res.status(400).json({ error});
    if(cruise){
        res.status(201).json({ cruise});
    }
}));


};

exports.getCruisesBySlug = (req, res) =>{
    const { slug } = req.params;
    Category.findOne({ slug: slug })
    .select('_id')
    .exec((error, category) =>{
        if(error){
            return res.status(400).json({error});
        }

        if(category){
            Cruise.find({ category: category._id })
            .exec((error, cruises) =>{
                res.status(200).json({cruises});

            })
        }
        
    });
   
}