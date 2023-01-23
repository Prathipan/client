import React, { useContext, useEffect, useState } from "react";
import "./History.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import axios from "axios";
import { TransContext } from "../../App";

const api = "https://money-manager-server.onrender.com/"


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const History = () => {
 

  const {trans,setTrans} = useContext(TransContext);
 

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getValues();
  }, []);

  const getValues = async () => {
    const response = await axios.get(
      `${api}/transaction/get-data`
    );
    setTrans([...response.data]);
  };
  
  const handleDelete = async (id) => {
    await axios.delete(`${api}/transaction/trans/${id}`);
    getValues();
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      amount: "",
      type: "",
      TransDate: "",
    },
    onSubmit: async (values,{resetForm}) => {
      // console.log(values);
      await axios.post(
        `${api}/transaction/create-trans`,
        values
      );
      handleClose();
      resetForm({values : ""})
      getValues();
    },
  });

  return (
    <div className="container">
      <div className="transaction-container">
        <div className="head">
          <h3>Transaction History</h3>
          <button className="btn btn-primary" onClick={handleOpen}>
            Add
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
              {trans.map((tran) => {
                return (
                  <tr key={tran._id}>
                    <th scope="row">{tran._id}</th>
                    <td>{tran.name}</td>
                    <td>{tran.type}</td>
                    <td>{tran.amount}</td>
                    <td>{tran.TransDate}</td>
                    <td>
                      <Button color="error" onClick={() => handleDelete(tran._id)}>
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <label for="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className="form-control"
                  />
                  <label for="amount">Amount:</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    className="form-control"
                  />
                  <label for="type">Type:</label>
                  <select
                    id="type"
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    className="form-control"
                  >
                    <option>--Select the type--</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                  <label for="date">Date:</label>
                  <input
                    className="form-control"
                    type="date"
                    id="date"
                    name="TransDate"
                    value={formik.values.TransDate}
                    onChange={formik.handleChange}
                  />
                  <input
                    type="submit"
                    value="submit"
                    className="mt-2 btn btn-primary"
                  />
                </div>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default History;
