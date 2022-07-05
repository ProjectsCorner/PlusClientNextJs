import { Base64 } from "js-base64";

let user = null;
if (typeof window !== "undefined") {
  const session_token = sessionStorage.getItem("token");
  const stored_token = localStorage.getItem("token");
  const token = session_token ? session_token : stored_token;
  user = token ? JSON.parse(Base64.decode(token)) : null;
}

export default user;
