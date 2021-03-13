import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import ShowPost from './ShowPost'; 

const Post = () => {
  const [ title, setTitle ] = useState("");
  const [ name, setName ] = useState("");
  const [ location, setLocation ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ incidents, setIncidents ] = useState([]);
  
  const post = {
    title,
    name,
    location,
    description
  };

  const addPost = () => {
    setIncidents((prev) => {
      console.log(" This is the add post function:", [...prev, post])
      return [...prev, post]
    })
  };
  
  return (
    <section>
      <form noValidate autoComplete="off">
        <TextField 
          id="standard-secondary" 
          label="Title" 
          value={post.title} 
          color="primary" 
          variant="outlined" 
          onChange={(event) => setTitle(event.target.value)} 
          />
        <TextField 
          id="standard-secondary" 
          label="Name" 
          value={post.name} 
          color="primary" 
          variant="outlined" 
          onChange={(event) => setName(event.target.value)} 
          />
        <TextField 
          id="standard-secondary" 
          label="Location"
          value={post.location} 
          color="primary"
          variant="outlined"
          onChange={(event) => setLocation(event.target.value)} 
          />
        <TextField 
          id="standard-secondary"
          label="Description"
          value={post.description} 
          color="primary" 
          variant="outlined"
          onChange={(event) => setDescription(event.target.value)} 
          />
      </form>
      <Button
        type="submit"
        size="large" 
        variant="contained"
        onClick={addPost} 
        >
        Submit
      </Button>

      <h2>Reported Incidents:</h2>
      { incidents.map(incident=> {
        return <div><ShowPost title={incident.title} name={incident.name} location={incident.location} description={incident.description}/></div>
      })}
    
    </section>
  );
};

export default Post;