"use client";

import { FC, ReactNode, useActionState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { motionTokens, springs } from "@/src/lib/motion-tokens";
import Button from "@/src/ui/Button";
import { PROJECT_TYPES } from "@/src/data/services";
import {
  submitClientRequest,
  type RequestFormState,
} from "@/src/actions/client-requests";
import scss from "./RequestForm.module.scss";

interface FieldProps {
  name: string;
  label: string;
  full?: boolean;
  error?: string;
  children: (describedBy: string | undefined) => ReactNode;
}

const Field: FC<FieldProps> = ({ name, label, full, error, children }) => {
  const errorId = error ? `request-${name}-error` : undefined;
  return (
    <div className={`${scss.field} ${full ? scss["field--full"] : ""}`}>
      <label htmlFor={`request-${name}`}>{label}</label>
      {children(errorId)}
      {error && (
        <p id={errorId} className={scss.field__error}>
          {error}
        </p>
      )}
    </div>
  );
};

const INITIAL_STATE: RequestFormState = {};

// The success panel mounts only after the form has faded out, so its
// heading takes focus from a ref callback, not an effect on `state.ok`.
const focusOnMount = (node: HTMLElement | null) => {
  node?.focus();
};

// Form only — the page heading lives in Contact. Field
// names mirror the ClientRequest entity (ТЗ §9); the request lands in
// the admin's "Заявки".
const RequestForm: FC = () => {
  const [state, formAction, pending] = useActionState(
    submitClientRequest,
    INITIAL_STATE,
  );
  const reduce = useReducedMotion();
  const offset = reduce ? 0 : motionTokens.distance.sm;
  const formRef = useRef<HTMLFormElement>(null);
  const errors = pending ? {} : (state.fieldErrors ?? {});

  // Without this a failed submit is silent for screen readers: focus moves
  // to the first field to fix, which also reads out its error.
  useEffect(() => {
    if (!state.fieldErrors) return;
    formRef.current
      ?.querySelector<HTMLElement>('[aria-invalid="true"]')
      ?.focus();
  }, [state]);

  const value = (name: string) => state.values?.[name] ?? "";
  const inputProps = (name: string, describedBy: string | undefined) => ({
    id: `request-${name}`,
    name,
    defaultValue: value(name),
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": describedBy,
  });

  return (
    // initial={false}: the form is server-rendered visible; only the
    // form → success swap animates.
    <AnimatePresence mode="wait" initial={false}>
      {state.ok ? (
        <motion.div
          key="success"
          className={scss.success}
          initial={{ opacity: 0, y: offset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: offset }}
          transition={springs.snappy}
        >
          <h2 ref={focusOnMount} tabIndex={-1}>
            Заявка отправлена
          </h2>
          <p>Мы свяжемся с вами в ближайшее время.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          className={scss.form}
          action={formAction}
          // The submit button stays focusable while sending (aria-disabled),
          // so a repeat Enter is dropped here instead.
          onSubmit={(event) => {
            if (pending) event.preventDefault();
          }}
          noValidate
          initial={{ opacity: 0, y: offset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: offset }}
          transition={springs.snappy}
        >
          <Field name="name" label="Имя" error={errors.name}>
            {(describedBy) => (
              <input
                {...inputProps("name", describedBy)}
                type="text"
                autoComplete="name"
                required
              />
            )}
          </Field>

          <Field name="company" label="Компания" error={errors.company}>
            {(describedBy) => (
              <input
                {...inputProps("company", describedBy)}
                type="text"
                autoComplete="organization"
                required
              />
            )}
          </Field>

          <Field name="email" label="Email" error={errors.email}>
            {(describedBy) => (
              <input
                {...inputProps("email", describedBy)}
                type="email"
                autoComplete="email"
                required
              />
            )}
          </Field>

          <Field name="phone" label="Телефон" error={errors.phone}>
            {(describedBy) => (
              <input
                {...inputProps("phone", describedBy)}
                type="tel"
                autoComplete="tel"
                required
              />
            )}
          </Field>

          <Field name="title" label="Название проекта" error={errors.title}>
            {(describedBy) => (
              <input
                {...inputProps("title", describedBy)}
                type="text"
                required
              />
            )}
          </Field>

          <Field
            name="project_type"
            label="Тип проекта"
            error={errors.project_type}
          >
            {(describedBy) => (
              <select {...inputProps("project_type", describedBy)} required>
                <option value="">Выберите тип</option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            )}
          </Field>

          <Field
            name="budget"
            label="Бюджет, сом — необязательно"
            error={errors.budget}
          >
            {(describedBy) => (
              <input
                {...inputProps("budget", describedBy)}
                type="text"
                inputMode="numeric"
                placeholder="Например, 300 000"
              />
            )}
          </Field>

          <Field
            name="description"
            label="Описание проекта"
            full
            error={errors.description}
          >
            {(describedBy) => (
              <textarea
                {...inputProps("description", describedBy)}
                rows={5}
                required
              />
            )}
          </Field>

          {state.error && !pending && (
            <p role="alert" className={scss.alert}>
              {state.error}
            </p>
          )}

          <div className={scss.submitRow}>
            <Button type="submit" variant="primary" aria-disabled={pending}>
              {pending ? "Отправляем…" : "Отправить заявку"}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default RequestForm;
