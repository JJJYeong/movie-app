import React, { useEffect, useState } from 'react';
import './favorite.css';
import Axios from 'axios';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavoriteMovie();
    }, []);

    const fetchFavoriteMovie = () => {
        Axios.post('/api/favorite/getFavoritedMovie', {userFrom: localStorage.getItem('userId')})
            .then(res => {
                if(res.data.success) {
                    setFavorites(res.data.favorites);
                } else {
                    alert('영화 정보를 가져오지 못했습니다.');
                }
            });
    };

    const onDeleteFavorite = (movieId, userFrom) => {
        const favoriteVariable = {movieId, userFrom};

        Axios.post('/api/favorite/removeFavorite', favoriteVariable)
            .then(res => {
                if(res.data.success) {
                    fetchFavoriteMovie();
                } else {
                    alert('favorite 삭제에 실패했습니다.');
                }
            });
    }

    const renderImage = Favorites.map((favorite, idx) => {
        const content = (
            <div>
                {favorite.moviePost ? <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : "no image"}
            </div>
        );

        return <tr key={idx}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRuntime}</td>
            <td><button onClick={() => onDeleteFavorite(favorite.movieId, favorite.userFrom)}>Remove</button></td>
        </tr>
    });

  return (
    <div style={{width:'85%', margin:'3rem auto'}}>
        <h2>Favorite Movies</h2>
        <hr/>

        <table>
            <thead>
                <tr>
                    <th>Movie Title</th>
                    <th>Movie Runtime</th>
                    <th>Remove from Favorites</th>
                </tr>
            </thead>
            <tbody>
                {renderImage}
            </tbody>
        </table>
    </div>
  )
}

export default FavoritePage
