import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from '@/validations/auth.schema'
import * as authService from '@/services/auth.service'
import { Button, Input } from '@/components/ui'
import type { z } from 'zod'

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const tokenParam = searchParams.get('token') || ''
  const navigate = useNavigate()

  const [apiError, setApiError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: tokenParam,
    },
  })

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setApiError(null)
    setSuccessMessage(null)
    setLoading(true)

    try {
      const res = await authService.resetPassword(data.token, data.password)
      setLoading(false)

      if (res.success) {
        setSuccessMessage('Password berhasil diperbarui. Mengalihkan ke login...')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setApiError(res.error || 'Gagal mereset password.')
      }
    } catch (err: any) {
      setLoading(false)
      setApiError(err.response?.data?.error || err.message || 'Gagal mereset password.')
    }
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-border">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
          <p className="text-sm text-gray-500 mt-1">Masukkan password baru untuk akun Anda</p>
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

        {/* Success Message Alert */}
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!tokenParam && (
            <Input
              label="Token Reset"
              placeholder="Masukkan token reset password"
              error={errors.token?.message}
              required
              {...register('token')}
            />
          )}

          <Input
            label="Password Baru"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            required
            {...register('password')}
          />

          <Input
            label="Konfirmasi Password Baru"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            required
            {...register('confirmPassword')}
          />

          <Button type="submit" variant="primary" loading={loading} className="w-full py-2.5">
            Reset Password
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600 border-t border-border pt-4">
          Kembali ke{' '}
          <Link to="/login" className="text-lepkom-green font-semibold hover:underline">
            Halaman Masuk
          </Link>
        </div>
      </div>
    </div>
  )
}
