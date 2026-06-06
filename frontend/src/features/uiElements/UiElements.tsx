import React from "react";
import Button from "../../components/shared/button/Button";
import Input from "../../components/inputs/input/Input";
import Radio from "../../components/inputs/radio/Radio";
// import Checkbox from '../components/inputs/Checkbox';
import Select from "../../components/inputs/select/Select";
import ProgressBar from "../../components/shared/progressBar/ProgressBar";
import SwitchButton from "../../components/shared/switchButton/SwitchButton";
// import Tooltip from '../components/shared/ToolTip';
import Table from "../../components/shared/table/Table";
import Alert from "../../components/shared/alert/Alert";
import Footer from "../../components/shared/footer/Footer";

export default function UiElements() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
  ];

  return (
    <div>
      <div className="text-center">UiElements</div>
      <div className="p-50">
        Buttons
        {/* <div className='d-flex justify-space-between'>
                    <Button>Primary</Button>
                    <Button variant={'success'}>Success</Button>
                    <Button variant={'pending'}>Pending</Button>
                    
                </div> */}
      </div>
      <div className="p-50">
        Input
        <div className="d-flex justify-space-between">
          <Input
            placeholder="This is placeholder text"
            height={100}
            customClass={"test-class"}
            customStyles={{ background: "white" }}
          />
        </div>
      </div>
      <div className="p-50">
        Radio
        <div className="d-flex justify-space-between">
          <Radio />
        </div>
      </div>

      <div className="p-50">
        Checkbox
        <div className="d-flex justify-space-between">{/* <Checkbox /> */}</div>
      </div>

      <div className="p-50">
        Checkbox
        <div className="d-flex justify-space-between">
          <Select variant={"single-select"} />
          <Select variant={"multi-select"} />
        </div>
      </div>
      <div className="p-50">
        Multi Select Checkbox
        <div className="d-flex justify-space-between">
          <Select variant={"multi-select"} />
        </div>
      </div>
      <div className="p-50">
        Progress Bar
        <div className="d-flex justify-space-between">
          <ProgressBar progress={60} />
        </div>
      </div>
      <div className="p-50">
        Switch Button
        <div className="d-flex justify-space-between">
          <SwitchButton />
        </div>
      </div>
      <div className="p-50">
        Tooltip
        <div className="d-flex justify-space-between">{/* <Tooltip /> */}</div>
      </div>
      <div className="p-50">
        Table
        <div className="d-flex justify-space-between">
          <Table columns={columns} data={data} />
        </div>
      </div>
      <div className="p-50">
        Alert Box
        <div className="d-flex flex-column" style={{ gap: "10px" }}>
          <Alert type={"info"} />
          <Alert type={"success"} />
          <Alert type={"error"} />
          <Alert type={"warning"} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
