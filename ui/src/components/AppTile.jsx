import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tag } from "./Tag";

export function AppTile(props) {
  const { keyStr, keyObj, keywords, docket, data, singleVal } = props;
  const title = data?.general?.title || props?.__title || props?.appName;
  const [imageError, setImageError] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isShipUser = location.pathname.split("/")[3] === "usr";
    setIsUser(isShipUser);
  }, [location.pathname]);

  const formatAppUriKey = ({ _keyStr, ship, type, cord }) => {
    // TODO: Make cord URL safe
    const appUriKey = (
      _keyStr
        ? _keyStr.slice(1) //.replaceAll(".", "-")
        : singleVal
        ? singleVal.slice(1)
        : `${ship}${type}${cord?.replaceAll(".", "-")}`
    ).replaceAll("/", "_");

    return appUriKey;
  };
  const getAppUriKey = ({ _keyStr, _keyObj }) => {
    return formatAppUriKey({ _keyStr, ..._keyObj });
  };
  const appUriKey = getAppUriKey({
    _keyStr: keyStr || props?.item?.keyStr,
    _keyObj: keyObj || props?.item?.keyObj,
  });
  const getSingleVal = _singleVal => {
    if (!_singleVal) return;

    const frags = _singleVal.slice().split("/");
    return `${frags[1]}/${frags[frags.length - 1]}`;
  };
  return docket ? (
    <li className="flex items-center space-x-3 text-sm leading-tight">
      <Link
        to={`/apps/portal/${!isUser ? `dev` : `usr`}/apps/${appUriKey}`}
        className="w-full p-4 rounded border border-black hover:bg-gray-200"
      >
        <div className="flex flex-row flex-auto justify-between">
          <div className="flex flex-row">
            <div
              className="flex-none relative w-20 h-20 mr-10 rounded-lg bg-gray-200 overflow-hidden"
              style={{ backgroundColor: "aliceblue" }}
            >
              {!imageError && (
                <img
                  className="h-full w-full object-cover"
                  src={
                    docket?.image ||
                    data?.general?.image ||
                    data?.icon?.src ||
                    "https://via.placeholder.com/100"
                  }
                  alt=""
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-2xl font-bold">{title || getSingleVal(singleVal)}</p>
              {keywords && (
                <ul className="flex flex-wrap gap-2">
                  {keywords.map((tag, i) => (
                    <Tag key={`${title}_${tag}_${i}`} name={tag} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </Link>
      {!isUser ? (
        <div className="flex">
          <div className="relative">
            <Link
              to={`/apps/portal/dev/edit-app/${appUriKey}`}
              className="absolute right-32 top-0 mt-auto mb-auto ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-2 px-5"
            >
              edit
            </Link>
          </div>
          {/* <div className="relative">
            <button
              type="button"
              className="absolute right-6 top-0 mt-auto mb-auto ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-2 px-5"
              onClick={() => deleteApp()}
            >
              delete
            </button>
          </div> */}
        </div>
      ) : null}
    </li>
  ) : null;
}
