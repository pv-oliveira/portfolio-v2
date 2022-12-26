import React, { useState } from "react";
import MaskedInput from "react-text-mask";

function CPFInput() {
  const [cpf, setCPF] = useState("");
  const [isValid, setIsValid] = useState(false);

  function checkCPF(cpf) {
    let sum = 0;
    let rest;

    if (cpf === "00000000000") return false;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) {
      rest = 0;
    }
    if (rest !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) {
      rest = 0;
    }
    if (rest !== parseInt(cpf.substring(10, 11))) {
      return false;
    }
    return true;
  }

  function handleChange(event) {
    setCPF(event.target.value);
    setIsValid(checkCPF(event.target.value));
  }

  return (
    <div>
      <MaskedInput
        mask={[
          /\d/,
          /\d/,
          /\d/,
          ".",
          /\d/,
          /\d/,
          /\d/,
          ".",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
        ]}
        placeholder="CPF"
        value={cpf}
        onChange={handleChange}
      />
      {isValid ? "Valid" : "Invalid"}
    </div>
  );
}

export default CPFInput;
