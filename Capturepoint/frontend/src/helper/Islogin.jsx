import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/LoginSignupContext";

const Islogin = () => {
  const navigate = useNavigate();
  const { setLoginTrue, setLoginFalse, setUsername } = useAuthContext();
  try {
    let params = window.location.search.split("token=")[1];

    if (params) {
      localStorage.setItem("token", params);
      navigate("/");
    }
    let token = params || localStorage.getItem("token") || null;
    if (token) {
      fetch("http://localhost:8080/islogin", {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.username) {
            setUsername(data.username.split(" ")[0]);

            setLoginTrue();
          } else {
            setTimeout(() => {
              setLoginFalse();
            }, 0);
          }
        });
    } else {
      setLoginFalse();
    }
  } catch (error) {
    console.log("error from checking is login", error);
  }
};

export default Islogin;
