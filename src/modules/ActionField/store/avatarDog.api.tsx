import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AvatarDogResponse } from '../utils/models'

export const avatarDogApi = createApi({
	reducerPath: 'avatarDog/api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://random.dog/woof.json',
	}),
	// refetchOnFocus: true,
	endpoints: (builder) => ({
		getAvatarDog: builder.query<AvatarDogResponse, string>({
			query: () => ({
				url: '',
			}),
			transformResponse: (response: AvatarDogResponse) => response,
		}),
	}),
})

export const { useGetAvatarDogQuery } = avatarDogApi
