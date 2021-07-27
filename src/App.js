import "regenerator-runtime/runtime";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { logout } from "./utils";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";

import Login from "./Pages/Login";
import Fundraisers from "./Pages/Fundraisers";
// import Donations from "./Pages/Donations";
import Explore from "./Pages/Explore";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  // use React Hooks to store greeting in component state
  const [greeting, setGreeting] = React.useState();

  // when the user has not yet interacted with the form, disable the button
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false);

  // if not signed in, return early with sign-in prompt
  return (
    <Router>
      {!window.walletConnection.isSignedIn() ? (
        <Login />
      ) : (
        // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
        <>
          <Container>
            <Row>
              <Col>
                <h5>
                  Welcome to NEARfunding,{" "}
                  {window.walletConnection.getAccountId()}
                </h5>
              </Col>
              <Col>
                <button
                  className="link"
                  style={{ float: "right" }}
                  onClick={logout}
                >
                  Sign out
                </button>
              </Col>
            </Row>
          </Container>
          <Container>
            <Nav fill variant="tabs" activeKey={window.location.pathname}>
              <Nav.Item>
                <Nav.Link href="/explore">Explore</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/fundraisers">My Fundraisers</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link href="/donations">Donations</Nav.Link>
              </Nav.Item> */}
            </Nav>
          </Container>
          <Switch>
            <Route exact path="/" component={Explore} />
            <Route path="/explore" component={Explore} />
            <Route path="/fundraisers" component={Fundraisers} />
            {/* <Route path="/donations" component={Donations} /> */}
          </Switch>
        </>
      )}
    </Router>
  );
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`;
  return (
    <aside>
      <a
        target="_blank"
        rel="noreferrer"
        href={`${urlPrefix}/${window.accountId}`}
      >
        {window.accountId}
      </a>
      {
        " " /* React trims whitespace around tags; insert literal space character when needed */
      }
      called method: 'setGreeting' in contract:{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href={`${urlPrefix}/${window.contract.contractId}`}
      >
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  );
}
