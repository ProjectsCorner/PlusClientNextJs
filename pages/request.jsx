import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Base64 } from "js-base64";

/**
 *
 * Defined components
 */
import MainHeader from "../Components/MainHeader";
import MainFooter from "../Components/MainFooter";
import FormsApi from "../api/api";

/**
 *
 * mui
 */
import { Button, TextField } from "@material-ui/core";

/**
 *
 * firebase
 */
import { storage } from "../api/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default () => {
  const router = useRouter();
  const input_ref = useRef(null);
  const [state, setState] = useState({ req: "1", user: {} });

  useEffect(() => {
    setState({
      ...state,
      user: sessionStorage.getItem("token")
        ? sessionStorage.getItem("token")
        : localStorage.getItem("token")
        ? JSON.parse(
            Base64.decode(
              sessionStorage.getItem("token")
                ? sessionStorage.getItem("token")
                : localStorage.getItem("token")
            )
          )
        : {},
    });
  }, []);

  /**
   *
   * file change
   */
  const file_input_change = (e) =>
    setState({ ...state, img: e.target.files[0] });

  const request_upload = async (e) => {
    e.preventDefault();
    setState({ ...state, req: "2" });
    setTimeout(async () => {
      let req_data = {};
      new FormData(e.target).forEach((el, i) => {
        req_data[i] = el;
      });
      req_data["user_id"] = state.user.id ? state.user.id : "";
      if (state.img) {
        const storageRef = ref(storage, `/images/requests/${state.img.name}`);
        const uploadTask = uploadBytesResumable(storageRef, state.img);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
              req_data["request_img"] = url;
              const api_res = await new FormsApi().post(
                "/user/request/new",
                req_data
              );
              if (api_res !== "Error" && api_res.status) {
                setState({ ...state, req: "3" });
              } else {
                setState({
                  ...state,
                  req: "4",
                });
              }
            });
          }
        );
      } else {
        const api_res = await new FormsApi().post(
          "/user/request/new",
          req_data
        );
        if (api_res !== "Error" && api_res.status) {
          setState({ ...state, req: "3" });
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          setState({
            ...state,
            req: "4",
          });
        }
      }
    }, 2000);
  };

  return (
    <>
      <MainHeader />
      <main>
        <section className="user-help-request-item-ctr">
          <div>
            <div>
              <img src="/request.svg" alt="ITem " />
            </div>
            <div>
              <div>Request your Item</div>
              <form onSubmit={request_upload}>
                <TextField
                  variant="outlined"
                  label="Item Name"
                  name="request_name"
                  style={{ margin: "15px 0px", width: "100%" }}
                  required
                />
                <br />
                <TextField
                  variant="outlined"
                  label="Small Description (optional)"
                  name="request_description"
                  style={{ margin: "15px 0px", width: "100%" }}
                  multiline
                />
                <TextField
                  variant="outlined"
                  label="Your Phone Number"
                  helperText="Where we can reach you....,  Also you can add an image below so that we know better"
                  name="request_phone"
                  style={{ margin: "15px 0px", width: "100%" }}
                />
                <div>
                  <div className="user-help-request-item-btn-ctr">
                    <input
                      type="file"
                      hidden
                      onChange={file_input_change}
                      ref={input_ref}
                    />
                    <Button
                      variant="outlined"
                      onClick={() => input_ref.current.click()}
                    >
                      Select Pic
                    </Button>
                    <Button
                      variant="outlined"
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        let delete_state = state;
                        if (state.img) delete delete_state.img;
                        setState({ ...delete_state });
                      }}
                    >
                      Clear to Select another pic
                    </Button>
                  </div>
                  <div className="user-help-request-item-img-ctr">
                    {
                      <img
                        src={
                          state.img
                            ? URL.createObjectURL(state.img)
                            : "/request.svg"
                        }
                        alt=""
                        height="150px"
                        width="150px"
                        style={{ borderRadius: "5px" }}
                      />
                    }
                  </div>
                </div>
                <button
                  className="plus-btn"
                  style={
                    state.req === "2"
                      ? {
                          opacity: ".3",
                          pointerEvents: "none",
                          margin: "10px 0px",
                          padding: "10px",
                          width: "100%",
                        }
                      : { margin: "10px 0px", padding: "10px", width: "100%" }
                  }
                  type="submit"
                >
                  {state.req === "1"
                    ? "Make Your request"
                    : state.req === "2"
                    ? "Sending Request..."
                    : state.req === "3"
                    ? "Request Sent SuccessFully"
                    : "Failed to Send, Plus thinks its internet Connection. First check!!!"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <MainFooter />
    </>
  );
};
