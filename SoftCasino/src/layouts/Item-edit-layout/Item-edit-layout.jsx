import { useNavigate, useParams } from "react-router";
import Button from "../../components/Button/Button";

import styles from "./Item-edit-layout-styles.module.css";
import useForm from "../../hooks/useFormHook";
import requester from "../../api/requester";
import { checkForErrors } from "../../utils/useFormUtils";
import FormErrorMessage from "../../components/Form-error-message/Form-error-message";
import useFetch from "../../hooks/useFetchHook";
import { useEffect } from "react";
import useRouteGuard from "../../hooks/useRouteGuard";

export default function ItemEditLayout() {
  useRouteGuard();
  const navigate = useNavigate();
  const params = useParams();
  const [item] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/items/" + params.id,
    null,
    false
  );

  useEffect(() => {
    if (item.title) {
      setForm(item.title, "title");
      setForm(item.link, "url");
      setForm(item.description, "description");
      setForm(item.quantity, "quantity");
      setForm(item.price, "price");
    }
  }, [item]);

  const [form, setForm, formSubmitFunction] = useForm(
    {
      title: { maxL: 35, minL: 5, required: true, value: "" },
      url: { required: true, link: true, value: "" },
      description: { maxL: 450, minL: 30, required: true, value: "" },
      quantity: { maxNL: 1000, minNL: 1, required: true, value: "" },
      price: { maxNL: 100000, minNL: 10, required: true, value: "" },
    },
    async (e) => {
      e.preventDefault();
      let data = await requester(
        "PUT",
        import.meta.env.VITE_API_ADRESS + "/items/" + item._id,
        {
          title: form.title.value,
          url: form.url.value,
          description: form.description.value,
          quantity: form.quantity.value,
          price: form.price.value,
        }
      );
      if (data.error) {
        alert(data.error);
        return;
      }
      navigate("/item/" + item._id);
    }
  );

  let formError = checkForErrors(form);

  return (
    <section className={styles["item-edit-wrapper"]}>
      <div className={styles["form-wrapper"]}>
        <form onSubmit={formSubmitFunction} className={styles["edit-form"]}>
          <h2 className={styles["form-title"]}>Edit item</h2>
          <div className={styles["inputs-wrapper"]}>
            <label htmlFor="title">Title</label>
            <input
              name="title"
              value={form.title.value}
              id="title"
              className={styles["input"]}
              type="text"
              onChange={(e) => {
                setForm(e.currentTarget.value, e.target.name);
              }}
            />
            <FormErrorMessage text={form.title.error} />
          </div>
          <div className={styles["inputs-wrapper"]}>
            <label htmlFor="url">Url</label>
            <input
              name="url"
              value={form.url.value}
              id="url"
              className={styles["input"]}
              type="text"
              onChange={(e) => {
                setForm(e.currentTarget.value, e.target.name);
              }}
            />
            <FormErrorMessage text={form.url.error} />
          </div>
          <div className={styles["inputs-wrapper"]}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={form.description.value}
              className={`${styles["create-textarea"]} ${styles.input}"`}
              rows="10"
              cols="80"
              id="description"
              onChange={(e) => {
                setForm(e.currentTarget.value, e.target.name);
              }}
            ></textarea>
            <FormErrorMessage text={form.description.error} />
          </div>
          <div className={styles["inputs-wrapper"]}>
            <label htmlFor="quantity">Quantity</label>
            <input
              name="quantity"
              value={form.quantity.value}
              id="quantity"
              className={styles["input"]}
              type="text"
              onChange={(e) => {
                if (!isNaN(Number(e.currentTarget.value))) {
                  setForm(e.currentTarget.value, e.target.name);
                }
              }}
            />
            <FormErrorMessage text={form.quantity.error} />
          </div>
          <div className={styles["inputs-wrapper"]}>
            <label htmlFor="price">Price</label>
            <input
              name="price"
              value={form.price.value}
              id="price"
              className={styles["input"]}
              type="text"
              onChange={(e) => {
                if (!isNaN(Number(e.currentTarget.value))) {
                  setForm(e.currentTarget.value, e.target.name);
                }
              }}
            />
            <FormErrorMessage text={form.price.error} />
          </div>
          <Button dissabled={formError} text="Edit"></Button>
        </form>
      </div>
    </section>
  );
}
