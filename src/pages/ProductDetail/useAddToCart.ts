import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { addToCart } from 'src/apis/purchase.api'

export function useAddToCart() {
  const queryClient = useQueryClient()

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
      toast.success(data.data.message)
    }
  })
  return addToCartMutation
}
