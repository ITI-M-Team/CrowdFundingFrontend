import React, { useState } from "react";
import * as Components from "../assets/components.js";
import "../assets/css/signup2.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup2() {
  const [signIn, toggle] = React.useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email: loginEmail,
        password: loginPassword,
      });

      console.log("Login successful:", response.data);
      alert("Login successful!");

      // حفظ التوكن أو البيانات إن وجدت
      // localStorage.setItem("token", response.data.token);

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(
        "Login failed: " +
          (error.response?.data?.message || "Check your credentials")
      );
    }
  };
  const handleSignup = (e) => {
    e.preventDefault();
  };
  return (
    <div className="outer-wrapper">
      <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form onSubmit={handleSignup}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              placeholder="First Name"
              name="firstName"
              required
            />
            <Components.Input
              type="text"
              placeholder="Last Name"
              name="lastName"
              required
            />
            <Components.Input
              type="email"
              placeholder="Email"
              name="email"
              required
            />
            <Components.Input
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            <Components.Input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
            />
            <Components.Input
              type="tel"
              placeholder="Phone Number"
              name="phone"
            />
            <Components.Input
              type="file"
              accept="image/*"
              name="profileImage"
            />
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signingIn={signIn}>
          <Components.Form onSubmit={handleLogin}>
            <Components.Title>Login</Components.Title>
            <Components.Input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <Components.Input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <Link to="/forget_password">Forgot your password?</Link>
            <Components.Button type="submit">Login</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Login
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start your journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default Signup2;
