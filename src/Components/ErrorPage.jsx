import { useRouteError } from "react-router-dom";

export default function ErrosPage() {
    const error = useRouteError()


    return (
        
        <div className="space-y-8">
            <h1 className="text-center text-6xl font-extrabold mt-20 text-red-700">CRM - Clientes</h1>
            <p className="text-center text-xl font-bold">Hubo un error</p>
            <p className="text-center text-xl font-bold">{error.statusText || error.message}</p>
        </div>
    )
}