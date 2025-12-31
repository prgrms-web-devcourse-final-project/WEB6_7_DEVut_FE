export const maskNickname = (nickname: string) => {
  const length = nickname.length;
  if (length <= 1) return "*";
  if (length <= 3) {
    return nickname[0] + "*".repeat(length - 1);
  }

  return nickname.slice(0, 3) + "*".repeat(length - 3);
};
