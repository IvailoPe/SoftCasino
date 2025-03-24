import { useNavigate } from "react-router";
import requester from "../../api/requester";
import Button from "../../components/Button/Button";
import FormErrorMessage from "../../components/Form-error-message/Form-error-message";
import useForm from "../../hooks/useFormHook";
import { checkForErrors } from "../../utils/useFormUtils";

import styles from "./Item-create-layout-styles.module.css";

export default function ItemCreateLayout() {
  const navigate = useNavigate()
  const [form, setForm, formSubmitFunction] = useForm(
    {
      title: { maxL: 35, minL: 5, required: true, value: "" },
      url: { required: true, link: true, value: "" },
      description: { maxL: 450, minL: 30, required: true, value: "" },
      quantity: { maxNL: 1000, minNL: 1, required: true, value: "" },
      price:{maxNL:100000, minNL:10, required:true, value: ""}
    },
    async (e) => {
      e.preventDefault();
      let data = await requester(
        "POST",
        import.meta.env.VITE_API_ADRESS + "/items/create",
        {
          title: form.title.value,
          url: form.url.value,
          description: form.description.value,
          quantity: form.quantity.value,
          price:form.price.value
        }
      );
      if(data.error){
        alert(data.error)
        return;
      }
      navigate("/shop")
    }
  );

  let formError = checkForErrors(form);

  return (
    <section className={styles["item-create-wrapper"]}>
      <div className={styles["form-wrapper"]}>
        <form onSubmit={formSubmitFunction} className={styles["create-form"]}>
          <h2 className={styles["form-title"]}>Create item</h2>
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
          <Button dissabled={formError} text="Create"></Button>
        </form>
      </div>
    </section>
  );
}
