export const processTextToken = (
  token: string,
  type: 'key' | 'value' | 'operator'
): string => {
  return `<span class="${type}">${token}</span>`;
};
