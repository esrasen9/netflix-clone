import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../Context';
import SignForm from './SignForm';
import './SignUp.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '60%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    color: 'white',
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    borderRadius: '18px',
    outline: 'none',
  },
}));

export default function SignModal() {
  const { openSignModal, setOpenSignModal } = useStateValue();
  const classes = useStyles();
  return (
    <Modal
      open={openSignModal}
      onClose={() => setOpenSignModal(false)}
    >
      <div className={classes.paper}>
        <SignForm />
      </div>
    </Modal>
  );
}
