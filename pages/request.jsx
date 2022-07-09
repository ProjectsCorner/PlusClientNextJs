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
  const [state, setState] = useState({});

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
        : null,
    });
  }, []);

  /**
   *
   * file change
   */
  const file_input_change = (e) =>
    setState({ ...state, img: e.target.files[0], p: "" });

  const request_upload = async (e) => {
    e.preventDefault();
    setState({ ...state, req_made: "Please Wait, Making your request...." });
    let req_data = {};
    new FormData(e.target).forEach((el, i) => {
      req_data[i] = el;
    });
    req_data["user_id"] = state.user.id || "";
    if (state.img) {
      const storageRef = ref(storage, `/images/requests/${state.img.name}`);
      const uploadTask = uploadBytesResumable(storageRef, state.img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const p = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setState({ ...state, p });
        },
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
              setState({ ...state, req_made: "Your Request was made...." });
            } else {
              setState({
                ...state,
                req_made: "Failed, i think its the internet Connection....",
              });
            }
          });
        }
      );
    } else {
      const api_res = await new FormsApi().post("/user/request/new", req_data);
      if (api_res !== "Error" && api_res.status) {
        setState({ ...state, req_made: "Your Request was made" });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setState({
          ...state,
          req_made: "Failed, i think its the internet Connection....",
        });
      }
    }
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
                      Select Image
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
                      Clear Image
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
                        height="120px"
                        width="120px"
                        style={{ borderRadius: "5px" }}
                      />
                    }
                  </div>
                </div>
                <button
                  className="plus-btn"
                  style={{ margin: "10px 0px", padding: "10px", width: "100%" }}
                  type="submit"
                >
                  {state.req_made ? state.req_made : "Make your Request"}
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
