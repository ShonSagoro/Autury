"use client";

import React, { useState, FormEvent } from "react";
import CardForm from "./components/CardForm";
import { KeyErrorProvider } from "./context/KeyErrorContext";

export default function Home() {
  return (
    <>
    <KeyErrorProvider>
      <section className="h-screen bg-zinc-700 flex flex-col items-center justify-center">
        <CardForm/>
      </section>
    </KeyErrorProvider>
    </>
  );
}