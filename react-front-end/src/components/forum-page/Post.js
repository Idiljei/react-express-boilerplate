import React, { useState } from "react";
import { Divider, Box, IconButton } from "@material-ui/core";
import { format, utcToZonedTime } from "date-fns-tz";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import GetAddress from "./ConvertToAdd";
import "./forum.css";

const Post = (props) => {
  const [converted, setConverted] = useState("");
  const newDate = new Date(props.date);
  const timeZone = "PST";
  const zonedDate = utcToZonedTime(newDate, timeZone);
  const date = format(zonedDate, "Pp");
  
  const addressObj = JSON.parse(props.address);
  const lat = addressObj.lat;
  const lng = addressObj.lng;
  const id = props.id;

  const counterDisplay = (postId, count) => {
    const newPosts = [...props.allPosts]
    const newCounter = newPosts.find(item => item.id === postId);
    newCounter.counter = count;

    const updatedPost = [...newPosts];
    props.setAllPosts(updatedPost)
  }

  const onClickADD = () => {
    const count = props.counter + 1;
    counterDisplay(id, count);
    updateCounter(count);
  };

  const onClickMINUS = () => {
    if (props.counter) {
      const count = props.counter -1;
      counterDisplay(id, count);
      updateCounter(count);
    }
  };

  const updateCounter = async (counter) => {
    try {
      const body = { id, counter };
      await fetch(`http://localhost:8080/forum`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"},
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Box>
        <Box display="flex" flexDirection="column">
          <h2 class="post-title">{props.title}</h2>
          <h5 class="date">Date of Incident: {date}</h5>
          <Box display="flex" alignContent="flex-start">
            <h5 class="address">Incident Type: {props.type}</h5>
            <h5 class="address">Location:</h5>
            <h5 class="address">
              <GetAddress
                lat={lat}
                lng={lng}
                converted={converted}
                setConverted={setConverted}
              />
            </h5>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column">
          <h4 class="des">Description: {props.description}</h4>
          <h5 class="user">Posted by: {props.user}</h5>
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <h5>{props.counter}</h5>
          <IconButton onClick={onClickADD}><ArrowDropUpIcon Icon /></IconButton>
          <IconButton onClick={onClickMINUS}><ArrowDropDownIcon Icon /></IconButton>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default Post;
