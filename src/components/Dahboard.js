import React, { useEffect } from "react";
import { startGetCustomer } from "../action/customeraction";
import { startGetProduct } from "../action/productaction";
import { startGetBill } from "../action/billAction";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper } from "@material-ui/core";
import { paperStyle3 } from "../components/style";

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

  if (bills.length > 0) {
    bills.forEach((bill, i) => {
      sum += bill.total;
    });
  }
  console.log(sum);

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
    </div>
  );
};

export default Dahboard;
