import React, { useState } from "react";
import Remove from "./delete_icon.png";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

const CustomRenderer = (props) => {
  const [value, setValue] = useState(props.value);
  const [startDate, setStartDate] = useState(new Date());
  console.log("Custom props", props);
  const onChangeValue = (event) => {
    props.onChangeValue(event.target.value);
    setValue(event.target.value);
  };
  const removeHandle = (e) => {
    alert("click");
    let deletedRow = props.node.data;
    e.gridApi.updateRowData({ remove: [deletedRow] });
    props.onChangeValue();
  };
  return (
    <div>
      {props.label === "Gender" && (
        <select className="dropdown" value={value} onChange={onChangeValue}>
          {props.dropdownData.map((val) => {
            return <option value={val}>{val}</option>;
          })}
        </select>
      )}
      {props.label === "Button" && (
        <div>
          <button
            className="removeButton"
            onClick={() => {
              removeHandle(props.node);
            }}
          >
            <img src={Remove} alt="" />
          </button>
        </div>
      )}
      {props.label === "Date" && (
        <div>
          <DatePicker
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
      )}
    </div>
  );
};
export default CustomRenderer;
