import { useState,createContext } from 'react'
import {obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero} from '../helpers' 

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

        const[datos, setDatos] = useState({
            marca: '',
            year: '',
            plan: ''
        })

        const [error, setError] = useState('')
        const [resultado, setResultado] = useState(0)
        const [cargando, setCargando] = useState(false)
    
    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
   })
}

    const cotizarSeguro = () => {
        //Base
        let resultado = 2000
        //Obetener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)
        

        //Resta del 3% por cada año
        resultado -=((diferencia*3)*resultado)/100

        
        //Europeo 30%
        //Americano 15%
        //Asiatico 5%
        resultado*=calcularMarca(datos.marca)
        

        //Basico 20%
        //Completo 50%
        resultado *= calcularPlan(datos.plan)

       //Ajuste dinero
       resultado = formatearDinero(resultado)


       setCargando(true)

            setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
             }, 3000);
       

    }

    return(
        <CotizadorContext.Provider
            value={{
                datos,
               handleChangeDatos,
               error,
               setError,
               cotizarSeguro,
               resultado,
               cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}
export default CotizadorContext 