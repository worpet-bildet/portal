import { scryCharges } from '@urbit/api';
import Urbit from '@urbit/http-api';
import React, { useEffect, useState } from 'react';
import mockApi from "../../mocks/dev-view.json";
import { AddButtonTile } from '../components/AddButtonTile';
import { AppTile } from '../components/AppTile';
import { Sidebar } from '../components/Sidebar';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

// TODO(adrian): Add api call from ship to get applications
export class User extends React.Component {
  constructor(props) {
    super(props);
  }

  subscribe = () => {
    try {
      api.subscribe({
        app: "usr-server",
        path: "/render",
        event: this.handleUpdate,
        err: () => this.setErrorMsg("Subscription rejected"),
        quit: () => this.setErrorMsg("Kicked from subscription"),
        cancel: () => this.setErrorMsg("Subscription cancelled"),
      });
    } catch {
      this.setErrorMsg("Subscription failed");
    }
  };

  handleUpdate = (upd) => {
    console.log(upd);
  }

  setErrorMsg = (msg) => { throw new Error(msg); }
  

  async componentDidMount() {
    this.subscribe();
  }

  render() {
    return (
        <h1>User Page</h1>
    );
  }
}

// Example function call api
// async function init() {
//   return (await api.scry(scryCharges)).initial;
// }