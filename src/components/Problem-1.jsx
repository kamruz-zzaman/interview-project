import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [tableData, setTableData] = useState([]); //decalare the state for table data
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  }); //this is for store inout data

  const handleClick = (val) => {
    setShow(val);
  };

  //   submit the input function
  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData([...tableData, formData]); //setting table data
    setFormData({
      name: "",
      status: "",
    }); // reset the input feilds
  };

  //   onchange get data from input feild
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //   makaing order fro all type of status
  const sortData = (data) => {
    const order = { active: 1, completed: 2 };
    return data.sort(
      (a, b) =>
        (order[a.status.toLowerCase()] || 3) -
        (order[b.status.toLowerCase()] || 3)
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                onChange={handleChange}
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={formData.name}
              />
            </div>
            <div className="col-auto">
              <input
                onChange={handleChange}
                type="text"
                name="status"
                className="form-control"
                placeholder="Status"
                value={formData.status}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {show === "active" || show === "completed"
                ? tableData
                    ?.filter((fill) => fill.status.toLowerCase() == show)
                    ?.map((data, i) => (
                      <tr key={i}>
                        <td>{data?.name}</td>
                        <td>{data?.status}</td>
                      </tr>
                    ))
                : sortData(tableData)?.map((data, i) => (
                    <tr key={i}>
                      <td>{data?.name}</td>
                      <td>{data?.status}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
