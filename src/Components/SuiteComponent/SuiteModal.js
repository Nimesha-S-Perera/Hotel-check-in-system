import React, { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import axios from "../../Axios/AxiosInstance";
import { Card } from "primereact/card";
export default function SuiteModalForCheckIn({ onClick }, props) {
  const [visible, setVisible] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [priceFB, setPriceFB] = useState("");
  const [priceBB, setPriceBB] = useState("");
  const handleSuite = (e) => {
    e.preventDefault();
    axios
      .post("/roomPackage", {
        roomType: roomType,
        pricefb: priceFB,
        pricebb: priceBB,
      })
      .then((response) => {
        console.log(response.data);
        setVisible(false);
        window.location.reload(); //reloading the page afer submitting the form
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const footerContent = (
    <div>
      <Button label="Check-In" onClick={handleSuite} />
    </div>
  );
  return (
    <div className="card flex justify-content-center w-50rem">
      <Button
        label="Add New Suite"
        size="small"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Add New Suite"
        className="text-xl font-normal"
        size="small"
        visible={visible}
        style={{ width: "50rem" }}
        onHide={() => setVisible(false)}
      >
        <Card>
          <p className="m-0 text-base mb-4 font-normal">Suite Information</p>
          <form onSubmit={handleSuite}>
            <div className="card">
              <div className="formgrid grid ">
                <div className="field col-12 md:col-4 text-sm">
                  <label className="flex flew-row gap-1" htmlFor="name">
                    Suite Name
                  </label>
                  <InputText
                    id="name"
                    className="p-field w-full"
                    name="roomType"
                    value={roomType}
                    onChange={(event) => setRoomType(event.target.value)}
                  />
                </div>
                <div className="field col-12 md:col-4 text-sm">
                  <label className="flex flew-row gap-1" htmlFor="nic">
                    Price/per Night - FB(LKR)
                  </label>
                  <InputText
                    id="priceFB"
                    className="p-field w-full"
                    value={priceFB}
                    onChange={(event) => setPriceFB(event.target.value)}
                  />
                </div>
                <div className="field col-12 md:col-4 text-sm">
                  <label
                    className="flex flew-row gap-1"
                    htmlFor="contactNumber"
                  >
                    {" "}
                    Price/per Night - BB(LKR)
                  </label>
                  <InputText
                    id="priceBB"
                    className="p-field w-full"
                    value={priceBB}
                    onChange={(event) => setPriceBB(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="card flex justify-content-end">
              <div className="flex flex-wrap gap-2">
                <Button
                  label="Check-in"
                  footer={footerContent}
                  size="small"
                  className="bg-primary outline-none"
                />
              </div>
            </div>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}
