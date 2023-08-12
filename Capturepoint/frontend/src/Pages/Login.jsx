import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Login.css";
function Login() {
  return (
    <div id="login_body">
      <div class="login_main">
        <div id="big_box">
          <div class="left_box">
            <img
              src="https://capturepoint.netlify.app/images/logo.png"
              alt=""
            />
            <div id="new_customer">
              <h6>New Customer?</h6>
              <a href="signup.html">CREATE AN ACCOUNT </a>
            </div>
          </div>
          <div class="right_box">
            <div class="form_box">
              <h1>Sign In</h1>
              <form action="signin">
                <label>
                  <p>Your Email:</p>
                </label>
                <input
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
                <div id="rememberme">
                  <input type="checkbox" name="fdsfd" id="" />
                  <span>Remember Me</span>
                </div>
                <input type="submit" value="SIGN IN" />
              </form>
              <Link className="a_link" to="">
                <p>Forget Password ?</p>
              </Link>
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
  );
}

export default Login;
