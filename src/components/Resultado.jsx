import { useCallback, useMemo, useRef } from 'react'
import useCotizador from "../hooks/useCotizador"
import {Marcas, PLANES} from '../constants'

const Resultado = () => {
    //Extraigo resultado, datos y aplico destruccion para iterar entre los objetos dentro
    const {resultado, datos} = useCotizador()
    const {marca, plan, year} = datos
    const yearRef = useRef(year)//Congela el año seleccionado hasta que se efectue el cambio del resultado
    
    const [nombreMarca] = useCallback( 
        Marcas.filter(m => m.id === Number(marca) ),//Defino m como variable temporal para iterar
        [resultado] //Espera el cambio del resultado para modificar los datos del resumen
    )
    const [nombrePlan] = useCallback(
        PLANES.filter(p => p.id === Number(plan) ),//Defino p como variable temporal para iterar
        [resultado]//Espera el cambio del resultado para modificar los datos del resumen
    )

 

    if (resultado === 0) return null
  return (
    <div className="bg-gray-100 text-center mt-5 p-5 shadow">
        <h2 className="text-gray-600 font-black text-3xl">
            Resumen
        </h2>

        <p className="my-2">
            <span className="font-bold">Marca:</span>
            {nombreMarca.nombre}
        </p>
        <p className="my-2">
            <span className="font-bold">Plan:</span>
            {nombrePlan.nombre}
        </p>
        <p className="my-2">
            <span className="font-bold">Año del Auto:</span>
            {yearRef.current}
        </p>
        <p className="my-2 text-2xl">
            <span className="font-bold">Total Cotizacion:</span>
            {resultado}
        </p>
      
    </div>
  )
}

export default Resultado
