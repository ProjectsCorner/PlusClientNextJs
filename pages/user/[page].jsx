/**
 *
 * Dependences
 */
import React, { useEffect, useState } from "react";
import { Base64 } from "js-base64";
import { useRouter } from "next/router";
import Link from "next/link";

/**
 *
 * imports for defined components
 */
import MainHeader from "../../Components/MainHeader";
import MainFooter from "../../Components/MainFooter";

/**
 *
 * material ui design...
 */
import { Person, ChevronRight } from "@material-ui/icons";
import { TextField } from "@material-ui/core";

export default () => {
  const router = useRouter();
  const [state, setState] = useState({ user: null });

  useEffect(() => {
    const user = sessionStorage.getItem("token")
      ? sessionStorage.getItem("token")
      : localStorage.getItem("token")
      ? JSON.parse(
          Base64.decode(
            sessionStorage.getItem("token")
              ? sessionStorage.getItem("token")
              : localStorage.getItem("token")
          )
        )
      : null;
    setState({
      ...state,
      user,
    });
    if (!user) {
      router.push("/user/login");
    }
  }, []);
  return (
    <>
      <MainHeader />
      <main>
        <section className="main-user-ctr">
          <div className="-b-x -br">
            <div>
              <Link href="/user/profile">
                <a
                  className={
                    router.query.page === "profile"
                      ? "user-link -b-x active"
                      : "user-link"
                  }
                >
                  <Person />
                  <span> My Profile</span>
                </a>
              </Link>
              <Link href="/user/orders">
                <a
                  className={
                    router.query.page === "orders"
                      ? "user-link -b-x active"
                      : "user-link"
                  }
                >
                  <Person />
                  <span> My Orders</span>
                </a>
              </Link>
              <Link href="/user/pending-orders">
                <a
                  className={
                    router.query.page === "pending-orders"
                      ? "user-link -b-x active"
                      : "user-link"
                  }
                >
                  <Person />
                  <span> Pending Orders </span>
                </a>
              </Link>
              <Link href="/user/edit">
                <a
                  className={
                    router.query.page === "edit"
                      ? "user-link -b-x active"
                      : "user-link"
                  }
                >
                  <Person />
                  <span> Edit Profile</span>
                </a>
              </Link>
              <span
                className="user-link -b-x"
                onClick={() => {
                  const token_stored = localStorage.getItem("token");
                  if (token_stored) {
                    localStorage.removeItem("token");
                  } else {
                    sessionStorage.removeItem("token");
                  }
                  window.location.replace("/");
                }}
              >
                <span>Log Out</span>
                <ChevronRight />
              </span>
            </div>
          </div>
          <div className="-b-x -br">
            <div>
              {router.query.page === "profile"
                ? "My Profile"
                : router.query.page === "orders"
                ? "My Orders"
                : router.query.page === "pending-orders"
                ? "Orders Pending"
                : router.query.page === "edit"
                ? "Update Profile"
                : "No Content for this"}
            </div>
            <div className="user-content-ctr">
              {router.query.page === "profile" ? (
                <Profile user={state.user || {}} />
              ) : router.query.page === "orders" ? (
                <Orders />
              ) : router.query.page === "pending-orders" ? (
                <PendingOrders />
              ) : router.query.page === "edit" ? (
                <EditProfile />
              ) : (
                <div> &nbsp; &nbsp; .... &nbsp; &nbsp;</div>
              )}
            </div>
          </div>
        </section>
      </main>
      <MainFooter />
    </>
  );
};

const Profile = ({ user }) => {
  return (
    <div className="user-data-ctr">
      <div>
        <div>Your basic Info</div>
        <div>
          <div>Your name</div>
          <div>{user.user_name}</div>
        </div>
        <div>
          <div>Date of birth</div>
          <div>{user.user_dob}</div>
        </div>
      </div>
      <div>
        <div>Contact</div>
        <div>
          <div>Phone Number</div>
          <div>{user.user_phone}</div>
        </div>
        <div>
          <div>Email</div>
          <div>{user.user_email}</div>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  return (
    <div className="user-data-ctr">
      <div>
        <div>#OrderNo</div>
        <div>
          <div>Date</div>
          <div>Xamuel Joshua</div>
        </div>
        <div>
          <div>Products Ordered</div>
          <div>not indicated</div>
        </div>
        <div>
          <div>Total Order Amount</div>
          <div>UGX 50,000</div>
        </div>
      </div>
      <div>
        <div>#OrderNo</div>
        <div>
          <div>Date</div>
          <div>Xamuel Joshua</div>
        </div>
        <div>
          <div>Products Ordered</div>
          <div>not indicated</div>
        </div>
        <div>
          <div>Total Order Amount</div>
          <div>UGX 50,000</div>
        </div>
      </div>
      <div>
        <div>#OrderNo</div>
        <div>
          <div>Date</div>
          <div>Xamuel Joshua</div>
        </div>
        <div>
          <div>Products Ordered</div>
          <div>not indicated</div>
        </div>
        <div>
          <div>Total Order Amount</div>
          <div>UGX 50,000</div>
        </div>
      </div>
    </div>
  );
};
const PendingOrders = () => {
  return (
    <div className="user-data-ctr">
      <div>
        <div>#OrderNo</div>
        <div>
          <div>Date</div>
          <div>Xamuel Joshua</div>
        </div>
        <div>
          <div>Products Ordered</div>
          <div>not indicated</div>
        </div>
        <div>
          <div>Total Order Amount</div>
          <div>UGX 50,000</div>
        </div>
        <div>
          <button className="plus-btn -b-x">Cancel Order</button>
        </div>
      </div>
      <div>
        <div>#OrderNo</div>
        <div>
          <div>Date</div>
          <div>Xamuel Joshua</div>
        </div>
        <div>
          <div>Products Ordered</div>
          <div>not indicated</div>
        </div>
        <div>
          <div>Total Order Amount</div>
          <div>UGX 50,000</div>
        </div>
        <div>
          <button className="plus-btn -b-x">Cancel Order</button>
        </div>
      </div>
      <div>
        <div>#OrderNo</div>
        <div>
          <div>Date</div>
          <div>Xamuel Joshua</div>
        </div>
        <div>
          <div>Products Ordered</div>
          <div>not indicated</div>
        </div>
        <div>
          <div>Total Order Amount</div>
          <div>UGX 50,000</div>
        </div>
        <div>
          <button className="plus-btn -b-x">Cancel Order</button>
        </div>
      </div>
    </div>
  );
};

const EditProfile = () => {
  return (
    <div className="user-data-ctr">
      <div>
        <div>Personal Info</div>
        <div>
          <TextField
            label="Name"
            name="name"
            color="primary"
            variant="outlined"
            style={{ width: "100%", margin: "10px 0px" }}
          />
        </div>
        <div>
          <TextField
            label="Date Of Birth(Just Optional)"
            name="dob"
            color="primary"
            variant="outlined"
            style={{ width: "100%", margin: "10px 0px" }}
          />
        </div>
        <div>
          <button className="plus-btn -b-x">Save</button>
        </div>
      </div>
      <div>
        <div>Contact Info</div>
        <div>
          <TextField
            label="Phone Number"
            name="phone_number"
            color="primary"
            variant="outlined"
            style={{ width: "100%", margin: "10px 0px" }}
          />
        </div>
        <div>
          <TextField
            label="Email Address"
            name="email"
            color="primary"
            variant="outlined"
            style={{ width: "100%", margin: "10px 0px" }}
          />
        </div>
        <div>
          <button className="plus-btn -b-x">Save</button>
        </div>
      </div>
    </div>
  );
};
