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
async function check (matricula: string){
    const seconds = 1000;
    const matriculaChain = matricula.split('');
    const secondChar = /^[S-Y]$/;
    const notZero = /^[1-9]$/;
    const isNumber = /^[0-9]$/;
    const lastChar = /^([A-Z])$/;
  
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  
    const executeWithDelay = async (
        fn: (arg: any) => void,
        args: any
      ): Promise<void> => {
        fn(args);
        await wait(seconds);
      };
      await executeWithDelay(setKeyEval, "q0");
    if (matriculaChain[0]=="S"){
        await executeWithDelay(setKeyEval, "q1");
    }else{
        setKeyEval("q1-error")
        return 
    }
    
    if(secondChar.test(matriculaChain[1])){
        await executeWithDelay(setKeyEval, "q2");
    }else{
        setKeyEval("q2-error")
        return 
    }
    
    if(matriculaChain[2]=="-"){
        await executeWithDelay(setKeyEval, "q3");
    }else{
        setKeyEval("q3-error")
        return 
    }
    
    if(matriculaChain[3]=="0"){
        await executeWithDelay(setKeyEval, "q4");
        if(matriculaChain[4]=="0"){
            await executeWithDelay(setKeyEval, "q5");
            if(matriculaChain[5]=="0"){
                await executeWithDelay(setKeyEval, "q6");
                if(notZero.test(matriculaChain[6])){
                    await executeWithDelay(setKeyEval, "q7");
                }else{
                    setKeyEval("q7-error")
                    return 
                }
            }else if(notZero.test(matriculaChain[5])){
                await executeWithDelay(setKeyEval, "q12");
                if(isNumber.test(matriculaChain[6])){
                    await executeWithDelay(setKeyEval, "q7");
                }else{
                    setKeyEval("q7-error")
                    return 
                }
            }
            else{
                setKeyEval("q5-error")
                return 
            }
        }else if(notZero.test(matriculaChain[4])){
            await executeWithDelay(setKeyEval, "q11");
            if(isNumber.test(matriculaChain[5])){
                await executeWithDelay(setKeyEval, "q12");
            }else{
                setKeyEval("q12-error")
                return 
            }
            if(isNumber.test(matriculaChain[6])){
                await executeWithDelay(setKeyEval, "q7");
            }else{
                setKeyEval("q7-error")
                return 
            }
        } else{
            setKeyEval("q4-error")
            return 
        }     
    }else if(notZero.test(matriculaChain[3])){
        await executeWithDelay(setKeyEval, "q10");
        if(isNumber.test(matriculaChain[4])){
            await executeWithDelay(setKeyEval, "q11");
        }else{
            setKeyEval("q11-error")
            return 
        }
        if(isNumber.test(matriculaChain[5])){
            await executeWithDelay(setKeyEval, "q12");
        }else{
            setKeyEval("q12-error")
            return 
        }
        if(isNumber.test(matriculaChain[6])){
            await executeWithDelay(setKeyEval, "q7");
        }else{
            setKeyEval("q7-error")
            return 
        }
    }else{
        setKeyEval("q3-error")
        return 
    }
    if(matriculaChain[7]=="-"){
        await executeWithDelay(setKeyEval, "q8");
    }else{
        setKeyEval("q8-error")
        return 
    }
    if(lastChar.test(matriculaChain[8])){
        await executeWithDelay(setKeyEval, "q9");
    }else{
        setKeyEval("q9-error")
        return 
    }
  }
  
  return (
    <KeyEvalContext.Provider value={{ keyEval, setKeyEval, check }}>
      {props.children}
    </KeyEvalContext.Provider>
  );
};

export default useKeyEval;
