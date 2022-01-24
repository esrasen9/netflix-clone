import React from 'react';
import { IoLogOut } from 'react-icons/io5';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import image1 from '../../img/pngegg.png';
import image2 from '../../img/netflix-avatar.png';
import './Nav.css';
import { useStateValue } from '../../Context';

function Nav() {
  const { setOpenSignModal, user } = useStateValue();

  return (
    <div className="nav">
      <Link to="/">
        <img className="nav-logo" src={image1} alt="" />
      </Link>
      {
          user
            ? (
              <div className="nav-user-links">
                <Link className="list-link" to="/mylist">
                  My List
                </Link>
                <button
                  type="button"
                  onClick={() => signOut(auth).catch((error) => alert(error.message))}
                  className="nav-logout-button"
                >
                  <IoLogOut size={40} />
                </button>
              </div>
            )
            : (
              <button
                type="button"
                onClick={() => setOpenSignModal(true)}
                className="nav-avatar"
              >
                <img className="nav-avatar-img" src={image2} alt="" />
              </button>
            )
    }
    </div>
  );
}

export default Nav;
