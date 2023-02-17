import React, { useState, useEffect, useRef } from "react";
import { Menu, Input, Grid, Segment } from "semantic-ui-react";
import "./Navbar.css";

import { GoogleLogin } from "@react-oauth/google";

function Navbar() {
  const [activeItem, setActiveItem] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
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
          <Menu.Item>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </Menu.Item>
        </Menu>
      </Segment>
    </div>
  );
}

export default Navbar;
