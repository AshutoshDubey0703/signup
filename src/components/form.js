import React, { Component } from "react";

class Form extends Component {
  state = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    formErrors: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    valid: false,
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length > 3 ? "" : "Enter atleast three characters";
        break;
      case "lastName":
        formErrors.lastName =
          value.length > 3 ? "" : "Enter atleast three characters";
        break;
      case "email":
        formErrors.email = /^\w+@\w+\.\w+$/.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        formErrors.password = /^\w{8,15}$/.test(value)
          ? ""
          : "Password must be atleast 8 characters and should contain alpahbet and numbers";
        break;
      default:
        break;
    }

    let valid = true;
    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });
    this.setState({ formErrors, [name]: value, valid }, () =>
      console.log(this.state)
    );
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="m-5">
          <div className="form-group row">
            <label htmlFor="firstName" className="col-2 form-label">First Name: </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="form-control col-6"
              placeholder="First Name"
              onChange={this.handleChange}
              required
            />
            {formErrors.firstName.length > 0 && (
              <span className="alert-danger m-2">{formErrors.firstName}</span>
            )}
          </div>
          <div className="form-group row">
            <label htmlFor="lastName" className="col-2">Last Name: </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="form-control col-6"
              placeholder="Last Name"
              onChange={this.handleChange}
              required
            />
            {formErrors.lastName.length > 0 && (
              <span className="alert-danger m-2">{formErrors.lastName}</span>
            )}
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-2">Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control col-6"
              placeholder="Email"
              onChange={this.handleChange}
              required
            />
            {formErrors.email.length > 0 && (
              <span className="alert-danger m-2">{formErrors.email}</span>
            )}
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-2">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control col-6"
              placeholder="Password"
              onChange={this.handleChange}
              required
            />
            {formErrors.password.length > 0 && (
              <span className="alert-danger m-2">{formErrors.password}</span>
            )}
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!this.state.valid}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
