import React from 'react'

interface ID{
    params: {
        id: string
    }
}
const Meeting = ({params}: ID) => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className=' text-3xl font-bold  '>
        Meeting {params.id}
      </h1>
    </section>
  )
}

export default Meeting