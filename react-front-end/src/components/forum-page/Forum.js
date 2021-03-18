import React, { useState, useEffect } from "react";
import { Box, Fab, Tooltip, Backdrop } from "@material-ui/core";
import FilterButton from "./FilterButton";
import AddIcon from "@material-ui/icons/Add";
import CreatePost from "./CreatePost";
import postStyles from "./PostStyles";
import Post from "./Post";
import "./forum.css";

const Forum = () => {
  const classes = postStyles();
  const [allPosts, setAllPosts] = useState([]);
  const [selected, setSelected] = useState(false);

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const handleClose = () => {
    setSelected(false);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const user_id = 3;
      const body = { user_id, description, address, title, date };
      const response = await fetch(`http://localhost:8080/forum`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/map";
    } catch (err) {
      console.error(err.message);
    }
  };

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/forum");
      const jsonData = await response.json();

      setAllPosts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div class="forum-page">
        <Box
          display="flex"
          className={classes.filterButton}
          justifyContent="flex-end"
          alignItems="center"
          width="50%"
        >
          <FilterButton />
          <div class="add-button">
            <Tooltip title="Add" aria-label="add" arrow>
              <Fab
                onClick={() => setSelected(true)}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </Tooltip>
            <Box className={classes.paper}>
              <Backdrop className={classes.backdrop} open={selected}>
                <Box display="flex">
                  {selected ? (
                    <CreatePost
                      setTitle={setTitle}
                      setAddress={setAddress}
                      setDescription={setDescription}
                      onSubmitForm={onSubmitForm}
                      close={handleClose}
                      setDate={setDate}
                    />
                  ) : null}
                </Box>
              </Backdrop>
            </Box>
          </div>
        </Box>

        <Box width="80%">
          {allPosts.map((post) => {
            return (
              <Box>
                <div key={post.title + post.address + post.date}>
                  <Post
                    title={post.title}
                    address={post.address}
                    description={post.description}
                    date={post.date}
                    user={post.first_name + " " + post.last_name}
                  />
                </div>
              </Box>
            );
          })}
        </Box>
      </div>
    </div>
  );
};

export default Forum;

// const p1 = jsonData[1].address
// const p2 = jsonData[2].address
// const obj = JSON.parse(test)
// const lat = obj.lat
// const lng = obj.lng
// console.log("PERSON 1", p1)
// console.log("PERSON 2,", p2)

// console.log(lat,lng)
