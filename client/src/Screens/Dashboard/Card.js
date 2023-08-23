import React from 'react'

function Card({assignedtask}) {
  return (

    <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Tâches restantes</h5>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{assignedtask}</h5>
    </div>

  )
}

export default Card
