import React, { Fragment, useEffect, useState } from "react";
import { AppTile } from "../../components/AppTile";
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
import { Description } from "@mui/icons-material";
import { isEmpty } from "lodash";
// import { getGraph } from "@urbit/api";

const api = getUrbitApi();

// TODO(adrian): Add api call from ship to get applications
export function User(props) {
  // const [applications, setApplications] = useState([]);
  const appLists = useStore(getApps);
  const types = useStore(getTypes);
  const [open, setOpen] = useState(false);
  // const groupLists = useStore(getGroups);

  useEffect(() => {
    // subscribe();
    if (appLists?.length) {
      // setApplications(appLists);
      setOpen(true);
    }
  }, [appLists]);

  // const subscribe = async () => {
  //   try {
  //     api.subscribe({
  //       app: "usr-server",
  //       path: "/render",
  //       event: handleUpdate,
  //       err: () => setErrorMsg("Subscription rejected"),
  //       quit: () => setErrorMsg("Kicked from subscription"),
  //       cancel: () => setErrorMsg("Subscription cancelled"),
  //     });
  //   } catch {
  //     setErrorMsg("Subscription failed");
  //   }
  // };
  const handleUpdate = curators => {
    // setApplications(getApplications(curators));
  };
  const setErrorMsg = msg => {
    throw new Error(msg);
  };
  const getApplications = curators => {};
  return (
    <Fragment>
      <ResponsiveAppBar />
      <div className="flex flex-row">
        {/* <Sidebar /> */}
        <div className="flex flex-col w-full min-h-screen">
          <main className="ml-32 basis-3/4 h-full">
            <div className="w-4/5 space-y-6 py-14">
              <h1 className="text-3xl font-bold">Discover Apps</h1>
              <DialogSelect open={open} setOpen={setOpen} />

              <Disclaimer
                color="blue"
                message={
                  "Below are apps in your curator's collection. By default, you are subscribed to the Portal Curator. You can subscribe to other curators at /usr/curs"
                }
              />
              {appLists ? (
                <div>
                  <h3 className="text-2xl font-bold">{}</h3>
                  {Object.entries(types).map(([type, lists]) => {
                    if (lists.length) {
                      return lists.map((list, _idx) => {
                        const { item, map } = list;
                        const general = item?.data?.general;
                        const { color, Description, image, link, pictures, tags, title } =
                          general;
                        return (
                          <div key={_idx}>
                            <h3 className="text-2xl font-bold">{title}</h3>
                            <ul className="space-y-4">
                              {/* <AppTile key={app.id} appName={app.key["app-name"]} {...app} /> */}
                              {!isEmpty(map)
                                ? Object.entries(map).map(([key, val]) => {
                                    return (
                                      <AppTile
                                        key={key}
                                        singleVal={val ? null : key}
                                        appName={val?.data?.general?.title}
                                        {...val?.data?.bespoke?.payload}
                                        docket={{
                                          ...val?.data?.bespoke?.payload?.docket,
                                          ...val?.data?.general,
                                        }}
                                        __type={type}
                                        __key={key}
                                        __title={getTitle(key, val, type)}
                                        __val={val}
                                        {...val}
                                      />
                                    );
                                  })
                                : null}
                            </ul>
                          </div>
                        );
                      });
                    }
                  })}
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
