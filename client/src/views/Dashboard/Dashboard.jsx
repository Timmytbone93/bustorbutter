import { useState, useContext } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import UserContext from "../../context/UserContext/UserContext";
import BannerContext from "../../context/BannerContext/BannerContext";
import Formy from "../../components/Form/Formy";
import Banner from "../../components/Banner/Banner";
import { Container, Divider, Button } from "semantic-ui-react";

function Dashboard() {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [banner, setBanner] = useContext(BannerContext);
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="Dashboard">
      <Container fluid>
        {currentUser.authenticated && showForm && (
          <Formy params={{ labels: [], data: {} }} setShowForm={setShowForm} />
        )}

        {banner.show && <Banner />}

        <Navbar setShowForm={setShowForm} showForm={showForm} />
        <br />
        <Container>
          <Divider>
            <Button
              onClick={() => {
                setBanner({
                  ...banner,
                  show: true,
                  type: "failure",
                  msg: "Failure Banner Example",
                });
              }}
            >
              test Banner
            </Button>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              vulputate faucibus metus, id faucibus leo pretium et. Praesent
              dictum orci ut maximus feugiat. Sed urna sem, suscipit nec neque
              quis, consectetur pellentesque elit. Aliquam erat volutpat.
              Pellentesque feugiat magna et sagittis sollicitudin. Praesent quis
              lacus quam. Donec non nunc lobortis, elementum erat in, congue
              justo. Ut finibus ex tellus, quis sollicitudin ipsum elementum et.
              Proin scelerisque congue ipsum at vehicula. Sed non tempor mauris,
              eget rhoncus turpis. Praesent rutrum eleifend odio, id egestas
              libero auctor non. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Ut in quam diam. Etiam id tortor mollis,
              fermentum turpis id, lobortis erat. Maecenas bibendum tortor ex,
              ac blandit mauris feugiat ut. Donec sapien ligula, tempor vitae
              dui in, suscipit egestas sapien. Aliquam non neque nibh. Morbi eu
              dictum odio. Vestibulum ligula lectus, consectetur eu urna sit
              amet, tincidunt consequat nibh. Nulla et rutrum urna. Fusce vitae
              nunc sed neque tempus porta in quis arcu. Suspendisse quis
              malesuada enim. In varius aliquam velit et tincidunt. Vestibulum
              ut orci sed ipsum viverra faucibus vel vitae lorem. Sed eget elit
              id elit placerat ornare ac non purus. Mauris euismod rhoncus
              augue, in mattis tellus cursus sit amet. Nam nulla metus, accumsan
              ut velit sed, pharetra venenatis diam. Vestibulum id nulla
              egestas, rhoncus nunc non, hendrerit sem. Ut auctor, nisi nec
              sollicitudin gravida, tellus augue sollicitudin nisl, ut varius
              lorem mauris a justo. Integer neque metus, laoreet at tempus eu,
              pretium vitae turpis. Sed vitae rutrum quam. Donec id lorem velit.
              Integer ut libero lacinia, bibendum ipsum ac, elementum enim. Cras
              euismod neque leo, a laoreet neque pulvinar vel. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Integer convallis pellentesque sapien. Aliquam
              vitae nisl a nibh tincidunt ornare. Integer vitae feugiat velit.
              Integer euismod fermentum velit ac blandit. Aliquam ut libero
              porttitor, congue ligula eget, ultricies lorem. Aenean in nisi
              urna. Nulla mollis eu ante semper faucibus. Sed vehicula imperdiet
              diam non pharetra. Donec in odio egestas, tempor risus sit amet,
              tempus quam. Nam iaculis malesuada sollicitudin. Proin eu velit
              diam. Nullam a sodales ex. Aenean nec libero condimentum, suscipit
              mi sed, ultricies leo. Praesent porttitor pretium molestie. Aenean
              semper vehicula dignissim. Proin porta nulla id nulla congue
              consequat. Aenean euismod velit feugiat convallis lacinia. Sed
              congue, est vitae mattis ultricies, leo lacus semper velit, non
              laoreet turpis enim eu felis. Donec ante metus, tempus euismod
              mauris et, vulputate gravida erat. Aenean congue nisi nunc, et
              pharetra lacus varius in.
            </p>
          </Divider>
        </Container>
      </Container>
    </div>
  );
}

export default Dashboard;
