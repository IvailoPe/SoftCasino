import requester from "../../api/requester";
import useForm from "../../hooks/useFormHook";
import { checkForErrors } from "../../utils/useFormUtils";
import Button from "../Button/Button";
import FormErrorMessage from "../Form-error-message/Form-error-message";
import { logOutUser } from "../../utils/userUtils";

import styles from "./Edit-styles.module.css";
import { useContext } from "react";
import { authContext } from "../../context/Auth-context";
import { useNavigate } from "react-router";

export default function Edit({
  input1Type,
  input2Type,
  input1Text,
  input2Text,
  EditText,
  secondInput,
  BtnText,
  forId1,
  inputId1,
  forId2,
  inputId2,
  setting,
}) {
  let url = "";
  let method = "PUT";
  let formBody = {};
  let requestBody = {};

  const auth = useContext(authContext);
  const navigate = useNavigate();  

  if (setting === "username") {
    url = import.meta.env.VITE_API_ADRESS + "/users/profile/update-username";
    formBody.input1 = {
      maxL: 10,
      minL: 2,
      required: true,
      value: "",
      alternativeName: "username",
    };
    formBody.input2 = {
      required: true,
      value: "",
      alternativeName: "password",
    };
  } else if (setting === "password") {
    url = import.meta.env.VITE_API_ADRESS + "/users/profile/update-password";
    formBody.input1 = {
      required: true,
      value: "",
      alternativeName: "old password",
    };
    formBody.input2 = {
      maxL: 10,
      minL: 3,
      required: true,
      value: "",
      alternativeName: "new password",
    };
  } else if (setting === "url") {
    url =
      import.meta.env.VITE_API_ADRESS +
      "/users/profile/update-username-picture";
    formBody.input1 = {
      link: true,
      required: true,
      value: "",
      alternativeName: "url",
    };
    formBody.input2 = {
      required: true,
      value: "",
      alternativeName: "password",
    };
  } else if (setting === "delete") {
    url = import.meta.env.VITE_API_ADRESS + "/users/delete/profile";
    method = "POST";
    formBody.input1 = {
      required: true,
      value: "",
      alternativeName: "password",
    };
  }

  const [form, setForm, formSubmitFunction] = useForm(formBody, async (e) => {
    if (setting === "username") {
      requestBody.newUsername = form.input1.value;
      requestBody.password = form.input2.value;
    } else if (setting === "password") {
      requestBody.oldPassword = form.input1.value;
      requestBody.newPassword = form.input2.value;
    } else if (setting === "url") {
      requestBody.newUrl = form.input1.value;
      requestBody.password = form.input2.value;
    } else if (setting === "delete") {
      requestBody.password = form.input1.value;
    }
    e.preventDefault();    
    let data = await requester(method, url, requestBody);
    if(data.error){
      alert(data.error)
      return;
    }
    logOutUser()
    auth.setUser({isLogged:false})
    navigate("/login");
  });

  let formError = checkForErrors(form);

  console.log(form);

  let secondInputJSX = "";

  if (secondInput) {
    secondInputJSX = (
      <>
        <label htmlFor={forId2}>{input2Text}</label>
        <input
          name="input2"
          value={form.input2.value}
          id={inputId2}
          className={styles.input}
          type={input2Type}
          onChange={(e) => {
            setForm(e.currentTarget.value, e.target.name);
          }}
        />
      </>
    );
  }

  return (
    <form onSubmit={formSubmitFunction} className={styles["edit-form"]}>
      <h3>{EditText}</h3>
      <label htmlFor={forId1}>{input1Text}</label>
      <input
        name="input1"
        value={form.input1.value}
        onChange={(e) => {
          setForm(e.currentTarget.value, e.target.name);
        }}
        id={inputId1}
        className={styles.input}
        type={input1Type}
      />
      {form.input1?.error && (
        <FormErrorMessage text={form.input1.error || ""} />
      )}
      {secondInputJSX}
      {form.input2?.error && (
        <FormErrorMessage text={form.input2.error || ""} />
      )}
      <Button dissabled={formError} text={BtnText}></Button>
    </form>
  );
}
