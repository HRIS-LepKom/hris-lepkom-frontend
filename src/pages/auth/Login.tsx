import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/validations/auth.schema'
import { useAuth } from '@/hooks/useAuth'
import { Button, Input } from '@/components/ui'
import type { z } from 'zod'

type LoginFormValues = z.infer<typeof loginSchema>

export default function Login() {
  const { login } = useAuth()
  const [apiError, setApiError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    setApiError(null)
    setLoading(true)
    const result = await login(data.email, data.password)
    setLoading(false)

    if (!result.success && result.error) {
      setApiError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-border">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-lepkom-green/10 text-lepkom-green mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457-.312-2.841-.873-4.084"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-lepkom-green">HRIS LepKOM</h2>
          <p className="text-sm text-gray-500 mt-1">Sistem Rekrutmen Asisten LEPKOM</p>
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
            label="Email"
            type="email"
            placeholder="nama@domain.com"
            error={errors.email?.message}
            required
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            required
            {...register('password')}
          />

          <div className="flex items-center justify-end text-sm">
            <Link to="/forgot-password" className="text-lepkom-green hover:underline font-medium">
              Lupa password?
            </Link>
          </div>

          <Button type="submit" variant="primary" loading={loading} className="w-full py-2.5">
            Masuk
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600 border-t border-border pt-4">
          Belum punya akun?{' '}
          <Link to="/register" className="text-lepkom-green font-semibold hover:underline">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  )
}