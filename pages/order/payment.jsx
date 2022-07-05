import React, { useState } from "react";
import { useRouter } from "next/router";

//material
import { QuestionAnswerOutlined, Phone } from "@material-ui/icons";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Autocomplete, Alert as MuiAlert } from "@material-ui/lab";

export default function CheckOut() {
  /**
   * Hooks
   */
  const router = useRouter();
  const [state, setState] = useState({});

  return (
    <>
      <div className="nav">
        <div className="search-nav">
          <div className="logo">
            <img
              src="/logos/plus_logo_color.png"
              alt="PLUSSHOPPING"
              height="50px"
            />
          </div>
          <div className="order-f">
            <b>Pay with Mobile Money</b>
          </div>
          <div className="-account -user focus">
            <span
              style={{
                marginRight: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <QuestionAnswerOutlined />
              Help Center
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <Phone />
              Call Us
            </span>
          </div>
        </div>
      </div>
      <div className="-f-order -m">
        <div className="f-order-ctr">
          <div className="-f-order-r">
            <form action="" className="form-mobile-pay">
              <div className="-f-order-h">
                <img
                  src="/logos/plus_logo_color.png"
                  alt="PLUS"
                  width="200"
                  height="100%"
                />
                <h3>Pay With Mobile Money</h3>
              </div>
              <div className="-i-group">
                <TextField
                  variant="outlined"
                  // color="secondary"
                  sx={{ color: "#85B811" }}
                  label="Amount"
                  value="Loading Amount..."
                  onChange={() => {}}
                  style={{ width: "100%" }}
                />
                {/* <label htmlFor="">Amount:</label>
                <br />
                <input
                  type="text"
                  name=""
                  id="amount"
                  placeholder="Loading Amount...."
                  readOnly
                /> */}
              </div>
              <div className="-i-group">
                <FormControl
                  label="mobile_operator"
                  variant="outlined"
                  style={{ width: "100%" }}
                >
                  <InputLabel id="mobile_operator">Mobile Operator</InputLabel>
                  <Select
                    inputProps={{ name: "mobile_operator" }}
                    label="Mobile Operator"
                    variant="outlined"
                    required
                    value={state.active_operator || ""}
                    onChange={(e) => {
                      setState({
                        ...state,
                        active_operator: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value="MTN">MTN</MenuItem>
                    <MenuItem value="AIRTEL">AIRTEL</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="-i-group">
                <TextField
                  variant="outlined"
                  label="Mobile Number"
                  name="mobile_number"
                  style={{ width: "100%" }}
                />
              </div>

              <button type="submit" className="-pay">
                PAY NOW
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
          <div className="-f-order-l">
            <div className="-img">
              <img src="/thanks.svg" alt="" width="60%" height="60%" />
            </div>
            <div className="">
              Thanks for shopping with yammie.
              <br />
              Your order Number is
              <span className="order">{router.query.order_number}</span>
              <br />
              You will receive an EMAIL or SMS
              <br />
              containing the delivery information of your order.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
