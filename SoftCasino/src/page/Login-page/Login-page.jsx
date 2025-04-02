import { Link, useNavigate } from "react-router";
import logo from "../../../public/logo.png";
import Button from "../../components/Button/Button";
import FormErrorMessage from "../../components/Form-error-message/Form-error-message";
import styles from "./Login-page-styles.module.css";

import useForm from "../../hooks/useFormHook";

import { checkForErrors } from "../../utils/useFormUtils";
import { useContext, useState } from "react";
import { authContext } from "../../context/Auth-context";
import requester from "../../api/requester";
import SiteError from "../../components/Site-error/Site-error";
import { useAuthenticationRouteGuard } from "../../hooks/useRouteGuard";

export default function Login() {
  useAuthenticationRouteGuard()
  const navigate = useNavigate();
  const auth = useContext(authContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm, formSubmitFunction] = useForm(
    {
      username: { maxL: 10, minL: 2, required: true, value: "" },
      password: { maxL: 10, minL: 3, required: true, value: "" },
    },
    async (e) => {
      e.preventDefault();
      let data = await requester(
        "POST",
        import.meta.env.VITE_API_ADRESS + "/users/login",
        {
          username: form.username.value,
          password: form.password.value,
        }
      );

      if (data.message) {
        setErrorMessage(data.message);
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.user.username,
            id: data.user._id,
            token: data.token,
            picture:data.user.profilePicture
          })
        );
        auth.setUser({
          username: data.user.username,
          id: data.user._id,
          token: data.token,
          isLogged:true,
          picture:data.user.profilePicture
        });
        navigate("/home");
      }
    }
  );

  let formError = checkForErrors(form);

  return (
    <main className={styles["main-login-wrapper"]}>
      <SiteError clearError={setErrorMessage} error={errorMessage}></SiteError>
      <div className={styles["login-wrapper"]}>
        <img style={{cursor:"pointer"}} onClick={() => {
          navigate("/home")
        }} width="200" height="200" src={logo} alt="" />
        <form onSubmit={formSubmitFunction} className={styles["login-form"]}>
          <h3 className={styles["login-form-title"]}>Login form</h3>
          <div className={styles["login-form-field"]}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={form.username.value}
              name="username"
              onChange={(e) => {
                setForm(e.currentTarget.value, e.target.name);
              }}
              placeholder="Ramon"
              className={styles.input}
              type="text"
            />
            <FormErrorMessage text={form.username.error || ""} />
          </div>
          <div className={styles["login-form-field"]}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              placeholder="****"
              className={styles.input}
              type="password"
              value={form.password.value}
              onChange={(e) => {
                setForm(e.currentTarget.value, e.target.name);
              }}
            />
            <FormErrorMessage text={form.password.error || ""} />
          </div>
          <Button
            dissabled={formError || errorMessage !== ""}
            text="Login"
          ></Button>
          <p>
            Don&apos;t have an account yet?{" "}
            <Link
              style={{
                color: "rgb(26, 62, 121)",
              }}
              to={"/register"}
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
