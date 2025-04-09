export const phoneValidator = (phone: string): boolean => {
    return /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}$/.test(phone);
}