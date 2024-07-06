import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './Button.vue';

const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['primary', 'info'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    color: { control: 'color' }
  },
  args: {     
    onClick: ()=>(alert("hello"))
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    text: 'Button'
  }
};

export const Info: Story = {
  args: {
    type: 'info',
    text: 'Button'
  }
};
