"use client";

import React, { useState, FormEvent } from "react";
import CardForm from "./components/CardForm";
import { KeyErrorProvider } from "./context/KeyErrorContext";
import { KeyEvalProvider } from "./context/KeyEvalContext";

export default function Home() {
  return (
    <>
      <KeyEvalProvider>
        <KeyErrorProvider>
          <section className="h-screen bg-zinc-700 flex flex-col items-center justify-center">
            <CardForm />
          </section>
        </KeyErrorProvider>
      </KeyEvalProvider>
    </>
  );
}
