import React from 'react';
import { useStateValue } from '../../Context';
import './MyList.css';
import Movie from './Movie';

function MyList() {
  const { myList } = useStateValue();

  return (
    <div className="my-list-container">
      <div className="movie-container">
        { myList.map((id) => <Movie key={id} id={id} />) }
      </div>
    </div>
  );
}

export default MyList;
