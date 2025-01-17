import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Paper, Tabs, Tab, Typography, Box } from "@material-ui/core";
import ContactList from "./ContactList";
import UserInfoList from "./UserList";
import MyPosts from "./MyPost";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {
    flexGrow: 2,
  },
  bar: {
    color: "white !important",
    background: "#63639F",
    indicatorColor: "white",
    width: "100%"
  },
});

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        elevation={0}
        background-color="white !important"
      >
        <Tabs
          className={classes.bar}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <Tab label="Information" {...a11yProps(0)} />
          <Tab label="Safety Network" {...a11yProps(1)} />
          <Tab label="Posts" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <UserInfoList number={props.number} dob={props.dob} />
        </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginBottom="1%"
        >
          <ContactList selected={props.selected} />
        </Box>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <MyPosts
            title={props.title}
            date={props.date}
            selected={props.selected}
          />
        </Box>
      </TabPanel>
    </div>
  );
}
