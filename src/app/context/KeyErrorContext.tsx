import { PropsWithChildren, createContext, useContext, useState } from "react";
type KeyError = string | undefined;
type KeyErrorState = {
    keyError: KeyError;
  setKeyError(keyError: KeyError): void;
};

const KeyErrorContext = createContext<KeyErrorState | null>(null);

const useKeyError = (): KeyErrorState => {
  const context = useContext(KeyErrorContext);

  if (!context) {
    throw new Error("Please use KeyErrorProvider in parent component");
  }

  return context;
};

export const KeyErrorProvider = (props: PropsWithChildren) => {
  const [keyError, setKeyError] = useState<KeyError>("");
  return (
    <KeyErrorContext.Provider value={{ keyError, setKeyError }}>
      {props.children}
    </KeyErrorContext.Provider>
  );
};

export default useKeyError;
