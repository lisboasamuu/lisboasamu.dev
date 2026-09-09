"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

const MAX_MESSAGE_LENGTH = 3000;

export function EmailComposer() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: siteConfig.email,
      su: "Contato pelo lisboasamu.dev",
      body: cleanMessage,
    });

    window.open(
      `https://mail.google.com/mail/?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <form className="email-composer" onSubmit={handleSubmit}>
      <label htmlFor="contact-message">ESCREVA SUA MENSAGEM</label>
      <textarea
        id="contact-message"
        name="message"
        value={message}
        maxLength={MAX_MESSAGE_LENGTH}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Oi Samuca, tenho uma ideia pra construir..."
        rows={7}
        required
      />
      <div className="composer-footer">
        <span>
          {message.length}/{MAX_MESSAGE_LENGTH}
        </span>
        <button className="composer-submit" type="submit" disabled={!message.trim()}>
          Abrir no Gmail <Send size={16} aria-hidden="true" />
        </button>
      </div>
      <p className="composer-note">
        Sem cadastro e sem backend: sua mensagem abre como rascunho no Gmail.
        Se preferir,{" "}
        <a href={siteConfig.emailHref}>use seu aplicativo de email</a>.
      </p>
    </form>
  );
}
