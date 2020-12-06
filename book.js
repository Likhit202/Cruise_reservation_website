const Book = require('../models/book');

exports.addItemToBook = (req, res) =>{
    
    Book.findOne({ user: req.user._id })
    .exec((error, book) => {
        if(error) return res.status(400).json({ error});
        if(book){
            //if book already exists update it 
            const cruise = req.body.bookItems.cruise
            const item = book.bookItems.find(c => c.product == cruise );
            let condition, update;

            if(item){
                condition = { "user": req.user._id, "bookItems.cruise": cruise };
                update = {
                    "$set": {
                        "bookItems.$": {
                            ...req.body.bookItems,
                            noofseats:  item.noofseats + req.body.bookItems.noofseats 
                        }
                    }
         
                 };

                
        
            }else{
                condition = {user: req.user._id};
                update = {
                "$push": {
                    "bookItems": req.body.bookItems
                }
     
               };
               
            }
            Book.findOneAndUpdate(condition, update)
               .exec((error, _book) => {
                if(error) return res.status(400).json({ error});
                if(_book){
                    return res.status(201).json({ book : _book});
                 }
               })
        }else{
            //if book doesnt exists create book
            const book = new Book({
                user: req.user._id,
                bookItems: [ req.body.bookItems]
            });
        
            book.save((error, book) => {
                if(error) return res.status(400).json({ error});
                if(book){
                    return res.status(201).json({ book });
                }
            });
        }
    });

    

};