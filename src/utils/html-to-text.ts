export const htmlToText = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const result = tempDiv.textContent || tempDiv.innerText || '';

    return result.trim()
}