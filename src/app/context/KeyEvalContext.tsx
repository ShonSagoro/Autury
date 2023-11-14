import next from "next";
import { PropsWithChildren, createContext, useContext, useState } from "react";
type KeyEval = string | undefined;
type KeyEvalState = {
  keyEval: KeyEval;
  setKeyEval(keyEval: KeyEval): void;
  check(matricula: string): void;
};

const KeyEvalContext = createContext<KeyEvalState | null>(null);


type Node = {
  nextState: string;
  error: string;
  rule: RegExp;
};
const useKeyEval = (): KeyEvalState => {
  const context = useContext(KeyEvalContext);

  if (!context) {
    throw new Error("Please use KeyEvalProvider in parent component");
  }
  return context;
};

export const KeyEvalProvider = (props: PropsWithChildren) => {
  const stateMap: { [key: string]: Node[] } = {
    "q0": [
      {
        nextState: "q1",
        error: "q0-error",
        rule: /^S$/,
      },
    ],
    "q1": [
      {
        nextState: "q2",
        error: "q1-error",
        rule: /^[S-Y]$/,
      },
    ],
    "q2": [
      {
        nextState: "q3",
        error: "q2-error",
        rule: /^-$/,
      },
    ],
    "q3": [
      {
        nextState: "q4",
        error: "q3-error",
        rule: /^0$/,
      },
      {
        nextState: "q10",
        error: "q3-error",
        rule: /^[1-9]$/,
      },
    ],
    "q4": [
      {
        nextState: "q5",
        error: "q4-error",
        rule: /^0$/,
      },
      {
        nextState: "q11",
        error: "q4-error",
        rule: /^[1-9]$/,
      },
    ],
    "q5": [
      {
        nextState: "q6",
        error: "q5-error",
        rule: /^0$/,
      },
      {
        nextState: "q12",
        error: "q5-error",
        rule: /^[1-9]$/,
      },
    ],
    "q6": [
      {
        nextState: "q7",
        error: "q6-error",
        rule: /^[1-9]$/,
      },
    ],
    "q7": [
      {
        nextState: "q8",
        error: "q7-error",
        rule: /^-$/,
      },
    ],
    "q8": [
      {
        nextState: "q9",
        error: "q8-error",
        rule: /^[A-Z]$/,
      },
    ],
    "q10": [
      {
        nextState: "q11",
        error: "q10-error",
        rule: /^[0-9]$/,
      },
    ],
    "q11": [
      {
        nextState: "q12",
        error: "q11-error",
        rule: /^[0-9]$/,
      },
    ],
    "q12": [
      {
        nextState: "q7",
        error: "q12-error",
        rule: /^[0-9]$/,
      },
    ],
  };
  const [keyEval, setKeyEval] = useState<KeyEval>("");

  //si alguien ve esto, eran las 3 de la mañana y me odio demasiado.
  async function check(matricula: string) {
    const seconds = 1000;
    const matriculaChain = matricula.split("");
    let state: string | undefined ="q0"
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    
    const executeWithDelay = async (
      fn: (arg: any) => void,
      args: any
      ): Promise<void> => { 
        fn(args);
        await wait(seconds);
      };
      await executeWithDelay(setKeyEval, state);


    for (const char of matriculaChain) {
        state=validateChar(state, char)
        const checkError=keyEval?.split("-")
        if (checkError!= undefined && checkError[1]=="error") {
          setKeyEval(state)
          return 
        }else if (keyEval!=undefined){
          setKeyEval(state)
          await executeWithDelay(setKeyEval, state);
        }
      }
  }

  const validateChar=(currentState: string | undefined, char: string)=>{
    if (currentState !== undefined) {
      if (stateMap[currentState] && stateMap[currentState].length > 0){
        for (const checkState of stateMap[currentState]) {
          
          if (checkState.rule.test(char)){
            return checkState.nextState
          }
        }
        return stateMap[currentState][0].error
      }
    }
  }

  return (
    <KeyEvalContext.Provider value={{ keyEval, setKeyEval, check }}>
      {props.children}
    </KeyEvalContext.Provider>
  );
};

export default useKeyEval;
