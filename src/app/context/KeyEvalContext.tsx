import { PropsWithChildren, createContext, useContext, useState } from "react";
import { checkGrafAutomata } from "../utils/checksAutomata";
import useKeyError from "./KeyErrorContext";
type KeyEval = string | undefined;
type KeyEvalState = {
    keyEval: KeyEval;
  setKeyEval(keyEval: KeyEval): void;
  check(matricula: string):void;
};

const KeyEvalContext = createContext<KeyEvalState | null>(null);

const useKeyEval = (): KeyEvalState => {
  const context = useContext(KeyEvalContext);

  if (!context) {
    throw new Error("Please use KeyEvalProvider in parent component");
  }
  return context;
};

export const KeyEvalProvider = (props: PropsWithChildren) => {
    const [keyEval, setKeyEval] = useState<KeyEval>("");

//si alguien ve esto, eran las 3 de la mañana y me odio demasiado.
async function check(matricula: string) {
    const seconds = 1000;
    const matriculaChain = matricula.split('');
  
    const patterns = [
      /^[S-Y]$/, // Second Character
      /^([A-Z])$/, // Last Character
      /^0$/, // Zero
      /^[1-9]$/, // Not Zero
      /^[0-9]$/, // Is Number
    ];
    const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  
    const stateMap = [
      { state: "q0", nextStates: ["q1-error", "q1"] },
      { state: "q1", nextStates: ["q2-error", "q2"] },
      { state: "q2", nextStates: ["q3-error", "q3"] },
      { state: "q3", nextStates: ["q4-error", "q4"] },
      { state: "q4", nextStates: ["q5-error", "q5", "q11-error", "q11"] },
      { state: "q5", nextStates: ["q6-error", "q6", "q12-error", "q12"] },
      { state: "q6", nextStates: ["q7-error", "q7"] },
      { state: "q7", nextStates: ["q7-error", "q8-error", "q8"] },
      { state: "q8", nextStates: ["q9-error", "q9"] },
    ];
  
    const executeWithDelay = async (currentState: string) => {
      const index = stateMap.findIndex(item => item.state === currentState);
      if (index === -1) {
        return; // State not found
      }
  
      const nextState = await determineNextState(index);
      setKeyEval(nextState);
    };
  
    const determineNextState = async (currentIndex: number): Promise<string> => {
      const currentState = stateMap[currentIndex];
      const patternIndex = Math.min(currentIndex, patterns.length - 1);
      const pattern = patterns[patternIndex];
  
      for (const nextState of currentState.nextStates) {
        if (pattern.test(matriculaChain[currentIndex])) {
          await wait(seconds);
          return nextState;
        }
      }
  
      return currentState.nextStates[0]; // Default to error state
    };
  
    await executeWithDelay("q0");
    for (let i = 1; i <= 8; i++) {
      await executeWithDelay(`q${i}`);
    }
  }
  
  

  return (
    <KeyEvalContext.Provider value={{ keyEval, setKeyEval, check }}>
      {props.children}
    </KeyEvalContext.Provider>
  );
};

export default useKeyEval;
