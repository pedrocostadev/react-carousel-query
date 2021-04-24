
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered',
}

export const decorators = [
  (Story) => (
    <div style={{ width: '80vw', height: '80vh' }}>
      <Story />
    </div>
  ),
];