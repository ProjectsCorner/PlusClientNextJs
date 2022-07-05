/**
 * dependances
 */
import React, { useState, useEffect } from "react";
import { Base64 } from "js-base64";

/**
 * next js
 */
import { useRouter } from "next/router";
import Link from "next/link";

/**
 * defined components
 */
import MainHeader from "../../Components/MainHeader";
import MainFooter from "../../Components/MainFooter";

//material
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Button,
} from "@material-ui/core";

//api
import FormsApi from "../../api/api";

export default function Login() {
  const router = useRouter();
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
    if (user) {
      router.back();
    }
  });
  //state
  const [rememberMe, setRememberMe] = useState(true);
  const [apiFeedBackError, setApiFeedBackError] = useState(false);
  const [submit, setSubmit] = useState(false);

  const form_submit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    let api = new FormsApi();
    let res = await api.post("/user/login", _fcontent);
    if (res === "Error") {
      setApiFeedBackError(true);
      setSubmit(false);
      return;
    }
    if (res.status === false) {
      setApiFeedBackError(true);
      setSubmit(false);
    } else {
      if (rememberMe) {
        const data = Base64.encode(JSON.stringify(res.user));
        localStorage.setItem("token", data);
        setSubmit(false);
      } else {
        const data = Base64.encode(JSON.stringify(res.user));
        sessionStorage.setItem("token", data);
        setSubmit(false);
      }
      router.back();
    }
  };

  return (
    <>
      <MainHeader />
      <main>
        <div className="lg_ctr">
          <div className="message-ctr">
            <div>We're Happy Your here</div>
            <div>
              Hi, plus is very proud of you. With your plus account, you can
              make an order, fill your account, kwegamba shopping is easy...
            </div>
            <div>Dont have an account? Create one by clicking below</div>
            <div>
              <Link href="/user/new">
                <a>
                  <Button variant="outlined" color="primary">
                    Create An Account
                  </Button>
                </a>
              </Link>
            </div>
          </div>
          <div className="lg_form_ctr">
            <form onSubmit={form_submit} className="login_form">
              <div className="login-logo-ctr">
                <img src="/logos/plus_logo_black.png" alt="PLUSONLINE" />
              </div>
              <h3>Welcome, Sign in here</h3>
              <div className="login-inputs-ctr">
                <TextField
                  error={apiFeedBackError}
                  helperText={
                    apiFeedBackError
                      ? "Wrong Phone or some network error"
                      : "Fill in your Phone number"
                  }
                  variant="outlined"
                  label="Phone Number"
                  type="text"
                  name="id"
                  fullWidth
                  style={{ margin: "20px 0px" }}
                />
                <TextField
                  error={apiFeedBackError}
                  helperText={
                    apiFeedBackError
                      ? "Wrong Password or some network error"
                      : "Fill in your password"
                  }
                  variant="outlined"
                  label="Password"
                  type="password"
                  name="password"
                  fullWidth
                  style={{ margin: "20px 0px" }}
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        name="rem_me"
                        checked={rememberMe}
                        onChange={() => {
                          setRememberMe(!rememberMe);
                        }}
                      />
                    }
                    label="Remember Me On this Device"
                  />
                </FormGroup>
              </div>

              <div className="login-btn-ctr">
                <Button
                  color="primary"
                  variant={submit ? "outlined" : "contained"}
                  type="submit"
                  style={{ width: "100%" }}
                >
                  <CircularProgress
                    size={15}
                    thickness={10}
                    style={{
                      display: submit ? "inline-block" : "none",
                      marginRight: "20px",
                    }}
                  />
                  {submit ? "Please Wait..." : "Sign In"}
                </Button>
              </div>
              <div style={{ width: "100%", marginBlock: "10px" }}>
                Not Registered?
                <Link href="/user/new">
                  <a>
                    <span
                      style={{
                        textDecoration: "underline",
                        color: "blue",
                        marginLeft: "5px",
                      }}
                    >
                      Register Here
                    </span>
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
