import { useState } from "react";
import MasterProdukIndex from "./index";
import MasterProdukAdd from "./add";
import MasterProdukEdit from "./update";

export default function MasterProduk() { 
  const [pageMode, setPageMode] = useState("index");
  const [dataID, setDataID] = useState();

  function getPageMode() {
    switch (pageMode) {
      case "index":
        return <MasterProdukIndex onChangePage={handleSetPageMode} />; 
      case "add":
        return <MasterProdukAdd onChangePage={handleSetPageMode} />; 
      case "update":
        return (
          <MasterProdukEdit
            onChangePage={handleSetPageMode}
            withID={dataID}
          />
        );
      case "edit":
        return (
          <MasterProdukEdit 
            onChangePage={handleSetPageMode}
            withID={dataID}
          />
        );
      default:
        return null;
    }
  }

  function handleSetPageMode(mode, withID) { 
    setDataID(withID);
    setPageMode(mode);
  }

  return <div>{getPageMode()}</div>;
}
