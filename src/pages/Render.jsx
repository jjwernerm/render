import { useState } from 'react'; // Importar el hook useState desde React

const Render = () => {
  // Definir los estados locales
  const [name, setName] = useState('');
  const [nameList, setNameList] = useState([]); // Estado para la lista de nombres
  const [btnStatus, setBtnStatus] = useState(false); // Estado para el estado del botón (Agregar o Modificar)
  const [selectIndex, setSelectIndex] = useState(''); // Estado para el índice seleccionado en la lista

  // Manejar el evento de envío del formulario
  const handleSubmit = e => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario (recargar la página)

    if(btnStatus) { // Si el botón está en modo Modificar
      const updateNameList = [...nameList]; // Copiar la lista actual de nombres
      updateNameList[selectIndex] = name; // Actualizar el nombre en el índice seleccionado
      setNameList(updateNameList); // Actualizar la lista de nombres
      setBtnStatus(false); // Cambiar el estado del botón a Agregar
      setName(''); // Resetear el campo de nombre
    } else { // Si el botón está en modo Agregar
      setNameList([...nameList, name]); // Agregar el nuevo nombre a la lista de nombres
      setName(''); // Resetear el campo de nombre
    }
  };

  // Función para editar un nombre
  const editName = (element, i) => {
    setBtnStatus(true); // Cambiar el estado del botón a Modificar
    setName(element); // Establecer el campo de nombre con el nombre seleccionado
    setSelectIndex(i); // Establecer el índice seleccionado
  };

  // Función para eliminar un nombre
  const deleteName = index => {
    const updateNameList = nameList.filter((_, i) => i !== index); // Filtrar la lista de nombres para excluir el nombre en el índice seleccionado
    setNameList(updateNameList); // Actualizar la lista de nombres
  };

  return (
    <>
      <form
        className="p-3 mb-3"
        onSubmit={handleSubmit} // Asignar la función handleSubmit al evento onSubmit del formulario
      >
        <div className="mb-3 flex gap-2">
          <div>
            <input
              type="text"
              id='name'
              placeholder="Escriba el nombre"
              className="bg-gray-100 rounded-lg p-3 focus:outline-none focus:ring-1 focus:border-orange-400 focus:ring-orange-400"
              value={name} // Asignar el valor del input al estado name
              onChange={e => setName(e.target.value)} // Actualizar el estado name cuando el valor del input cambia
            />
          </div>
          <input
            type="submit"
            value={btnStatus ? 'Modificar' : 'Agregar'} // Cambiar el texto del botón según el estado btnStatus
            className="text-white uppercase font-bold p-2 rounded-lg cursor-pointer bg-gradient-to-r from-red-400 to-orange-600 hover:from-red-500 hover:to-orange-700"
          />
        </div>
      </form>

      <div>
        <p className="p-3 mb-3 text-sm md:text-base font-bold underline">LISTA DE NOMBRES {''}</p>
        <ul className="list-decimal m-2">
          {nameList.map((element, i) => ( // Mapear cada elemento de la lista de nombres
            <li key={i}>{element} {/* Mostrar el nombre */}
              <button 
                onClick={() => editName(element, i)} // Llamar a la función editName cuando se hace clic en el botón Editar
                className='text-white font-bold uppercase text-xs p-1 m-1 rounded-lg bg-green-600 hover:bg-green-700'              
              >Editar</button>
              <button 
                onClick={() => deleteName(i)} // Llamar a la función deleteName cuando se hace clic en el botón Eliminar
                className='text-white font-bold uppercase text-xs p-1 m-1 rounded-lg bg-red-600 hover:bg-red-700'
              >Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Render;