import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/validations/auth.schema'
import { useAuth } from '@/hooks/useAuth'
import { Button, Input } from '@/components/ui'
import type { z } from 'zod'

type RegisterFormValues = z.infer<typeof registerSchema>

export default function Register() {
  const { register: registerAuth } = useAuth()
  const [apiError, setApiError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setApiError(null)
    setLoading(true)
    const result = await registerAuth({
      nama: data.namaCalas,
      npm: data.npm,
      email: data.email,
      password: data.password,
      kelas: data.kelas,
    })
    setLoading(false)

    if (!result.success && result.error) {
      setApiError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg border border-border">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-lepkom-green">Daftar Calon Asisten</h2>
          <p className="text-sm text-gray-500 mt-1">Buat akun untuk memulai proses pendaftaran</p>
        </div>

        {/* API Error Alert */}
        {apiError && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{apiError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            error={errors.namaCalas?.message}
            required
            {...register('namaCalas')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="NPM"
              placeholder="Contoh: 10121001"
              error={errors.npm?.message}
              required
              {...register('npm')}
            />

            <Input
              label="Kelas"
              placeholder="Contoh: 3KA01"
              error={errors.kelas?.message}
              required
              {...register('kelas')}
            />
          </div>

          <Input
            label="Email"
            type="email"
            placeholder="nama@domain.com"
            error={errors.email?.message}
            required
            {...register('email')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              required
              {...register('password')}
            />

            <Input
              label="Konfirmasi Password"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              required
              {...register('confirmPassword')}
            />
          </div>

          <Button type="submit" variant="primary" loading={loading} className="w-full py-2.5 mt-2">
            Daftar
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600 border-t border-border pt-4">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-lepkom-green font-semibold hover:underline">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  )
}