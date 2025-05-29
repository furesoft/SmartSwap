const WORLD_CHAT_APP_ID = 'app_e293fcd0565f45ca296aa317212d8741'

export default function getWorldChatDeeplinkUrl({
                                     username,
                                     message,
                                     pay,
                                     request,
                                 }: {
    username: string
    message?: string
    pay?: string | number | boolean
    request?: string | number | boolean
}) {
    let path = `/${username}/draft`

    if (message) {
        path += `?message=${message}`
    } else if (pay !== undefined) {
        if (pay === 'true' || pay === true) {
            path += `?pay`
        } else {
            path += `?pay=${pay}` // Pay with amount
        }
    } else if (request !== undefined) {
        if (request === 'true' || request === true) {
            path += `?request`
        } else {
            path += `?request=${request}` // Request with amount
        }
    }

    const encodedPath = encodeURIComponent(path)
    return `https://worldcoin.org/mini-app?app_id=${WORLD_CHAT_APP_ID}&path=${encodedPath}`
}