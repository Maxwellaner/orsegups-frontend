export const normalizePhoneData = (phone: string): string => {
  return phone
    .replace(/\s+/g, "")
    .replace(/[^0-9]/g, "");
}