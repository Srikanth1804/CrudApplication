import React, { useEffect, useState } from "react";
import "../App.css";
import Axios from "axios";
import { API_Endpoint } from "./GeneralData";
const StudentData = () => {
  let [name, setname] = useState("");
  let [age, setage] = useState("");
  let [city, setcity] = useState("");

  let [Showdata, Setshowdata] = useState([]);
  let [Toast, Settoast] = useState(false);

  let [Update, Setupdate] = useState("");
  let [Search, Setsearch] = useState("");

  let HandleToast = () => {
    Settoast(true);
    setname("");
    setage("");
    setcity("");
    Setupdate("");
  };

  let HandleSubmit = (e) => {
    e.preventDefault();

    let CapitalizeFirstLetter = (str) => {
      return str

        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    let Userdata = {
      name: CapitalizeFirstLetter(name),
      age,
      city: CapitalizeFirstLetter(city),
    };
    console.log(Userdata);

    window.location.reload();

    if (Update) {
      Axios.put(`${API_Endpoint}/data/updatedata/${Update}`, Userdata)
        .then((res) => {
          console.log(res.data);
          Settoast(false);
          Fetchdata();
          Setupdate("");
        })
        .catch((e) => {
          console.log("Update Failed!");
        });
    } else {
      Axios.post(`${API_Endpoint}/data/adddata`, Userdata)
        .then((res) => {
          console.log(res.data);
          Settoast(false);
          Fetchdata();
        })
        .catch((e) => {
          console.log("Data Create Failed!");
        });
      setname("");
      setage("");
      setcity("");
    }
  };

  let Fetchdata = () => {
    Axios.get(`${API_Endpoint}/data/getdata`)
      .then((res) => {
        Setshowdata(res.data.info);
        console.log(res.data);
      })
      .catch((e) => {
        console.log("Fetching Data Failed!");
      });
  };

  useEffect(() => {
    Fetchdata();
  }, []);

  let HandleDelete = (id) => {
    let Confirmation = window.confirm(
      "Are you sure want to delete this student?"
    );

    if (Confirmation) {
      Axios.delete(`${API_Endpoint}/data/deletedata/${id}`)
        .then((res) => {
          console.log("Data deleted!");
          Fetchdata();
        })
        .catch((e) => {
          console.log(e);
        });
      console.log(id);
    } else {
      console.log("Delete action cancelled!");
    }
  };

  let HandleEdit = (id) => {
    Axios.get(`${API_Endpoint}/data/getbyid/${id}`)
      .then((res) => {
        let Student = res.data.info;
        setname(Student.Name);
        setage(Student.Age);
        setcity(Student.City);
        Setupdate(id);
        Settoast(true);
      })
      .catch((e) => {
        console.log("Fetching Student Data Failed!");
      });
  };

  let Filterdata = Showdata.filter((data) => {
    return (
      data.Name.toLowerCase().includes(Search.toLowerCase()) ||
      data.City.toLowerCase().includes(Search.toLowerCase())
    );
  });

  return (
    <div className="container">
      <div id="container">
        <h2>Student Data Management</h2>
      </div>
      <div id="input-search">
        <input
          type="text"
          placeholder="Search Here!"
          onChange={(e) => {
            Setsearch(e.target.value);
          }}
        />
        <button
          onClick={HandleToast}
          data-bs-toggle="modal"
          data-bs-target="#myModal"
        >
          Add User
        </button>
      </div>
      <div id="table-data">
        <table>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>

          {Filterdata.length > 0 ? (
            Filterdata.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.Name}</td>
                  <td>{data.Age}</td>
                  <td>{data.City}</td>
                  <td>
                    <button
                      className="green"
                      onClick={(e) => HandleEdit(data._id)}
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="red"
                      onClick={(e) => HandleDelete(data._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <h2 style={{ textAlign: "center" }}>No Records Found!</h2>
          )}
        </table>
      </div>

      {Toast && (
        <div
          className="modal fade"
          id="myModal"
          style={{ fontVariant: "small-caps" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  {" "}
                  {Update ? "Update Student Data!" : "Add Student Data!"}
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                />
              </div>
              <div className="modal-body">
                <form action="" onSubmit={HandleSubmit}>
                  <label htmlFor="name">Enter Name:</label>
                  <br />
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                  <br />
                  <label htmlFor="age">Enter Age:</label>
                  <br />
                  <input
                    type="number"
                    name="age"
                    required
                    value={age}
                    onChange={(e) => setage(e.target.value)}
                  />
                  <br />
                  <label htmlFor="city">Enter City:</label>
                  <br />
                  <input
                    type="text"
                    name="city"
                    required
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                  />
                  <br />
                  <br />
                  <button className="green" type="submit">
                    {Update ? "Save Changes" : "Submit"}
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  style={{ fontVariant: "small-caps" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentData;
