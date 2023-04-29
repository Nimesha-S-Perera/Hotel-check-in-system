import { Button } from "primereact/button";
import React from "react";

const Addmodal = ({ data }) => {
  const { visible, setVisible } = data;
  return (
    <div>
      <div className="grid my-2">
        <div className=" col-12 md:col-6 lg:col-6 flex flex-row align-items-center gap-3">
          <p className="text-xl ml-3">Check-In List</p>
          <Button
            onClick={() => setVisible(true)}
            label="Add new room"
          ></Button>
        </div>
        <div className="col-12 md:col-6 md:justify-content-end lg:col-6 flex lg:justify-content-end align-items-center pl-4"></div>
      </div>
    </div>
  );
};

export default Addmodal;
