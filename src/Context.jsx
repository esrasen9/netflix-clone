import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth, db } from './firebase';
import { requests, rowCategories } from './data';

export const Context = React.createContext(null);

function Provider(props) {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';
  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';
  const [openSignModal, setOpenSignModal] = useState(false);
  const [openPlayModal, setOpenPlayModal] = useState(false);
  const [bannerYoutubeId, setBannerYoutubeId] = useState('');
  const [bannerMovie, setBannerMovie] = useState();
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [myList, setMyList] = useState([]);
  const { children } = props;

  const handleAddToList = (movie) => {
    const movieRef = doc(db, 'mylist', user.uid);
    if (!myList.includes(movie.id)) {
      setDoc(movieRef, {
        movies: [...myList, movie.id],
      }, { merge: true })
        .catch((error) => console.log(error.message));
    }
  };

  const handleRemoveFromList = (movie) => {
    const movieRef = doc(db, 'mylist', user.uid);
    setDoc(movieRef, {
      movies: myList.filter((id) => id !== movie.id),
    }, { merge: true })
      .catch((error) => console.log(error.message));
  };

  const store = useMemo(() => ({
    requests,
    rowCategories,
    BASE_URL,
    BASE_IMG_URL,
    API_KEY,
    openSignModal,
    setOpenSignModal,
    openPlayModal,
    setOpenPlayModal,
    bannerYoutubeId,
    setBannerYoutubeId,
    bannerMovie,
    setBannerMovie,
    username,
    setUsername,
    user,
    setUser,
    myList,
    setMyList,
    handleAddToList,
    handleRemoveFromList,
  }), [openSignModal, openPlayModal, bannerYoutubeId, bannerMovie, username, user, myList]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        if (!authUser.displayName) {
          updateProfile(authUser.user, {
            displayName: username,
          }).catch((error) => console.log(error.message));
        }
      } else {
        setUser(null);
        setMyList([]);
      }
    });
    return () => {
      unsub();
    };
  }, [username]);

  useEffect(() => {
    if (user) {
      const movieRef = doc(db, 'mylist', user.uid);
      const unsub = onSnapshot(movieRef, (movie) => {
        if (movie.exists()) {
          setMyList([...movie.data().movies]);
        }
      });
      return () => {
        unsub();
      };
    }
    return null;
  }, [setMyList, user]);

  return (
    <Context.Provider value={store}>
      { children }
    </Context.Provider>
  );
}
export default Provider;
export const useStateValue = () => useContext(Context);
