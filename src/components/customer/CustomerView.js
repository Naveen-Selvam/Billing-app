import React, { useEffect, useState } from "react";
import { startGetBill } from "../../action/billAction";
import { useDispatch, useSelector } from "react-redux";
import EachCustomerBill from "./EachCustomerBill";

const CustomerView = (props) => {
  const bills = useSelector((state) => state.bill);
  let result = [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetBill());
  }, []);

  if (bills.length > 0) {
    bills.forEach((bill) => {
      if (bill.customer === props.match.params.id) {
        result.push(bill);
      }
    });
  }

  return (
    <div>
      <h1>Total Orders {result.length}</h1>
      <div className="customerViewTable">
        {result?.map((customer) => {
          return (
            <div>
              <EachCustomerBill customer={customer} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerView;
