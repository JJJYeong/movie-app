import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {

    const [FavoriteNum, setFavoriteNum] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    let variable = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.title,
        moviePost: props.movieInfo.backdrop_path,
        movieRuntime: props.movieInfo.runtime
    };

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNum', variable)
            .then(res => {
                if(res.data.success) {
                    setFavoriteNum(res.data.favoriteNum);
                } else {
                    alert('favorite 수 정보를 가져오지 못했습니다.');
                }
            });

        Axios.post('/api/favorite/favorited', variable)
            .then(res => {
                if(res.data.success) {
                    setFavorited(res.data.favorited);
                } else {
                    alert('내 favorite 정보를 가져오지 못했습니다.');
                }
            });
    }, []);

    const onClickFavorite = () => {
        if(Favorited) {
            Axios.post('/api/favorite/removeFavorite', variable)
                .then(res => {
                    if(res.data.success) {
                        setFavoriteNum(FavoriteNum - 1);
                        setFavorited(!Favorited);
                    } else {
                        alert('favorite 취소에 실패했습니다.');
                    }
                });
        } else {
            Axios.post('/api/favorite/addFavorite', variable)
                .then(res => {
                    if(res.data.success) {
                        setFavoriteNum(FavoriteNum + 1);
                        setFavorited(!Favorited);
                    } else {
                        alert('favorite에 실패했습니다.');
                    }
                });
        }
    };

  return (
    <div>
        <Button onClick={onClickFavorite}>{Favorited ? "Undo Favorite" : "Add to Favorites"} {FavoriteNum}</Button>
    </div>
  )
}

export default Favorite
