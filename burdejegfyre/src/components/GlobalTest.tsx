import { useNokKwhContext } from "../contexts/NokKwhContext";

export default function GlobalTest() {
  const { nokKwh, setNokKwh } = useNokKwhContext();

  return (
    <>
      <p>This nokKwh is shared across components using React Context!</p>
      <p>NokKwh = {nokKwh}</p>
    </>
  );
}
