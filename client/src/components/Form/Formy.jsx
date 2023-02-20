import React, { useState, useEffect, useRef, useContext } from "react";
import { Form, Button, Icon, Input } from "semantic-ui-react";
import "./Formy.css";
import axios from "axios";

import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

import config from "../../../config/config.json";

function Formy(props) {
  const [map, setMap] = useState({
    center: { lat: 40.47899677897479, lng: -74.44265037292897 },
    zoom: 15,
    containerStyle: {
      width: "500px",
      height: "400px",
      marginLeft: "100px",
      marginTop: "10px",
    },
    text: "",
  });

  const [formData, setFormData] = useState({});

  const [spotAddress, setSpotAddress] = useState("");

  const successCallback = (position) => {
    //console.log("Gave permission");

    setMap({
      center: { lat: position.coords.latitude, lng: position.coords.longitude },
      zoom: 15,
      containerStyle: {
        width: "500px",
        height: "400px",
        marginLeft: "100px",
        marginTop: "10px",
      },
      text: "My Location",
    });
  };

  const errorCallback = (position) => {
    console.log("Did not give permission");
  };

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic

      mounted.current = true;
      //console.log(`Search value updated to ${formData}, component mounted!`);
    } else {
      // do componentDidUpdate logic
      //console.log(`Search value updated to ${JSON.stringify(formData)}`);
    }
  }, [formData]);

  //check when user updates the search for spot

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (spotAddress !== "" && spotAddress !== " ") {
        // Send Axios request here
        let { data } = await axios.post(
          "http://localhost:3001/api/google/findSpot",
          {
            address: spotAddress,
          }
        );

        console.log(data);
        setMap({
          ...map,
          center: {
            lat: data.lat,
            lng: data.lng,
          },
        });
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [spotAddress]);

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      mounted.current = true;
      //console.log(` component mounted!`);
    } else {
      // do componentDidUpdate logic
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      //console.log(`already mounted!`);
    }
  }, []);

  return (
    <div className="Formy">
      <Icon
        className="close"
        name="x"
        size="big"
        onClick={() => {
          props.setShowForm(false);
        }}
      ></Icon>
      <Form>
        <Form.Field>
          <label>Spot Name</label>
          <Input
            placeholder="Spot Name"
            onChange={(e) => {
              let spotName = e.target.value;
              setFormData({ ...formData, spotName });
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Spot Location</label>
          <Input
            placeholder="ex: Recreation Park, New Brunswick, NJ, 08901"
            className="spot_location"
            name="spotLocation"
            onChange={(e) => {
              let spotLocation = e.target.value;
              setFormData({ ...formData, spotLocation });
              setSpotAddress(spotLocation);
            }}
          ></Input>

          {
            <LoadScript googleMapsApiKey={config.Google_Maps.api_key}>
              <GoogleMap
                mapContainerStyle={map.containerStyle}
                center={map.center}
                zoom={map.zoom}
              >
                <MarkerF position={map.center} />
              </GoogleMap>{" "}
            </LoadScript>
          }
        </Form.Field>
        <Form.Field></Form.Field>
        <Button type="submit" onClick={() => {}}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default React.memo(Formy);
