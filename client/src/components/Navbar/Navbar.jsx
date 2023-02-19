import React, { useState, useEffect, useRef, useContext } from "react";
import { Menu, Input, Grid, Segment, Icon, Popup } from "semantic-ui-react";
import "./Navbar.css";
import axios from "axios";

import { useGoogleLogin } from "@react-oauth/google";

import UserContext from "../../context/UserContext/UserContext";

function Navbar() {
  const [activeItem, setActiveItem] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentUser, setCurrentUser] = useContext(UserContext);

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      console.log(`Search value updated to ${searchValue}, component mounted!`);
    } else {
      // do componentDidUpdate logic
      console.log(`Search value updated to ${JSON.stringify(searchValue)}`);
    }
  }, [searchValue]);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log(response);

        const { access_token, expires_in, token_type } = response;

        //need to hit google api to get user info
        const userInfo = await axios.post(
          "http://127.0.0.1:3001/api/auth/profile",
          {
            access_token,
          }
        );

        console.log(userInfo);

        //save data to local storage
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: userInfo.data.token,
            profile: userInfo.data.profile,
            authenticated: true,
            expires_in,
          })
        );

        //save
        setCurrentUser({
          token: userInfo.data.token,
          profile: userInfo.data.profile,
          authenticated: true,
          expires_in,
        });
      } catch (e) {
        console.log(e);
      }
    },
    onError: (error) => console.log(error),
  });

  const logout = () => {
    localStorage.setItem("user", "");
    setCurrentUser({ authenticated: false, profile: {}, access_token: "" });
  };

  return (
    <div className="Navbar">
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={(e, { name }) => {
              console.log(name);
              setActiveItem(name);
            }}
          >
            Home
          </Menu.Item>

          <Menu.Item
            name="location"
            active={activeItem === "location"}
            onClick={(e, { name }) => {
              console.log(name);
              setActiveItem(name);
            }}
          >
            Spots by Location
          </Menu.Item>

          <Menu.Item
            name="best"
            active={activeItem === "best"}
            onClick={(e, { name }) => {
              console.log(name);
              setActiveItem(name);
            }}
          >
            Best Spots near You
          </Menu.Item>

          <Menu.Item>
            <Input
              className="search"
              //loading={loading}
              placeholder="Search Spot"
              icon={{ name: "search", link: false }}
              onChange={(e, data) => setSearchValue(data.value)}
              results={searchResults}
              value={searchValue}
            />
          </Menu.Item>

          {currentUser.authenticated && (
            <Menu.Item className="add_spot">
              <Icon
                name="plus"
                size="big"
                onClick={() => console.log("clicked")}
              />
            </Menu.Item>
          )}

          <Menu.Item>
            {currentUser.authenticated && (
              <span className="material-icons green-color">skateboarding </span>
            )}
            {!currentUser.authenticated && (
              <Icon name="google" size="big" onClick={() => login()} />
            )}
          </Menu.Item>
          <Menu.Item>
            {currentUser.authenticated && <div>{currentUser.profile.name}</div>}
            {!currentUser.authenticated && <div>Please log in</div>}
          </Menu.Item>
          <Menu.Item
            textAlign="right"
            name="logout"
            floated="right"
            onClick={() => logout()}
          >
            <Popup
              content="peace ☮️"
              trigger={<Icon name="hand peace" size="big" />}
              position="right center"
            />
          </Menu.Item>
        </Menu>
      </Segment>
    </div>
  );
}

export default Navbar;
