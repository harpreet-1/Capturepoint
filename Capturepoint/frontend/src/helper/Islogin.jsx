import { useAuthContext } from "../Context/LoginSignupContext";

const Islogin = () => {
  const { setLoginTrue, setUsername } = useAuthContext();
  try {
    let params = window.location.search.split("token=")[1];
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
          console.log("data from is login ", data);
          if (data.username) {
            setUsername(data.username);
            setLoginTrue();
          }
        })
        .catch((err) => {
          console.log("not login", err);
        });
    }
    if (params) {
      localStorage.setItem("token", params);
    }
  } catch (error) {
    console.log("error from checking is login", error);
  }
};

export default Islogin;
