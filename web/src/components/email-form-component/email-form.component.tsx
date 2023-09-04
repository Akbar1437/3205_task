import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { InputType } from "../../types";
import styles from "./email-form.styles.module.css";

export function EmailForm({
  onSubmit,
}: {
  onSubmit: (data: InputType) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>();

  const handleFormSubmit: SubmitHandler<InputType> = (data) => {
    onSubmit(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <input
        className={styles.inputEmail}
        {...register("email", {
          required: "Email is required",
          validate: {
            matchPattern: (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              "Email address must be a valid address",
          },
        })}
      />
      {errors.email && errors.email.message && (
        <span className={styles.error}>{errors.email.message}</span>
      )}

      <InputMask
        className={styles.inputMask}
        mask="99-99-99"
        maskChar=" "
        type="text"
        {...register("number")}
        placeholder="Number (e.g., 22-11-22)"
      />
      <button className={styles.btn} type="submit">
        Submit
      </button>
    </form>
  );
}
