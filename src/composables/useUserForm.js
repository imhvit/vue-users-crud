import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { userSchema } from '@/schemas/user.schema'

export function useUserForm() {
  const { handleSubmit, errors, defineField, resetForm } = useForm({
    validationSchema: toTypedSchema(userSchema),
  })

  const [name] = defineField('name')
  const [username] = defineField('username')
  const [email] = defineField('email')
  const [phone] = defineField('phone')

  return {
    name,
    username,
    email,
    phone,
    errors,
    resetForm,
    handleSubmit,
  }
}
