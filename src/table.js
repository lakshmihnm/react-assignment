import "./App.css";
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import CustomRenderer from "./customDrodown";
import ValidationCellEditor from './validations';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Table = () => {
  const [gridApi, setGridApi] = useState(null);
  const [submittedRowData, setSubmittedRowData] = useState([]);

  const [rowData, setRowData] = useState([
    {
      id: 1,
      name: "Test",
      email: "test@gmail.com",
      gender: "Female",
      dob: "15-08-1993",
      country: "India",
      city: "Bengaluru",
    },
    {
      id: 2,
      name: "John",
      email: "john@gmail.com",
      gender: "Male",
      dob: "15-09-1992",
      country: "India",
      city: "Delhi",
    },
    {
      id: 3,
      name: "Joy",
      email: "joy@gmail.com",
      gender: "Male",
      dob: "15-08-1992",
      country: "Kenada",
      city: "Kolkata",
    },
  ]);

  const [frameworkComponents, setFrameworkComponents] = useState({
    customRenderer: CustomRenderer,
  });
//   const ValueSetterParams = {
//     oldValue: '', // the value before the change
//     newValue: '', // the value after the change
//     data: '', // the data you provided for this row
//     node: '', // the row node for this row
//     colDef: ColDef, // the column def for this column
//     column: Column, // the column for this column
//     api: GridApi, // the grid API
//     columnApi: ColumnApi, // the grid Column API
//     context: any  // the context
// }
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const onChangeValue = () => {};
  const onRemoveHandler = (e) => {
    // let deletedRow = this.props.node.data;
    // e.gridApi.updateRowData({ remove: [deletedRow] })
  };
  // The value setter function/method
//   const value1Setter = (params: ValueParserParams) => {
//   // Value is legit - set it and signal the value has been changed/set
//   if (params.newValue > 0) {
//       params.data[params.colDef.field] = params.newValue;
//       return true;
//   }
//   // Illegal value - signal no change
//   return false;
// }
  const gridColumns = [
    {
      headerName: "Id",
      field: "id",
      checkboxSelection: true,
      cellEditorParams: { required: true },
      cellEditor: ValidationCellEditor
    },
    {
      headerName: "Name",
      field: "name",
      cellEditorParams: { required: true },
    },
    {
      headerName: "Email",
      field: "email",
      cellEditorParams: { required: true },
    },
    {
      headerName: "Gender",
      field: "gender",
      cellRenderer: "customRenderer",
      cellRendererParams: {
        onChangeValue: onChangeValue,
        dropdownData: ["Male", "Female"],
        label: "Gender",
      },
      cellEditorParams: { required: true },
    },
    {
      headerName: "DOB",
      field: "dob",
      type: "dateColumn",
      cellEditorParams: { required: true },
      cellRenderer: "customRenderer",
      cellRendererParams: {
        label: "Date",
      },
    },
    {
      headerName: "Country",
      field: "country",
      cellRenderer: "customRenderer",
      cellRendererParams: {
        // onChangeValue: onRemoveHandler,
        dropdownData: ["India", "US", "Kenada"],
        label: "Gender",
      },
      cellEditorParams: { required: true },
    },
    {
      headerName: "City",
      field: "city",
      cellEditorParams: { required: false },
    },
    {
      headerName: "",
      cellRenderer: "customRenderer",
      cellRendererParams: {
        onChangeValue: onRemoveHandler,
        // dropdownData: ["Male", "Female"],
        label: "Button",
      },
      sortable: false,
      editable: false,
      filter: false,
    },
  ];

  const submittedGridColumns = [
    { headerName: "Id", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    {
      headerName: "Gender",
      field: "gender",
    },
    { headerName: "DOB", field: "dob", type: "dateColumn" },
    { headerName: "Country", field: "country" },
    { headerName: "City", field: "city" },
  ];
  const defaultDefs = {
    sortable: true,
    editable: true,
    filter: true,
    cellEditorParams: { required: true },
  };

  console.log("Child render");
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };
  //ag-Grid add new row functions
  const onAddRowHandler = () => {
    gridApi.updateRowData({
      add: [
        {
          id: "Id",
          name: "Name",
          email: "Email",
          gender: "Gender",
          dob: "DOB",
          country: "Country",
          city: "City",
        },
      ],
    });
    rowData.push({
      id: rowData.length + 1,
      name: "Name",
      email: "Email",
      gender: "Gender",
      dob: "DOB",
      country: "Country",
      city: "City",
    });
    setRowData(rowData);
  };
  useEffect(() => {
    console.log("useEffect", gridApi);
  });

  const deleteRowsHandler = () => {
    const selectedRows = gridApi.getSelectedRows();
    console.log("selectedRows:", selectedRows, gridApi);
    gridApi.applyTransaction({ remove: selectedRows });
    // const nonSelectedArray = gridApi.
    console.log("rowData:", rowData);
    return true;
  };

  const submitRowDataHandler = () => {
    let selectedNodes = gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    // alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    console.log("select Data:", selectedData);
    setSubmittedRowData(selectedData);
    // return selectedData;
  };
  const deleteNonSelectedRowsHandler = () => {
    const selectedRows = gridApi.getSelectedRows();
    const indexes = selectedRows.map((row) => row.id);
    console.log("selectedRows:", selectedRows, indexes);
    const unselectedRowData = [];
    rowData.map((row, i) => {
      if (!indexes.includes(row.id)) unselectedRowData.push(row);
    });
    gridApi.applyTransaction({ remove: unselectedRowData });
    // const nonSelectedArray = gridApi.
    console.log("rowData:Remove ******", rowData, unselectedRowData);
    return true;
  };

  return (
    <div className="container">
      <div className="ag-theme-alpine" style={{ height: 300, width: 1402 }}>
        <button className="buttons" onClick={onAddRowHandler}>
          Add Row
        </button>
        <button className="buttons" onClick={deleteRowsHandler}>
          Delete Selected Rows
        </button>
        <button className="buttons" onClick={deleteNonSelectedRowsHandler}>
          Delete Non Selected Rows
        </button>
        <button className="buttons" onClick={submitRowDataHandler}>
          Submit
        </button>
        <AgGridReact
          rowData={rowData}
          columnDefs={gridColumns}
          defaultColDef={defaultDefs}
          onGridReady={onGridReady}
          frameworkComponents={frameworkComponents}
          rowSelection="multiple"
        ></AgGridReact>
      </div>
      <h4>Submitted data</h4>
      <div className="ag-theme-alpine" style={{ height: 300, width: 1402 }}>
        <AgGridReact
          rowData={submittedRowData}
          columnDefs={submittedGridColumns}
        ></AgGridReact>
      </div>
    </div>
  );
};
export default Table;
