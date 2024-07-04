import { isAxiosError } from "axios"
import { toast } from "sonner"

export const toastError = (error: any, message?: string) => {
    if (isAxiosError(error)) {
        if (error.response) {
            toast.error(error.response.data.message || error.message)
        } else {
            toast.error(error.message)
        }
    } else if (error instanceof Error) {
        toast.error(error.message)
    } else {
        toast.error(message || 'An error occurred. Please try again later.')
    }

    if (process.env.NODE_ENV === 'development') {
        console.error(error)
    }
}