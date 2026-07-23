import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema } from '@/validations/auth.schema'
import * as authService from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth.store'
import { getRoleDashboard } from '@/hooks/useAuth'
import { Button, Input } from '@/components/ui'
import type { z } from 'zod'

type ForceChangePasswordValues = z.infer<typeof changePasswordSchema>

export default function ForceChangePassword() {
  const navigate = useNavigate()
  const { user, setAuth, token } = useAuthStore()
  const [apiError, setApiError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForceChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmit = async (data: ForceChangePasswordValues) => {
    setApiError(null)
    setLoading(true)

    try {
      const res = await authService.changePassword(data.oldPassword, data.newPassword)
      setLoading(false)

      if (res.success) {
        if (user && token) {
          setAuth(token, { ...user, wajibGantiPassword: false })
          navigate(getRoleDashboard(user.role))
        } else {
          navigate('/login')
        }
      } else {
        setApiError(res.error || 'Gagal mengganti password.')
      }
    } catch (err: any) {
      setLoading(false)
      setApiError(err.response?.data?.error || err.message || 'Gagal mengganti password.')
    }
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-border">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-600 mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Ganti Password Wajib</h2>
          <p className="text-sm text-gray-500 mt-1">
            Anda harus mengganti password pertama kali sebelum dapat mengakses dashboard.
          </p>
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
            label="Password Lama"
            type="password"
            placeholder="••••••••"
            error={errors.oldPassword?.message}
            required
            {...register('oldPassword')}
          />

          <Input
            label="Password Baru"
            type="password"
            placeholder="••••••••"
            error={errors.newPassword?.message}
            required
            {...register('newPassword')}
          />

          <Input
            label="Konfirmasi Password Baru"
            type="password"
            placeholder="••••••••"
            error={errors.confirmNewPassword?.message}
            required
            {...register('confirmNewPassword')}
          />

          <Button type="submit" variant="primary" loading={loading} className="w-full py-2.5">
            Ganti & Masuk
          </Button>
        </form>
      </div>
    </div>
  )
}
