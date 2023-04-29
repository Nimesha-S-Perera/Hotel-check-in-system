import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "../../Axios/AxiosInstance";

export default function RoomDetailsTable() {
  const [roomDetails, setRoomDetails] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    useEffect(() => {
        axios
            .get("/roomDetails")
            .then((response) => setRoomDetails(response.data))
            .catch((error) => console.error(error));
    }, []);
  const renderHeader = () => {
    return (
      <div className="table-header">
        <span className="p-input-icon-left searchNav">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search Suite Name"
          />
        </span>
      </div>
    );
  };

  const renderActions = (rowData, column) => {
    if (column.rowIndex >= 2) {
      if (deleteConfirmation === rowData.roomType) {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              icon="pi pi-check"
              onClick={() => handleConfirmDelete(rowData.roomType)}
              className="p-button-danger p-ml-2"
              style={{ background: "none", color: "red", border: "none" }}
            />
            <i
              className="pi pi-times"
              onClick={() => setDeleteConfirmation(null)}
              style={{ marginLeft: "5px", color: "" }}
            />
          </div>
        );
      } else {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              icon="pi pi-pencil"
              onClick={() => console.log("Edit clicked")}
              style={{
                background: "transparent",
                color: "black",
                border: "none",
              }}
            />
            <i
              className="pi pi-trash"
              onClick={() => setDeleteConfirmation(rowData.roomType)}
              style={{ marginLeft: "5px", color: "red" }}
            />
          </div>
        );
      }
    } else {
      return (
        <Button
          icon="pi pi-pencil"
          onClick={() => console.log("Edit clicked")}
          style={{ background: "transparent", color: "black", border: "none" }}
        />
      );
    }
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

    const handleConfirmDelete = (roomType) => {
        axios
            .delete(`/roomPackage/${roomType}`)
            .then(() => {
                const newRoomDetails = roomDetails.filter(
                    (rowData) => rowData.roomType !== roomType
                );
                setRoomDetails(newRoomDetails);
                setDeleteConfirmation(null);
            })
            .catch((error) => console.error(error));
    };
  const onRowEditComplete = (e) => {
    console.log(e);
    let _products = [...roomDetails];
    let { newData, index } = e;

    _products[index] = newData;

    setRoomDetails(_products);
  };
  return (
    <div className="card">
      <DataTable
        value={roomDetails}
        onRowEditComplete={onRowEditComplete}
        editMode="row"
        dataKey="id"
        paginator
        rows={4}
        tableStyle={{ minWidth: "50rem", padding: "0 1rem" }}
        header={renderHeader()}
        globalFilter={globalFilter}
      >
        <Column
          field="roomType"
          header="Suite Name"
          style={{ width: "25%" }}
          editor={(options) => textEditor(options)}
          filterPlaceholder="Search Suite Name"
        />
        <Column
          field="price(FB)"
          header="Price/per Night (FB)"
          editor={(options) => textEditor(options)}
          style={{ width: "25%" }}
        />

        <Column
          field="price(BB)"
          header="Price/per Night (BB)"
          editor={(options) => textEditor(options)}
          style={{ width: "25%" }}
        />
        <Column
          header="Actions"
          rowEditor
          body={renderActions}
          style={{ width: "25%" }}
        />
      </DataTable>
    </div>
  );
}
