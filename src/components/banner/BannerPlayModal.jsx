import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Iframe from 'react-iframe';
import { useStateValue } from '../../Context';
import { addToList, removeFromList } from '../listMethods';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '84%',
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: '18px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#333233',
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: '40px',
  },
}));

const BASE_YOUTUBE_URL = 'https://www.youtube.com/embed/';

export default function BannerPlayModal() {
  const {
    openPlayModal, setOpenPlayModal, bannerYoutubeId,
    bannerMovie, myList, user,
  } = useStateValue();
  const classes = useStyles();
  const [inMyList, setInMyList] = useState(myList.includes(bannerMovie?.id));

  const handleClick = () => {
    inMyList ? removeFromList(bannerMovie, user, myList)
      : addToList(bannerMovie, user, myList);
    setInMyList(!inMyList);
  };
  return (
    <Modal
      open={openPlayModal}
      onClose={() => setOpenPlayModal(false)}
    >
      <div
        className={classes.paper}
      >
        <Iframe
          className="banner-video"
          url={`${BASE_YOUTUBE_URL}${bannerYoutubeId}`}
          width="86%"
          height="70%"
          frameBorder="0"
        />
        <div className="banner-modal-overview">
          <div>
            <h1 className="banner-modal-title">{bannerMovie?.title}</h1>
            <p className="banner-modal-text">{bannerMovie?.overview}</p>
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="my-list-button"
          >
            {
                inMyList ? 'Remove from List' : 'Add to List'
            }
          </button>
        </div>
      </div>
    </Modal>
  );
}
