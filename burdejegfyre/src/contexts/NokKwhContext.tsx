import {
  type Dispatch,
  type SetStateAction,
  createContext,
  type ReactNode,
  useState,
  useContext,
} from "react";

type NokKwhContextType = {
  nokKwh: number;
  setNokKwh: Dispatch<SetStateAction<number>>;
};

export const NokKwhContext = createContext<NokKwhContextType>(
  {} as NokKwhContextType,
);

type ContextProviderProps = {
  children?: ReactNode;
};

export default function ContextProvider({ children }: ContextProviderProps) {
  const [nokKwh, setNokKwh] = useState(1);
  const context: NokKwhContextType = { setNokKwh, nokKwh };
  return (
    <NokKwhContext.Provider value={context}>{children}</NokKwhContext.Provider>
  );
}

export const useNokKwhContext = () => useContext(NokKwhContext);
