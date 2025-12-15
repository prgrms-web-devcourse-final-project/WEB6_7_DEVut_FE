export const isValidEmail = (email: string) => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(email);
};

export const isValidPassword = (password: string) => {
  return password.length >= 8;
};

export const isSamePassword = (pw: string, confirm: string) => {
  return pw === confirm;
};

export const isValidPhoneNumber = (phone: string) => {
  const onlyNumber = phone.replace(/\D/g, "");
  return /^01[0-9]{8,9}$/.test(onlyNumber);
};
