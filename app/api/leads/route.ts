import { createLead } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, vehicleInterest, message } = body

    if (!name || !phone) {
      return Response.json(
        { error: 'Nombre y teléfono son requeridos' },
        { status: 400 }
      )
    }

    const lead = await createLead({
      name,
      phone,
      email,
      vehicle_interest: vehicleInterest,
      message,
    })

    if (!lead) {
      return Response.json(
        { error: 'Error al guardar' },
        { status: 500 }
      )
    }

    return Response.json(
      { success: true, message: '¡Lead guardado correctamente!', id: lead.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return Response.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
