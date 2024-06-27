import { OAuthProviderType } from "next-auth/providers"

const settings: AppSettings = {
    auth_providers: ['github'],
}

export default settings

type AppSettings = {
    auth_providers: OAuthProviderType[]
}