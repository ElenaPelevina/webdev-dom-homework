export const replaceQuote = (str) => {
    return str
        .replaceAll('quote', '<i class = "quote">')
        .replaceAll('unqoute', '</i>')
}

export const replaceTag = (str) => {
    return str.replaceAll('<', '&lt').replaceAll('>', '&gt;')
}
