import {
  type Dispatch,
  type SetStateAction,
  createContext,
  type ReactNode,
  useState,
  useContext,
} from "react";

type WoodNokKwhContextType = {
  woodWoodNokKwh: number;
  setWoodNokKwh: Dispatch<SetStateAction<number>>;
};

export const WoodNokKwhContext = createContext<WoodNokKwhContextType>(
  {} as WoodNokKwhContextType,
);

type ContextProviderProps = {
  children?: ReactNode;
};

export default function ContextProvider({ children }: ContextProviderProps) {
  const [woodWoodNokKwh, setWoodNokKwh] = useState(1);
  const context: WoodNokKwhContextType = { setWoodNokKwh, woodWoodNokKwh };
  return (
    <WoodNokKwhContext.Provider value={context}>
      {children}
    </WoodNokKwhContext.Provider>
  );
}

export const useWoodNokKwhContext = () => useContext(WoodNokKwhContext);
