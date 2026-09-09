"use client";

import { Shuffle } from "lucide-react";
import { useState } from "react";

const facts = [
  "odeio chocolate",
  "amo filmes de terror",
  "sou desenhista realista",
  "toco teclado e bateria",
  "tive uma cadela chamada Brenda",
  "se pudesse ser um animal seria um ornitorrinco",
] as const;

export function RandomFact() {
  const [factIndex, setFactIndex] = useState<number | null>(null);

  function showRandomFact() {
    if (facts.length === 1) {
      setFactIndex(0);
      return;
    }

    let nextIndex = Math.floor(Math.random() * facts.length);

    while (nextIndex === factIndex) {
      nextIndex = Math.floor(Math.random() * facts.length);
    }

    setFactIndex(nextIndex);
  }

  return (
    <div className="random-fact">
      <button type="button" className="random-fact-button" onClick={showRandomFact}>
        <span>[ Random Fact ]</span>
        <Shuffle size={15} aria-hidden="true" />
      </button>

      <div className="random-fact-output" aria-live="polite">
        {factIndex === null ? (
          <span className="random-fact-hint">clique para descobrir algo inútil sobre mim</span>
        ) : (
          <p>{facts[factIndex]}</p>
        )}
      </div>
    </div>
  );
}
