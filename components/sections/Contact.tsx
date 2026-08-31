"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/muhammadanzar111",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/muhammadanzar111/",
    label: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    href: "mailto:muhammadanzar111@gmail.com",
    label: "Email",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) errors.message = "Message is required.";
  else if (values.message.trim().length < 8)
    errors.message = "Message must be at least 8 characters.";
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((err) => ({ ...err, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setFormState("submitting");
    const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
    );
    window.location.href = `mailto:muhammadanzar111@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setFormState("success");
      setValues({ name: "", email: "", message: "" });
    }, 600);
  };

  return (
    <section id="contact" className="relative px-5 sm:px-8 md:px-16 py-20 md:py-32 overflow-hidden">
      <div className="mesh-glow" />

      <div className="relative z-10 grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-start max-w-5xl">
        {/* Left: heading + social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionLabel number="05" label="Contact" />

          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl tracking-tight mb-5 leading-[1.1] text-white">
            Let's build
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              something.
            </span>
          </h2>

          <p className="text-muted max-w-sm leading-relaxed mb-8 text-sm sm:text-base">
            Open to internships, freelance projects, and collaborations in data
            science, e-commerce, and AI engineering.
          </p>

          {/* Social links */}
          <div className="space-y-2.5">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label !== "Email" ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-muted hover:text-white transition-colors group py-1"
              >
                <span className="w-9 h-9 glass-card-flat rounded-full flex items-center justify-center group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 transition-all text-white/80">
                  {s.icon}
                </span>
                {s.label}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {formState === "success" ? (
            <div className="glass-card rounded-3xl p-6 sm:p-8 text-center border border-white/10 shadow-2xl">
              <div className="text-3xl mb-3">🎉</div>
              <h3 className="font-display text-xl sm:text-2xl mb-2 text-white">Message prepared!</h3>
              <p className="text-muted text-sm leading-relaxed">
                Your email client should have opened with the message ready. I'll get back to you shortly.
              </p>
              <button
                onClick={() => setFormState("idle")}
                className="mt-6 text-xs text-indigo-400 hover:text-white transition-colors underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="glass-card rounded-3xl p-5 sm:p-8 space-y-4 sm:space-y-5 border border-white/10 shadow-2xl"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs text-indigo-300 font-medium mb-1.5 tracking-wider uppercase"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  className={`form-input min-h-[46px] ${errors.name ? "error" : ""}`}
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs text-indigo-300 font-medium mb-1.5 tracking-wider uppercase"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`form-input min-h-[46px] ${errors.email ? "error" : ""}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs text-indigo-300 font-medium mb-1.5 tracking-wider uppercase"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity…"
                  className={`form-input ${errors.message ? "error" : ""}`}
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full rounded-full py-3.5 text-sm font-medium transition-all
                  bg-indigo-500 hover:bg-indigo-600 active:scale-[0.99] text-white shadow-lg shadow-indigo-500/25
                  disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formState === "submitting" ? "Opening email…" : "Send Message →"}
              </button>

              <p className="text-[11px] text-muted text-center">
                Opens your default email client with details pre-filled.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <p className="relative z-10 text-xs text-muted mt-16 md:mt-24 text-center sm:text-left">
        © {new Date().getFullYear()} Muhammad Anzar.
      </p>
    </section>
  );
}
