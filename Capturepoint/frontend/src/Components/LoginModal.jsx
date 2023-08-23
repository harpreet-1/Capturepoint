import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Context/LoginSignupContext"; // Replace with actual path
import { useRef } from "react";
import { useAlertContext } from "../Context/AlertContext";

function LoginModal() {
  const { showAlert } = useAlertContext();
  const loginForm = useRef();

  const { showLogin, handleCloseLogin, setLoginTrue, setUsername } =
    useAuthContext();
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let email = loginForm.current.email.value;
    let password = loginForm.current.password.value;

    try {
      fetch(`${process.env.REACT_APP_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // storing token in localStorage
          if (data.token) {
            localStorage.setItem("token", data.token);
            setLoginTrue();
            setUsername(data.user.username);
            handleCloseLogin();
            showAlert(data.message, "success");
            return;
          }

          showAlert(data.message + " !", "danger");
        });
    } catch (error) {
      console.log(" error from signup ************\n", error);
    }
  };
  return (
    <>
      <Modal
        show={showLogin}
        onHide={handleCloseLogin}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <h1>Sign In</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="login_body">
            <div className="login_main">
              <div id="big_box">
                <div className="right_box">
                  <div className="form_box">
                    <form
                      ref={loginForm}
                      onSubmit={(e) => handleLoginSubmit(e)}
                    >
                      <label>
                        <p>Your Email:</p>
                      </label>
                      <input
                        className=""
                        id="email"
                        required
                        placeholder="Email Address"
                        type="email"
                      />
                      <label>
                        <p>Password:</p>
                      </label>
                      <input
                        id="password"
                        required
                        placeholder="Password"
                        type="password"
                      />

                      <input type="submit" value="SIGN IN" />
                    </form>
                    <Link className="a_link" to="">
                      <p>Forget Password ?</p>
                    </Link>
                    <p>OR</p>
                    <Link
                      id="googleAuth"
                      to={"http://localhost:8080/auth/google"}
                    >
                      <button id="google">
                        <img
                          src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
                          alt=""
                        />
                        Sign in with Google
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;
