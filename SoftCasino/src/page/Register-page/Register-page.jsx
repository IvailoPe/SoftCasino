import { Link } from "react-router";
import logo from "../../../public/logo.png";
import Button from "../../components/Button/Button";
import styles from "./Register-page-styles.module.css";
import useForm from "../../hooks/useFormHook";
import FormErrorMessage from "../../components/Form-error-message/Form-error-message";
import { checkForErrors } from "../../utils/useFormUtils";
import requester from "../../api/requester";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { authContext } from "../../context/Auth-context";
import SiteError from "../../components/Site-error/Site-error";
import { useAuthenticationRouteGuard } from "../../hooks/useRouteGuard";

export default function Register() {
  useAuthenticationRouteGuard()
  const navigate = useNavigate();
  const auth = useContext(authContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm, formSubmitFunction] = useForm(
    {
      username: { maxL: 10, minL: 2, required: true, value: "" },
      password: { maxL: 10, minL: 3, required: true, value: "" },
      passwordConfirm: {
        required: true,
        match: true,
        value: "",
      },
    },
    async (e) => {
      e.preventDefault();
      let data = await requester(
        "POST",
        import.meta.env.VITE_API_ADRESS + "/users/register",
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
    <main className={styles["main-register-wrapper"]}>
      <SiteError clearError={setErrorMessage} error={errorMessage}></SiteError>
      <div className={styles["register-wrapper"]}>
        <img width="200" height="200" src={logo} alt="" />
        <form onSubmit={formSubmitFunction} className={styles["register-form"]}>
          <h3 className={styles["register-form-title"]}>Register form</h3>
          <div className={styles["register-form-field"]}>
            <label htmlFor="username">Username</label>
            <input
              value={form.username.value}
              placeholder="Ramon"
              id="username"
              name="username"
              className={styles.input}
              type="text"
              onChange={(e) => {
                setForm(e.currentTarget.value, e.target.name);
              }}
            />
            <FormErrorMessage text={form.username.error || ""} />
          </div>
          <div className={styles["register-form-field"]}>
            <label htmlFor="password">Password</label>
            <input
              value={form.password.value}
              name="password"
              id="password"
              placeholder="****"
              className={styles.input}
              type="password"
              onChange={(e) => {
                setForm(e.currentTarget.value, e.target.name);
              }}
            />
            <FormErrorMessage text={form.password.error || ""} />
          </div>
          <div className={styles["register-form-field"]}>
            <label htmlFor="passwordConfirm">Confirm password</label>
            <input
              value={form.passwordConfirm.value}
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="****"
              className={styles.input}
              type="password"
              onChange={(e) => {
                setForm(e.currentTarget.value, e.target.name);
              }}
            />
            <FormErrorMessage text={form.passwordConfirm.error || ""} />
          </div>
          <Button
            dissabled={formError || errorMessage !== ""}
            text="Register"
          ></Button>
          <p>
            Already have an account?{" "}
            <Link
              to={"/login"}
              style={{
                color: "rgb(26, 62, 121)",
              }}
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
