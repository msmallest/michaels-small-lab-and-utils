export function mergeOptions<TOptions extends object>(defaultOptions: TOptions) {
  return (value: Partial<TOptions>) => ({ ...defaultOptions, ...value });
}
