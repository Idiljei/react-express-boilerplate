import React from "react";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
} from "@material-ui/core";
import { smsSafeNow } from '../sms';

const SafeNow = (props) => {
  const id = props.id;

  const handleClose = () => {
    if (id === "police") {
      return props.setOption(0); // the police button
    }

    props.setUserStatus(false);
    props.setCheckPin(0);
    smsSafeNow();
  };

  return (
    <div>
      <DialogTitle id="form-dialog-title">Glad you're safe!</DialogTitle>
      <DialogContent>
        {id === "location" && (
          <DialogContentText id="alert-dialog-description">
            You are no longer sharing your live location
          </DialogContentText>
        )}

        {id === "police" && (
          <DialogContentText id="alert-dialog-description">
            You are no longer calling emergency services
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </div>
  );
};

export default SafeNow;
