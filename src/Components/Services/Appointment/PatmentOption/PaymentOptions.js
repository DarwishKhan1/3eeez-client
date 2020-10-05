import React, { Fragment } from "react";
import ServicesTabList from "../../../common/ServicesTabList";
import SelectPaymentType from "./SelectPaymentTypeForServices";
const PaymentOptions = (props) => {
  return (
    <Fragment>
      <div class="container">
        <ServicesTabList title="paymentoptions" />
        <hr />
        <SelectPaymentType />
      </div>
    </Fragment>
  );
};

PaymentOptions.propTypes = {};

export default PaymentOptions;
