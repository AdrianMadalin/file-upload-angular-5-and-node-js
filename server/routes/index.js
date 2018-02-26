let express = require('express');
let router = express.Router();
let multer = require('multer');

router.post('/user', (req, res) => {
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });

    let upload = multer({storage: storage}).single('image');
    // let upload = multer({storage: storage}).fields([{name: 'img'}]);
    upload(req, res, (err) => {
        if (err) {
            res.status(501).send(`Error`, {message: `error from multer`});
        } else {
            if(req.file !== undefined) {
                console.log(req.body.user);
                console.log(req.file);
                res.send({message: `success`});
            } else {
                res.send({message: `not uploaded`}).status(501);
            }

        }
    })
});

module.exports = router;
