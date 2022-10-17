import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import { obtenerCliente, actualizarCliente } from "../Data/Clientes"
import Formulario from "../Components/Formulario"
import Error from "../Components/Error"


export async function loader({params}) {
  const cliente = await obtenerCliente(params.clienteId)
  if (Object.values(cliente).length === 0) {
    throw new Response('', {
        status: 404,
        statusText:'No hay resultado'
    })
  }
  return cliente
}

export async function action({request,params}){
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

    await actualizarCliente(params.clienteId,datos)

    return redirect('/')
}


const EditarCliente = () => {
  
    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

    return (
    <>
      <h1 className="font-black text-4xl text-rose-800">Editar Cliente</h1>
      <p className="mt-3">Modifica los datos de tu cliente</p>

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
        <Formulario
          cliente={cliente}  

        />

        <input type="submit" className="mt-5 w-full bg-rose-600 uppercase font-bold text-white text-lg rounded-md cursor-pointer hover:bg-rose-800" value="Guardar Cliente" />
        </Form>
      
      </div>
    </>
  )
}

export default EditarCliente