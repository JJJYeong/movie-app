import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function MovieDetail(props) {

    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}movie/${props.match.params.movieId}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                setMovie(res);
            });

        fetch(`${API_URL}movie/${props.match.params.movieId}/credits?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                setCasts(res.cast);
            });
    }, []);

    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    }

  return (
    <div>
        {/* Header */}
            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />

        {/* Body */}
        <div style={{width:'85%', margin:'1rem auto'}}>
            {/* Movie Info */}
            <MovieInfo movie={Movie}/>

            <br/>

            <div style={{display:'flex', justifyContent:'center', margin:'2rem'}}>
                <button onClick={toggleActorView}>Toggle Actor View</button>
            </div>

            {/* Actors Grid */}
            {ActorToggle &&
                <Row gutter={[16, 16]}>
                {Casts && Casts.map((cast, idx) => (
                    <React.Fragment key={idx}>
                        <GridCards
                            image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                            characterName={cast.name}
                        />
                    </React.Fragment>
                ))};
            </Row>
            }
        </div>
    </div>
  )
}

export default MovieDetail
