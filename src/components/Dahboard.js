import React, { useEffect } from "react";
import { startGetCustomer } from "../action/customeraction";
import { startGetProduct } from "../action/productaction";
import { startGetBill } from "../action/billAction";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper } from "@material-ui/core";
import { paperStyle3, paperStyle7 } from "../components/style";
import EachCustomerBill from "../components/customer/EachCustomerBill";

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
  let last5bill = bills?.slice(bills.length - 5);
  let customerName = [];

  if (bills.length > 0) {
    bills.forEach((bill, i) => {
      sum += bill.total;
    });
  }

  if (last5bill.length > 0) {
    last5bill.forEach((bill) => {
      const result = customer?.filter((cust) => {
        return cust._id === bill.customer;
      });
      customerName.push(result[0]);
    });
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Dashboard</h1>
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
        {last5cust.length > 0 && <h2>Last 5 added customers</h2>}
        <div style={{ display: "flex" }}>
          {last5cust?.map((cust) => {
            return (
              <Grid
                key={cust._id}
                style={{ padding: "0.5rem", backgroundColor: "#e6ecff" }}
              >
                <Paper elevation={10} style={paperStyle7}>
                  <h3>Name - {cust.name}</h3>
                  <h3>Mobile - {cust.mobile}</h3>
                  <h3>mail-{cust.email}</h3>
                </Paper>
              </Grid>
            );
          })}
        </div>

        {last5prod.length > 0 && <h2>Last 5 added products</h2>}
        <div style={{ display: "flex" }}>
          {last5prod?.map((prod) => {
            return (
              <Grid
                key={prod._id}
                style={{ padding: "0.5rem", backgroundColor: "#ebfafa" }}
              >
                <Paper elevation={10} style={paperStyle7}>
                  <h3>Name - {prod.name}</h3>
                  <h3>Price - {prod.price}</h3>
                </Paper>
              </Grid>
            );
          })}
        </div>
      </div>

      <div>
        {last5bill.length > 0 && <h2>Last 5 generated Bills</h2>}
        <div className="customerViewTable">
          {last5bill?.map((bill, i) => {
            return (
              <div key={bill._id}>
                <div>
                  <h3>Name - {customerName[i]?.name}</h3>
                  <EachCustomerBill customer={bill} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dahboard;
