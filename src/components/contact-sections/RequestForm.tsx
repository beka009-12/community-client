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
  optional?: boolean;
  error?: string;
  children: (describedBy: string | undefined) => ReactNode;
}

const Field: FC<FieldProps> = ({ name, label, optional, error, children }) => {
  const errorId = error ? `request-${name}-error` : undefined;
  return (
    <div className={scss.field}>
      <label htmlFor={`request-${name}`} className={scss.label}>
        {label}
        {optional && <span className={scss.label__optional}>необязательно</span>}
      </label>
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

// Form only — the page heading lives in Contact. Field names mirror the
// API's ClientRequestCreate, which requires company and phone, so those two
// aren't marked «необязательно» as in the mockup.
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

  // The closing call on other pages links here as ?type=…; the type picked
  // there is preselected unless one is already chosen. Read from the URL
  // after mount, so the page stays static (no useSearchParams).
  useEffect(() => {
    const form = formRef.current;
    const type = new URLSearchParams(window.location.search).get("type");
    if (!form || !type || form.querySelector('input[name="project_type"]:checked')) return;
    const option = [...form.querySelectorAll<HTMLInputElement>('input[name="project_type"]')].find(
      (input) => input.value === type,
    );
    if (option) option.checked = true;
  }, []);

  const value = (name: string) => state.values?.[name] ?? "";
  const inputProps = (name: string, describedBy: string | undefined) => ({
    id: `request-${name}`,
    name,
    defaultValue: value(name),
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": describedBy,
  });
  const typeErrorId = errors.project_type ? "request-project_type-error" : undefined;

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
          <div className={scss.row}>
            <Field name="name" label="Имя" error={errors.name}>
              {(describedBy) => (
                <input
                  {...inputProps("name", describedBy)}
                  type="text"
                  autoComplete="name"
                  placeholder="Как к вам обращаться"
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
                  placeholder="Название компании"
                  required
                />
              )}
            </Field>
          </div>

          <div className={scss.row}>
            <Field name="email" label="Email" error={errors.email}>
              {(describedBy) => (
                <input
                  {...inputProps("email", describedBy)}
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.kg"
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
                  placeholder="+996 ___ ___ ___"
                  required
                />
              )}
            </Field>
          </div>

          <Field name="title" label="Название проекта" error={errors.title}>
            {(describedBy) => (
              <input
                {...inputProps("title", describedBy)}
                type="text"
                placeholder="Например, личный кабинет для клиентов"
                required
              />
            )}
          </Field>

          <fieldset className={scss.types}>
            <legend className={scss.label}>Что нужно сделать</legend>
            <div className={scss.types__list}>
              {PROJECT_TYPES.map((type, index) => (
                <label key={type} className={scss.type}>
                  <input
                    type="radio"
                    name="project_type"
                    value={type}
                    defaultChecked={value("project_type") === type}
                    aria-invalid={index === 0 ? Boolean(errors.project_type) : undefined}
                    aria-describedby={typeErrorId}
                    required
                  />
                  {type}
                </label>
              ))}
            </div>
            {errors.project_type && (
              <p id={typeErrorId} className={scss.field__error}>
                {errors.project_type}
              </p>
            )}
          </fieldset>

          <Field name="description" label="Описание задачи" error={errors.description}>
            {(describedBy) => (
              <textarea
                {...inputProps("description", describedBy)}
                rows={4}
                placeholder="Что нужно сделать, для кого и к какому сроку"
                required
              />
            )}
          </Field>

          <Field name="budget" label="Бюджет" optional error={errors.budget}>
            {(describedBy) => (
              <input
                {...inputProps("budget", describedBy)}
                type="text"
                inputMode="numeric"
                placeholder={"Например, 300 000 сом"}
              />
            )}
          </Field>

          {state.error && !pending && (
            <p role="alert" className={scss.alert}>
              {state.error}
            </p>
          )}

          <div className={scss.submitRow}>
            <Button type="submit" variant="primary" size="lg" aria-disabled={pending}>
              {pending ? "Отправляем…" : "Отправить заявку"}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default RequestForm;
