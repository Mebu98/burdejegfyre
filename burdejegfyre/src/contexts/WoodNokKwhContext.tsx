import {
  type Dispatch,
  type SetStateAction,
  createContext,
  type ReactNode,
  useState,
  useContext,
} from "react";

type WoodNokKwhContextType = {
  woodNokKwh: number;
  setWoodNokKwh: Dispatch<SetStateAction<number>>;
};

const WoodNokKwhContext = createContext<WoodNokKwhContextType>(
  {} as WoodNokKwhContextType,
);

type ContextProviderProps = {
  children?: ReactNode;
};

export default function ContextProvider({ children }: ContextProviderProps) {
  const [woodNokKwh, setWoodNokKwh] = useState(1);
  const context: WoodNokKwhContextType = { setWoodNokKwh, woodNokKwh };
  return (
    <WoodNokKwhContext.Provider value={context}>
      {children}
    </WoodNokKwhContext.Provider>
  );
}

export const useWoodNokKwhContext = () => useContext(WoodNokKwhContext);
