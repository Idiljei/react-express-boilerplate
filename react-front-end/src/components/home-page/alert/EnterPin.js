import React, { useState } from 'react';
import { DialogActions, DialogContent, TextField, Button, DialogTitle } from '@material-ui/core';

const userPIN = 2021;
const limit = 4;

const EnterPin = (props) => {
  const [ pin, setPin ] = useState(0);
  const setUserStatus = props.setUserStatus;

  const turnOffLocationSharing = async () => {
    const id = 3;
    await fetch(`http://localhost:8080/home/safe/${id}`, {
    method: 'PUT',
    })
    .catch(err => console.log(err))
  };

  const handleClose = () => {
    props.setCheckPin(0)
  }

  const handleSubmit = () => {
    if (userPIN === parseInt(pin)) {
      props.setCheckPin(2)
      turnOffLocationSharing();
    } else {
      props.setCheckPin(3);
    }
  }

  return (
    <div>
      <DialogTitle id="form-dialog-title">Enter Pin if Safe</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          inputProps={{
            maxLength: limit
          }}
          type="password"
          onChange={e => setPin(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Enter
        </Button>
      </DialogActions>
    </div>

  )
};

export default EnterPin;