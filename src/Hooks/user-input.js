import React, { useState } from "react";

export default function useInput(validateVlaue) {
  const [enteredvalue, setEnteredValue] = useState("");
  const [istoached, setIstouched] = useState(false);

  const valueIsValid = validateVlaue(enteredvalue);
  const haserror = !valueIsValid && istoached;

  //   const inputValueIsInvalid =
  const handleValueChange = (event) => {
    setEnteredValue(event.target.value);
    console.log(enteredvalue);
  };
  const inputBlurHandler = (event) => {
    setIstouched(true);
  };

  return {
    value: enteredvalue,
    isValid: valueIsValid,
    haserror,
    setIstouched,
    setEnteredValue,
    handleValueChange,
    inputBlurHandler,
  };
}
