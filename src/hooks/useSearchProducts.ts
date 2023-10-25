import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import omit from 'lodash/omit'

import { SearchSchema, searchSchema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'

type FormData = SearchSchema
export function useSearchProducts() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const searchInputName = searchParams.get('name') || ''

  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(searchSchema),
    values: { search: searchInputName }
  })

  const onSearchSubmit = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.search
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.search
        }

    navigate({
      pathname: '/',
      search: createSearchParams(config).toString()
    })
  })
  return { register, onSearchSubmit }
}
