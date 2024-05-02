"use client";

import { useFormStatus } from "react-dom";
import styles from "../page.module.css";
import { useFormState } from "react-dom";
import { createPost } from "../actions";

const initialState = {
  message: "",
};

const FormComponent = () => {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(createPost, initialState);

  return (
    <div className={styles.form}>
      {state?.data === null ? (
        <div className={styles.error}>{state?.message}</div>
      ) : (
        ""
      )}
      <form action={formAction} method="post">
        <label>Title</label>
        <input className={styles.input} type="text" name="title" />
        <label>Description</label>
        <input className={styles.input} type="text" name="description" />
        <button type="submit" disabled={pending}>
          Add
        </button>
      </form>
    </div>
  );
};
export default FormComponent;
