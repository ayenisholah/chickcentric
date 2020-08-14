import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const KEY = "user-token";
const token = localStorage.getItem(KEY);

class Login extends PureComponent {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { history } = this.props;

    try {
      const { email, password } = this.state;

      if (email.length === 0) {
        toast.error("please enter your email address");
        return;
      }

      if (password.length === 0) {
        toast.error("please enter your password");
        return;
      }

      if (email.length > 0 && password.length > 0) {
        const user = {
          email,
          password,
        };

        const response = await axios.post(
          "https://lit-sands-58479.herokuapp.com/signin",
          user
        );

        if (response.status === 200) {
          toast.success("Login successful");
          localStorage.setItem("user-token", response.data.token);
          history.push("/dashboard");
          window.location.reload();
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  render() {
    const { email, password } = this.state;

    if (token !== null) {
      return <Redirect to="/dasboard" />;
    }
    return (
      <div className="addProduct">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <h3>Login</h3>
        <form>
          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              value={password}
            />
          </div>
          <button onClick={this.handleSubmit}>Login</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
