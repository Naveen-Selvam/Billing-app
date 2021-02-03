import React, { useEffect, useState } from "react";
import { startGetCustomer } from "../action/customeraction";
import { startGetProduct } from "../action/productaction";
import { startGetBill } from "../action/billAction";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper } from "@material-ui/core";
import { paperStyle3, paperStyle7 } from "../components/style";

const Dahboard = (props) => {
  const dispatch = useDispatch();
  let sum = 0;

  useEffect(() => {
    dispatch(startGetCustomer());
    dispatch(startGetProduct());
    dispatch(startGetBill());
  }, []);

  const customer = useSelector((state) => state.customer);
  const product = useSelector((state) => state.product);
  const bills = useSelector((state) => state.bill);

  let last5cust = customer?.slice(customer.length - 5);
  let last5prod = product?.slice(product.length - 5);

  if (bills.length > 0) {
    bills.forEach((bill, i) => {
      sum += bill.total;
    });
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Grid style={{ padding: "2rem" }}>
          <Paper elevation={10} style={paperStyle3}>
            <h1>Total Customers</h1>
            <h3 className="number">{customer.length}</h3>
          </Paper>
        </Grid>
        <Grid style={{ padding: "2rem" }}>
          <Paper elevation={10} style={paperStyle3}>
            <h1>Total Products</h1>
            <h3 className="number">{product.length}</h3>
          </Paper>
        </Grid>
        <Grid style={{ padding: "2rem" }}>
          <Paper elevation={10} style={paperStyle3}>
            <h1>Total Bills</h1>
            <h3 className="number">{bills.length}</h3>
          </Paper>
        </Grid>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Grid style={{ padding: "2rem" }}>
          <Paper elevation={10} style={paperStyle3}>
            <h1>Total Sales</h1>
            <h3 className="number">{sum}</h3>
          </Paper>
        </Grid>
      </div>
      <div>
        <h1>Last 5 added Customers</h1>
        <div style={{ display: "flex" }}>
          {last5cust?.map((cust) => {
            return (
              <Grid style={{ padding: "0.5rem" }}>
                <Paper elevation={10} style={paperStyle7} key={cust._id}>
                  <h3>Name - {cust.name}</h3>
                  <h3>Mobile - {cust.mobile}</h3>
                  <h3>mail-{cust.email}</h3>
                </Paper>
              </Grid>
            );
          })}
        </div>
        <h1>Last 5 added Products</h1>
        <div style={{ display: "flex" }}>
          {last5prod?.map((prod) => {
            return (
              <Grid style={{ padding: "0.5rem" }}>
                <Paper elevation={10} style={paperStyle7} key={prod._id}>
                  <h3>Name - {prod.name}</h3>
                  <h3>Price - {prod.price}</h3>
                </Paper>
              </Grid>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dahboard;
