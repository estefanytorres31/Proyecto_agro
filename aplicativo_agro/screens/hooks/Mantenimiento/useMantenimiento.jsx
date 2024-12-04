import { useContext } from "react";
import MantenimientoContext from "../../context/Mantenimiento/MantenimientoContext";

const useMantenimiento=()=>useContext(MantenimientoContext);

export default useMantenimiento;