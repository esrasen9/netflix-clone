import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const addToList = (movie, user, myList) => {
  const movieRef = doc(db, 'mylist', user.uid);
  if (!myList.includes(movie.id)) {
    setDoc(movieRef, {
      movies: [...myList, movie.id],
    }, { merge: true })
      .catch((error) => console.log(error.message));
  }
};

export const removeFromList = (movie, user, myList) => {
  const movieRef = doc(db, 'mylist', user.uid);
  setDoc(movieRef, {
    movies: myList.filter((id) => id !== movie.id),
  }, { merge: true })
    .catch((error) => console.log(error.message));
};
