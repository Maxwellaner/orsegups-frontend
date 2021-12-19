import { maskPhone } from '../../src/utils/masks';
import { normalizePhoneData } from '../../src/utils/normalizePhoneData';

describe("Unit - utils functions", () => {
  it("should return masked phone", () => {
    const phone = '48991039390';
    const maskedPhone = maskPhone(phone);
    expect(maskedPhone).toEqual('(48) 99103-9390');
  });

  it("should return normalized phone number", () => {
    const maskedPhone = '(48) 99103-9390';
    const phone = normalizePhoneData(maskedPhone);
    expect(phone).toEqual('48991039390');
  });
});