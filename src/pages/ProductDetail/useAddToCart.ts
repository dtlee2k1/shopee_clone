import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addToCart } from 'src/apis/purchase.api'

export function useAddToCart() {
  const queryClient = useQueryClient()

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
    }
  })
  return addToCartMutation
}
