"use client";

import React, { useState, FormEvent } from "react";

import { checkAutomata,checkGrafAutomata } from "../utils/checksAutomata";
import Diagram from "./Diagram";
import useKeyError from "../context/KeyErrorContext";

export default function CardForm() {

  const {keyError, setKeyError} = useKeyError();
  const [matricula, setMatricula] = useState("");
  const [result, setResult] = useState("");
 

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyError(
      ""
    )
    setResult(
      checkAutomata(matricula) ? "Matricula valida" : "Matricula Invalida"
    );
    setKeyError(
      checkGrafAutomata(matricula)
    )
    console.log(keyError)
  };

  const handleMatricula = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatricula(e.target.value.toUpperCase());
  };

  return (
    <>
      <div className="h-4/5 w-3/4 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-800 w-full h-full flex items-center justify-center rounded-md"
        >
          <div className=" text-white	flex min-h-screen flex-col items-center justify-center p-24 font-hack">
            <h1 className="text-7xl mb-7">Autury</h1>
            <span>Ingrese una matrula, con el siguiente rango de datos:</span>
            <span>SS-0001-A - SY-9999-Z</span>

            <span className="mb-3">Ejemplos aceptados</span>
            <ul className="p-3">
              <li>SS-0001-A</li>
              <li>SV-1000-F</li>
              <li>SR-0101-H</li>
              <li>SX-0213-R</li>
            </ul>

            <input
              className="bg-slate-50 p-2 text-center mt-7 text-black"
              type="text"
              placeholder="ingresa tu matricula"
              value={matricula}
              onChange={handleMatricula}
            />
            <input
              type="submit"
              className="mt-2 p-2 w-1/2 rounded-md bg-sky-500 hover:bg-sky-700"
              value="Evaluar"
            />
            <p
              className={
                result == "Matricula Invalida"
                  ? "text-red-500 p-4"
                  : "text-green-500 p-4"
              }
            >
              {result}
            </p>
            <div className="h-1/5 3/4">
              <div className="h-full w-full bg-zinc-900 p-10 rounded-md">
                <Diagram/>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
