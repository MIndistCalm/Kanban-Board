import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AvatarCatResponse } from '../utils/models'

export const avatarCatApi = createApi({
	reducerPath: 'avatarCat/api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://cataas.com/',
	}),
	// refetchOnFocus: true,
	endpoints: (builder) => ({
		getAvatarCatId: builder.query<AvatarCatResponse[], string>({
			query: () => ({
				url: 'api/cats',
				limit: 10,
			}),
			transformResponse: (response: AvatarCatResponse[]) => response,
		}),
		getAvatarCatById: builder.query<string, string>({
			query: (id: string) => ({
				url: `c/${id}`,
			}),
			transformResponse: (response: string) => response,
		}),
	}),
})

export const { useGetAvatarCatIdQuery, useLazyGetAvatarCatByIdQuery } = avatarCatApi
