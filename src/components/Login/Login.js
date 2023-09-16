import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: true };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_PASSOWRD") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: '',
  });

  const [passowrdState, dispatchPassowrd] = useReducer(passwordReducer, {
    value: "",
    isValid: '',
  });

  const { isValid: eamilValid} = emailState; 
  const { isValid: passwordValid} = passowrdState; 

  useEffect(()=>{
    const identifire = setTimeout(()=>{
      console.log('Checking form validity')
      setFormIsValid( eamilValid && passwordValid);
    },500)

    return ()=>{
      console.log('CLEANUP')
      clearTimeout(identifire)
    }
  },[eamilValid, passwordValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });

    setFormIsValid(emailState.isValid && passowrdState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassowrd({ type: "USER_PASSOWRD", value: event.target.value });

    // setFormIsValid(passowrdState.isValid && emailState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassowrd({ type: "PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passowrdState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passowrdState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passowrdState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passowrdState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collage">Collage</label>
          <input
            type="name"
            id="collage"
            // value={enteredPassword}
            // onChange={passwordChangeHandler}
            // onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
