import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import axios from "../../Axios/AxiosInstance";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import { changedisplaystyle } from "../../Utilities/roomutilities/changedisplaystyle";

//core
import "primereact/resources/primereact.min.css";
import Addmodal from "./Addmodal";


function Table() {
  const [visible, setVisible] = useState(false);
  const [info, setinfo] = useState("");
  const [room, setroom] = useState("");
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [deleteroom, setdeleteroom] = useState(null);
  const [roomsuite, setroomsuite] = useState("");
  const [editroom, seteditroom] = useState(null);

  // const [checked, setChecked] = useState(true);

  const [numberofrooms, setnumberofrooms] = useState("");
  const [generateroomtype, setgenerateroomtype] = useState("");
  const [outoforderstate, setoutoforderstate] = useState("");

  const [roomvali, setroomvali] = useState(false);
  console.log(info[1]);

  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
      life: 3000,
    });
  };

  const roomtypes = [
    { name: "Standard", code: "St" },
    { name: "Deluxe", code: "De" },
  ];

  const createrooms = (e) => {
    e.preventDefault();
    const { name: roomsuite } = generateroomtype;
    if (!numberofrooms) {
      console.log("empty");
      toast.current.show({
        severity: "error",
        summary: "fill required information",
        detail: "Message Content",
        life: 3000,
      });
      return;
    }
    if (!roomsuite) {
      console.log("roomsuiteempty");
      toast.current.show({
        severity: "error",
        summary: "fill required information",
        detail: "Message Content",
        life: 3000,
      });
      return;
    }

    const enterrooms = async () => {
      console.log(numberofrooms, roomsuite);
      const resp = await axios.post("/room", {
        num_rooms: numberofrooms,
        room_suite: roomsuite,
      });
      setinfo(changedisplaystyle(resp.data));
    };
    toast.current.show({
      severity: "success",
      summary: "Successfully generated",
      detail: "Message Content",
      life: 3000,
    });
    enterrooms();
    setVisible(false);
    setnumberofrooms("");
    setgenerateroomtype("");
  };

  const generaterooms = (e) => {
    const value = Number(e.target.value);
    setroomvali(false);
    if (value > 20) {
      setnumberofrooms("");
      setroomvali(true);

      return;
    }
    if (value == "") {
      setnumberofrooms("");
    }
    if (!value) {
      setnumberofrooms("");
      return;
    }

    setnumberofrooms(value);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
    setroomsuite("");
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const editProduct = (product) => {
    seteditroom(product.roomNo);
    setProductDialog(true);
  };

  const deleteProduct = () => {
    const delroom = async () => {
      const resp = await axios.delete(
        `/room/${deleteroom}`
      );
      setinfo(changedisplaystyle(resp.data));
    };
    delroom();
    setDeleteProductDialog(false);
  };

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });

  useEffect(() => {
    const aa = async () => {
      const resp = await axios.get("/rooms");
      setinfo(changedisplaystyle(resp.data));
    };
    aa();
  }, []);

  const getSeverity = (status) => {
    switch (status) {
      case "Available":
        return "success";
      case "Booked":
        return "danger";
      case "renewal":
        return null;
    }
  };

  const confirmDeleteProduct = (product) => {
    setdeleteroom(product.roomNo);
    setDeleteProductDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    if (rowData.status === "Booked") {
      return "-";
    }
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="mr-2  bg-gray-50  border-none  text-bluegray-900"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="  bg-gray-50  border-none  text-red-500"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const outofuse = (data) => {
    const sss = async () => {
      const resp = await axios.post(
        "/room/outoforder",
        {
          room: data.roomNo,
          status: data.outoforder ? false : true,
        }
      );
      setinfo(changedisplaystyle(resp.data));
    };
    sss();
  };

  const useToggler = (rowData) => {
    if (rowData.status === "Booked") {
      return <InputSwitch disabled />;
    }
    return (
      <InputSwitch
        checked={rowData.outoforder}
        onChange={() => {
          outofuse(rowData);
        }}
      />
    );
  };

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            value={value || ""}
            onChange={(e) => onGlobalFilterChange(e)}
            placeholder="search"
          />
        </span>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const editroomsuite = () => {
    const { name: suitetype } = roomsuite;
    if (suitetype) {
      const editerroom = async () => {
        const resp = await axios.post(
          "/update/rooms",
          {
            room: editroom,
            type: suitetype,
          }
        );
        setinfo(changedisplaystyle(resp.data));
      };
      editerroom();
      setroomsuite("");
    }
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
      life: 3000,
    });
    setProductDialog(false);
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={editroomsuite} />
    </React.Fragment>
  );

  const header = renderHeader();

  return (
    <>
      <Toast ref={toast} />
      <Addmodal data={{ visible, setVisible }} />
      <DataTable
        value={info}
        paginator
        rows={10}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selectionMode="single"
        dataKey="id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No customers found."
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field="roomNo"
          header="roomNo"
          sortable
          style={{ width: "auto" }}
        ></Column>
        <Column
          field="status"
          header="status"
          body={statusBodyTemplate}
          sortable
          style={{ width: "auto" }}
        ></Column>
        <Column
          field="roomType"
          header="roomtype"
          sortable
          style={{ width: "auto" }}
        ></Column>
        <Column
          header="Out of Order"
          body={useToggler}
          style={{ width: "auto" }}
        ></Column>
        <Column
          header="Actions"
          body={actionBodyTemplate}
          exportable={false}
          style={{ width: "auto" }}
        ></Column>
      </DataTable>
      <Dialog
        header="Add New Room"
        visible={visible}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "80vw" }}
        onHide={() => setVisible(false)}
      >
        <h3>Room Detials</h3>
        <form>
          <div className="grid mb-6 ">
            <div className="col-12 lg:col-4">
              <label htmlFor="roomnumber">Number of Rooms</label>
              <InputText
                type="text"
                value={numberofrooms}
                onChange={(e) => generaterooms(e)}
                id="roomnumber"
                className="w-full mt-2"
              />
              {roomvali && (
                <p className="mt-2 text-red-500">Cant generate more than 20</p>
              )}
            </div>
            <div className="col-12 lg:col-4">
              <label htmlFor="roomnumber">Suite</label>
              <Dropdown
                value={generateroomtype}
                onChange={(e) => setgenerateroomtype(e.value)}
                options={roomtypes}
                optionLabel="name"
                placeholder="Select"
                className="w-full mt-2 align-self-end"
              />
            </div>
          </div>
          <div className="flex justify-content-end">
            <Button
              onClick={(e) => createrooms(e)}
              label="Add New Rooms"
            ></Button>
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {info && (
            <span>
              Are you sure you want to delete <b>{deleteroom}</b>?
            </span>
          )}
        </div>
      </Dialog>
      {/* edit */}
      <Dialog
        visible={productDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Room"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <form>
          <div className="grid">
            <div className="col-12 md:col-6 mb-6">
              <label htmlFor="roomnumber">Change Room Suite</label>
              <Dropdown
                value={roomsuite}
                onChange={(e) => setroomsuite(e.value)}
                options={roomtypes}
                optionLabel="name"
                placeholder="Select"
                className="w-full mt-2"
              />
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
}

export default Table;
