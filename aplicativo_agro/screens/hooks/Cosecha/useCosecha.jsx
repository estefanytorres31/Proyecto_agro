import { useContext } from "react";
import CosechaContext from "../../context/Cosecha/CosechaContext";

const useCosecha=()=>useContext(CosechaContext);

export default useCosecha;