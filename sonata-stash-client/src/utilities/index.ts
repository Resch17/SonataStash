export const trimmedOrNull = (
  input: string | null | undefined
): string | null => {
  if (!input) return null;
  const trimmed = input.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const positiveOrNull = (
  input: number | null | undefined
): number | null => {
  if (!input) return null;
  if (input > 0) return input;
  return null;
};
