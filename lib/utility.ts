export async function ezPromise<DataType = any, ErrorType = any>(promise: Promise<any>): Promise<{
    data: any,
    error: any
}>  {

    const [result] = await Promise.allSettled([promise])

    if(result.status == 'fulfilled') {
        return {
            data: result.value,
            error: undefined
        }
    }
    else {
        return {
            data: undefined,
            error: result.reason
        }
    }
}
