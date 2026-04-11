import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  username: z.string().min(1, 'El usuario es obligatorio'),
  email: z.email('Correo inválido'),
  phone: z.string().regex(/^\d{9}$/, 'Debe tener 9 dígitos'),
})
