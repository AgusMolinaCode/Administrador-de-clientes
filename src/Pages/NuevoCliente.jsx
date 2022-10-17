import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../Components/Formulario"
import Error from "../Components/Error"
import { agregarCliente } from "../Data/Clientes"

export async function action({request}) {
    const formData = await request.formData()
    
    const datos = Object.fromEntries(formData)

    const email = formData.get('email')

    const errores = []
    if (Object.values(datos).includes('')) {
      errores.push('Todos los campos son obligatorios')
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
      errores.push('Email no valido')
    }

    if (Object.keys(errores).length) {
      return errores
    }

    await agregarCliente(datos)

    return redirect('/')
}

function NuevoCliente() {

  const errores = useActionData()
  const navigate = useNavigate()
  

  return (
    <>
      <h1 className="font-black text-4xl text-rose-800">Nuevo Cliente</h1>
      <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

      <div className="flex justify-end">
        <button className="bg-rose-500 text-white px-3 py-1 font-bold uppercase rounded-xl" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl md:w-3/4 mx-auto px-5 py-10 mt-10">
        
        {errores?.length && errores.map( (error, i ) => <Error key={i}>{error}</Error> )}

        <Form 
          method="post"
          noValidate
        >
        <Formulario/>

        <input type="submit" className="mt-5 w-full bg-rose-600 uppercase font-bold text-white text-lg rounded-md cursor-pointer hover:bg-rose-800" value="Ingresar Cliente" />
        </Form>
      
      </div>
    </>
  )
}

export default NuevoCliente