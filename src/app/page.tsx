"use client";

import React, { useState, FormEvent } from "react";


export default function Home() {
  const [matricula, setMatricula] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
 
    console.log(matricula,checkAutomata())
    setResult(checkAutomata()? "cadena valida" : "invalida")
  };

  const handleMatricula=(e:React.ChangeEvent<HTMLInputElement>) => {
    setMatricula(e.target.value.toUpperCase());
  }
  
  const checkAutomata=() => {
    const regex =/^S[S-Y]-([1-9]\d{3}|0[1-9]\d{2}|00[1-9]\d{1}|000[1-9])-[A-Z]$/;
    return regex.test(matricula)
  }
  
  return (
    <>
      <section className="h-full w-full bg-zinc-800">
        <form onSubmit={handleSubmit}>
          <div className="flex min-h-screen flex-col items-center justify-center p-24 font-hack">
            <h1 className="text-7xl mb-7 ">Autury</h1>
            <span>
              Ingrese una matrula, con el siguiente rango de datos SS-0001-A
              SY-9999-Z
            </span>

            <span>Ejemplos aceptados</span>
            <ul>
              <li>SS-0001-A</li>
              <li>SV-1000-F</li>
              <li>SR-0101-H</li>
              <li>SX-0213-R</li>
            </ul>

            <input
              className="bg-slate-50 p-2 text-center mt-7"
              type="text"
              placeholder="ingresa tu matricula"
              value={matricula}
              onChange={handleMatricula}
            />
            <input type="submit" value="Evaluar"/>
            <p>{result}</p>
          </div>
        </form>
      </section>
    </>
  );
}