import React, { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Description } from "@mui/icons-material";
import { isEmpty } from "lodash";
import { ItemTile } from "../../components/Item/ItemTile";
import { Footer } from "../../components/Footer";
import DialogSelect from "../../components/Dialog";
import { Sidebar } from "../../components/Sidebar";
import { Disclaimer } from "../../components/Disclaimer";
import { getUrbitApi } from "../../utils/urbitApi";
import ResponsiveAppBar from "../../components/AppBar";
import {
  getApps,
  getGroups,
  getLists,
  getShips,
  getOthers,
  useStore,
  getTypes,
} from "../../state/store";
// import { getGraph } from "@urbit/api";

export const AddItemButton = () => {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab size="small" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab size="medium" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
};
const api = getUrbitApi();

// TODO(adrian): Add api call from ship to get applications
export function User(props) {
  const appLists = useStore(getApps);
  const types = useStore(getTypes);
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    if (appLists?.length) {
      // setOpen(true);
    }
  }, [appLists]);

  const renderListsByType = _types =>
    Object.entries(_types)
      .filter(([type]) => type !== "list")
      .map(
        ([type, lists]) =>
          lists?.length &&
          lists.map(({ item, map }, _idx) => (
            <List key={_idx} item={item} map={map} type={type} />
          ))
      );

  const List = ({ item, map, type }) => (
    <div>
      <h3 className="text-2xl font-bold">{item?.data?.general?.title}</h3>
      <ul className="space-y-4">
        {!isEmpty(map)
          ? Object.entries(map).map(([key, val]) => (
              <ItemTile
                key={key}
                itemType={type}
                __title={getTitle(key, val, type)}
                __val={val}
                {...val}
              />
            ))
          : null}
      </ul>
    </div>
  );
  return (
    <Fragment>
      <ResponsiveAppBar />
      <div className="flex flex-row">
        {/* <Sidebar /> */}
        <div className="flex flex-col w-full min-h-screen">
          <main className="ml-32 basis-3/4 h-full">
            <div className="w-4/5 space-y-6 py-14">
              <h1 className="text-3xl font-bold">Discover Apps</h1>
              {/* <DialogSelect open={open} setOpen={setOpen} /> */}
              <Disclaimer
                color="blue"
                message={
                  "Below are apps in your curator's collection. By default, you are subscribed to the Portal Curator. You can subscribe to other curators at /usr/curs"
                }
              />
              {appLists ? (
                <div>
                  <h3 className="text-2xl font-bold">{}</h3>
                  {renderListsByType(types)}
                  <AddIcon />
                </div>
              ) : null}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}

export const getTitle = (key, val, type) => {
  if (val?.data?.bespoke?.keyObj.type.includes("ship")) {
    return val?.data?.bespoke?.keyObj.ship;
  }
  if (val?.data?.bespoke?.keyObj.type.includes("group")) {
    return `${val?.data?.bespoke?.keyObj.ship}/${val?.data?.bespoke?.keyObj.cord}`;
  }
  if (type === "list") {
    return val?.item?.data?.general?.title;
  }
};
