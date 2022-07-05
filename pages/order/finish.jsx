import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

//material
import { QuestionAnswerOutlined, Phone } from "@material-ui/icons";

export default function CheckOut() {
  /**
   * Hooks
   */
  const router = useRouter();

  return (
    <>
      <div className="nav order-nav">
        <div className="search-nav">
          <div className="logo">
            <img
              src="/logos/plus_logo_color.png"
              alt="PLUSSHOPPING"
              height="50px"
            />
          </div>
          <div className="order-f">
            <b>Thanks For Ordering On Plus</b>
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
          <div className="-f-order-l">
            <div className="-img">
              <img src="/thanks.svg" alt="" width="60%" height="60%" />
            </div>
            <div className="">
              Thanks for making an order with plus...
              <br />
              Your order Number is
              <span style={{ fontWeight: "bold" }}>
                {router.query.order_number}
              </span>
              <br />
              You will receive an EMAIL or SMS or a Phone call
              <br />
              containing the delivery information of your order.
            </div>
            <Link href="/">
              <a>
                <button
                  className="-pay"
                  style={{
                    margin: "20px 0px",
                    width: "200px",
                  }}
                >
                  Return to Home Page
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
