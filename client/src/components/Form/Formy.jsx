import React, { useState, useEffect, useRef, useContext } from "react";
import { Form, Button, Icon, Input } from "semantic-ui-react";
import "./Formy.css";
import axios from "axios";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { formatRelative } from "date-fns";

import config from "../../../config/config.json";

function Formy(props) {
  const google = window.google;
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

  const [markers, setMarkers] = useState([]);

  const [myMarker, setMyMarker] = useState();

  const [selected, setSelected] = useState();

  const [formData, setFormData] = useState({});

  const [spotAddress, setSpotAddress] = useState("");

  const [leftClickTimer, setLeftClickTimer] = useState(0);

  const fileRef = useRef({});
  let [files, setFiles] = useState([]);

  const successCallback = (position) => {
    //console.log("Gave permission");

    setMap({
      center: { lat: position.coords.latitude, lng: position.coords.longitude },
      zoom: 15,
      containerStyle: {
        width: "50vw",
        height: "50vh",
        marginLeft: "0px",
        marginTop: "10px",
      },
      text: "My Location",
    });
  };

  const errorCallback = (position) => {
    console.log("Did not give permission");
  };

  const addMarker = (e) => {
    console.log("adding marker");
    setMyMarker({ lat: e.latLng.lat(), lng: e.latLng.lng(), time: new Date() });
  };

  const validateFileType = (file, type) => {
    console.log("file type test");
    if (file.type == type) {
      console.log("passed!");
      return;
    }
    console.log("failed!");
  };

  const checkFiles = async (files) => {
    try {
      console.log("checking files...");
      console.log(files);

      Array.from(files).forEach((file) => {
        validateFileType(file, "image/png");
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic

      mounted.current = true;
      console.log(`marker added`);
      console.log(myMarker);
      //console.log(`Search value updated to ${formData}, component mounted!`);
    } else {
      // do componentDidUpdate logic
      console.log(`marker added`);
      console.log(myMarker);
      //console.log(`Search value updated to ${JSON.stringify(formData)}`);
    }
  }, [myMarker]);

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic

      mounted.current = true;
      console.log(files);
      //console.log(`Search value updated to ${formData}, component mounted!`);
    } else {
      // do componentDidUpdate logic
      console.log(files);
      checkFiles(files);
      //console.log(`Search value updated to ${JSON.stringify(formData)}`);
    }
  }, [files]);

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

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic

      mounted.current = true;
      console.log(`selected changed to ${JSON.stringify(selected)}`);
      //console.log(`Search value updated to ${formData}, component mounted!`);
    } else {
      // do componentDidUpdate logic
      console.log(`selected changed to ${JSON.stringify(selected)}`);
      //console.log(`Search value updated to ${JSON.stringify(formData)}`);
    }
  }, [selected]);

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
      console.log(window.google.maps);
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
      />
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
            action={{
              color: "red",
              labelPosition: "right",
              icon: "trash",
              content: "Remove Pin",
              onClick: () => setMyMarker(),
            }}
            actionPosition="right"
          />

          <LoadScript
            googleMapsApiKey={config.Google_Maps.api_key}
            libraries={["drawing"]}
          >
            <GoogleMap
              mapContainerStyle={map.containerStyle}
              center={map.center}
              zoom={map.zoom}
              onClick={(e) => {
                if (leftClickTimer > 1000) {
                  console.log(`setting marker`), addMarker(e);
                }
                //add marker
              }}
              onMouseDown={() => {
                setLeftClickTimer(new Date().getTime());
              }}
              onMouseUp={() => {
                let thisMoment = new Date().getTime();

                setLeftClickTimer(thisMoment - leftClickTimer);
              }}
            >
              {markers.map((marker) => (
                <Marker
                  key={`${marker.lat}-${marker.lng}`}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  onClick={() => {
                    setSelected(marker);
                  }}
                  icon={{
                    url: `/skateboard_spot.png`,
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                />
              ))}
              {myMarker && (
                <Marker
                  key={`${myMarker.lat}-${myMarker.lng}`}
                  position={{ lat: myMarker.lat, lng: myMarker.lng }}
                  onClick={(e) => {
                    setSelected(myMarker);
                  }}
                  icon={{
                    url: `/skateboard_spot_new.png`,
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                />
              )}

              {selected && (
                <InfoWindow
                  position={{ lat: selected.lat, lng: selected.lng }}
                  onCloseClick={() => {
                    setSelected(null);
                  }}
                >
                  <div>
                    <h2>{formData.spotName || ""}</h2>
                    <p>Spotted {formatRelative(selected.time, new Date())}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </Form.Field>

        <Button inverted color="yellow" onClick={() => fileRef.current.click()}>
          <input
            id="upload"
            name="upload"
            type="file"
            accept="image/png"
            multiple
            ref={fileRef}
            hidden
            onChange={(event) => {
              setFiles(event.target.files);
            }}
          />
          Upload Spot Photos( Max 3 )
        </Button>

        <Form.Field>
          <p>Upload images so spot!</p>
        </Form.Field>
      </Form>
    </div>
  );
}

export default React.memo(Formy);
