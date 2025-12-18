/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div style={{ width: '80vw', height: '80vh' }}>
        <Story />
      </div>
    ),
  ],
}

export default preview
