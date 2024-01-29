const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//=================================
//             Favorite
//=================================

router.post('/favoriteNum', (req, res) => {
    //favorite 수 가져오기
    Favorite.find({movieId: req.body.movieId})
        .exec((err, info) => {
            if(err) {
                return res.status(400).send(err);
            }
            res.status(200).json({success: true, favoriteNum: info.length});
        });
});

router.post('/favorited', (req, res) => {
    //내 favorite 여부 가져오기
    Favorite.find({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, info) => {
            if(err) {
                return res.status(400).send(err);
            }

            let result = false;
            if(info.length !== 0) {
                result = true;
            }
            res.status(200).json({success: true, favorited: result});
        });
});

router.post('/addFavorite', (req, res) => {
    //favorite 추가
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.status(200).json({success: true});
    });
});

router.post('/removeFavorite', (req, res) => {
    //favorite 취소
    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if(err) {
                return res.status(400).send(err);
            }
            res.status(200).json({success: true, doc});
        });
});

router.post('/getFavoritedMovie', (req, res) => {
    //favorite 영화 목록 가져오기
    Favorite.find({userFrom: req.body.userFrom})
        .exec((err, favorites) => {
            if(err) {
                return res.status(400).send(err);
            }
            res.status(200).json({success: true, favorites});
        });
});

module.exports = router;
