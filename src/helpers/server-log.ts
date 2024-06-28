export const serverLog = (message: any) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(message)
    }
}