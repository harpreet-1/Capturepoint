import Modal from "react-bootstrap/Modal";
import { useRef } from "react";
import { useAuthContext } from "../Context/LoginSignupContext"; // Replace with actual path

function SignUpModal() {
  const loginForm = useRef();
  const {
    showSignup,
    handleCloseSignup,
    handleLoginClick,
    setUsername,
    setLoginTrue,
  } = useAuthContext();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let email = loginForm.current.email.value;
    let password = loginForm.current.password.value;
    let ConfirmPassword = loginForm.current.ConfirmPassword.value;
    let username = loginForm.current.username.value;
    if (password !== ConfirmPassword) {
      alert("password not match");
    } else {
      try {
        fetch(`${process.env.REACT_APP_BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            username,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.token) {
              localStorage.setItem("token", data.token);
              setLoginTrue();
              setUsername(data.user.username);
            }
            // closeing the signup modal
            handleCloseSignup();
            // showing message
            alert(data.message);
            if (data.message === "user alredy exists please login") {
              // opening login form

              handleLoginClick();
            }
          });
      } catch (error) {
        console.log(" error from signup ************\n", error);
      }
    }
  };

  return (
    <>
      <Modal
        show={showSignup}
        onHide={handleCloseSignup}
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
                    <form ref={loginForm} onSubmit={handleLoginSubmit}>
                      <input
                        id="username"
                        required
                        placeholder="Enter Username"
                        type="text"
                      />

                      <input
                        id="email"
                        required
                        placeholder="Enter Email Address"
                        type="email"
                      />

                      <input
                        id="password"
                        required
                        placeholder="Enter Password"
                        type="password"
                      />

                      <input
                        id="ConfirmPassword"
                        required
                        placeholder="Enter Confirm Password"
                        type="password"
                      />

                      <input type="submit" value="SIGN UP" />
                    </form>

                    <p>OR</p>

                    <button id="google">
                      <img
                        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
                        alt=""
                      />
                      Sign in with Google
                    </button>
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

export default SignUpModal;
