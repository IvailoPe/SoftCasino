import requester from "../../api/requester";
import Button from "../../components/Button/Button";
import useForm from "../../hooks/useFormHook";
import { checkForErrors } from "../../utils/useFormUtils";
import { useOutletContext } from "react-router";

import styles from "./Pay-layout-styles.module.css";
import Notification from "../../components/Notification/Notification";
import { useState } from "react";
import useRouteGuard from "../../hooks/useRouteGuard";

export default function PayLayout({showAside}) {
  let showAsideClass = {};
  if (showAside) {
    showAsideClass.opacity = "0.3";
    showAsideClass.pointerEvents = "none";
  }

  useRouteGuard();
  const {setReset} = useOutletContext();
  const [notification, setNotification] = useState("");
  const [form, setForm, formSubmitFunction, resetForm] = useForm(
    {
      cardNumber: { maxL: 19, minL: 19, required: true, value: "" },
      dateMonth: { maxL: 2, minL: 1, required: true, value: "" },
      dateDay: { maxL: 2, minL: 1, required: true, value: "" },
      cvv: { maxL: 3, minL: 3, required: true, value: "" },
      amount: { maxL: 9999, minL: 1, required: true, value: "" },
    },
    async (e) => {
      e.preventDefault();
      await requester(
        "POST",
        import.meta.env.VITE_API_ADRESS + "/users/add/money",
        {
          money: form.amount.value,
        }
      );
      setReset((prevState) => {
        return !prevState;
      });
      setNotification("Added " + form.amount.value + "$ to your wallet")
    }
  );

  let formError = checkForErrors(form);

  let cardNumberError = {};
  let dateMonthError = {};
  let dateDayError = {};
  let cvvError = {};
  let amountError = {};

  if (form.cardNumber.error) {
    cardNumberError.borderBottom = "1px solid red";
  }
  if (form.dateMonth.error) {
    dateMonthError.borderBottom = "1px solid red";
  }
  if (form.dateDay.error) {
    dateDayError.borderBottom = "1px solid red";
  }
  if (form.cvv.error) {
    cvvError.borderBottom = "1px solid red";
  }
  if (form.amount.error) {
    amountError.borderBottom = "1px solid red";
  }

  let isVisa = undefined;
  if (form.cardNumber.value[0] === "2" || form.cardNumber.value[0] === "5") {
    isVisa = false;
  } else if (form.cardNumber.value[0] === "4") {
    isVisa = true;
  }

  return (
    <section style={showAsideClass} className={styles["pay-wrapper"]}>
      <form onSubmit={formSubmitFunction}>
        <section className={styles["credit-card-wrapper"]}>
          <div className={styles["credit-card-images"]}>
            {isVisa === true ? (
              <img
                width="40"
                height="30"
                src="https://logos-world.net/wp-content/uploads/2020/05/Visa-Logo.png"
              />
            ) : (
              <img
                width="40"
                height="30"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/800px-Mastercard_2019_logo.svg.png"
              />
            )}
            {isVisa === undefined ? (
              <img
                width="40"
                height="30"
                src="https://logos-world.net/wp-content/uploads/2020/05/Visa-Logo.png"
              />
            ) : (
              ""
            )}
          </div>
          <div className={styles["credit-card-main-info"]}>
            <p>Card number</p>
            <input
              style={{ ...cardNumberError }}
              value={form.cardNumber.value}
              type="tel"
              className={`${styles.input} ${styles["input-main-numbers"]}`}
              inputMode="numeric"
              autoComplete="cc-number"
              maxLength="19"
              placeholder="0000 0000 0000 0000"
              name="cardNumber"
              onChange={(e) => {
                if (
                  !isNaN(Number(e.currentTarget.value)) &&
                  (e.currentTarget.value[0] === "2" ||
                    e.currentTarget.value[0] === "5" ||
                    e.currentTarget.value[0] === "4" ||
                    e.currentTarget.value === "")
                ) {
                  if (
                    [4, 8, 12, 16].includes(
                      Number(form.cardNumber.value.length)
                    ) &&
                    e.currentTarget.value.slice(4) !== ""
                  ) {
                    setForm(
                      `${e.currentTarget.value.slice(
                        0,
                        4
                      )}-${e.currentTarget.value.slice(4)}`,
                      e.target.name
                    );
                    return;
                  }
                  setForm(e.currentTarget.value, e.target.name);
                }
                if (
                  e.currentTarget.value.includes("-") &&
                  e.currentTarget.value.match(/([a-zA-Z]+)/) === null
                ) {
                  if (
                    e.currentTarget.value[e.currentTarget.value.length - 1] ===
                    "-"
                  ) {
                    setForm(
                      e.currentTarget.value.slice(
                        0,
                        e.currentTarget.value.length - 1
                      ),
                      e.target.name
                    );
                    return;
                  }
                  if (
                    [5, 10, 15, 20].includes(
                      Number(e.currentTarget.value.length)
                    )
                  ) {
                    let input = e.currentTarget.value.slice(
                      0,
                      e.currentTarget.value.length - 1
                    );
                    input += "-";
                    input +=
                      e.currentTarget.value[e.currentTarget.value.length - 1];
                    setForm(input, e.target.name);
                    return;
                  }
                  setForm(e.currentTarget.value, e.target.name);
                }
              }}
            />
          </div>
          <div className={styles["credit-card-additional-info"]}>
            <div>
              <p>Month and date</p>
              <input
                value={form.dateMonth.value}
                className={`${styles["input-additional"]} ${styles.input}`}
                type="tel"
                inputMode="numeric"
                autoComplete="cc-number"
                maxLength="2"
                placeholder="00"
                style={{
                  textAlign: "right",
                  ...dateMonthError,
                }}
                name="dateMonth"
                onChange={(e) => {
                  if (!isNaN(Number(e.currentTarget.value))) {
                    if (
                      Number(e.currentTarget.value) <= 12 &&
                      Number(e.currentTarget.value) >= 1
                    ) {
                      setForm(e.currentTarget.value, e.target.name);
                    }
                  }
                  if (e.currentTarget.value === "") {
                    setForm(e.currentTarget.value, e.target.name);
                  }
                }}
              />
              <span>/</span>
              <input
                value={form.dateDay.value}
                className={`${styles["input-additional"]} ${styles.input}`}
                type="tel"
                inputMode="numeric"
                autoComplete="cc-number"
                maxLength="2"
                placeholder="00"
                style={{
                  textAlign: "left",
                  paddingLeft: "5px",
                  paddingRight: "0px",
                  ...dateDayError,
                }}
                name="dateDay"
                onChange={(e) => {
                  if (!isNaN(Number(e.currentTarget.value))) {
                    if (!isNaN(Number(e.currentTarget.value))) {
                      if (
                        Number(e.currentTarget.value) <= 31 &&
                        Number(e.currentTarget.value) >= 1
                      ) {
                        setForm(e.currentTarget.value, e.target.name);
                      }
                    }
                    if (e.currentTarget.value === "") {
                      setForm(e.currentTarget.value, e.target.name);
                    }
                  }
                }}
              />
            </div>
            <div>
              <p>CVV code</p>
              <input
                value={form.cvv.value}
                type="password"
                className={`${styles["input-cvv"]} ${styles.input}`}
                inputMode="numeric"
                autoComplete="cc-number"
                maxLength="3"
                placeholder="000"
                name="cvv"
                style={cvvError}
                onChange={(e) => {
                  if (!isNaN(Number(e.currentTarget.value))) {
                    setForm(e.currentTarget.value, e.target.name);
                  }
                }}
              />
            </div>
          </div>
        </section>
        <div className={styles["pay-wrapper-down"]}>
          <p>Amount</p>
          <input
            style={amountError}
            name="amount"
            className={styles.input}
            placeholder="0000"
            maxLength="4"
            value={form.amount.value}
            onChange={(e) => {
              if (!isNaN(Number(e.currentTarget.value))) {
                setForm(e.currentTarget.value, e.target.name);
              }
            }}
          />
          <Button dissabled={formError || notification !== ""} text="Add amount" />
        </div>
      </form>
      <Notification clearForm={resetForm} clearNotification={setNotification} notification={notification}></Notification>
    </section>
  );
}
