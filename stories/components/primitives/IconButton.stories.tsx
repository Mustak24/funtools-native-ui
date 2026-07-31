import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../../../src/components/primitives/buttons/IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/Primitives/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outlined', 'soft', 'soft-outlined', 'text'],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'text',
        'text-secondary',
        'bg',
        'bg-secondary',
        'border',
        'error',
        'info',
        'warning',
        'success',
      ],
    },
  },
  args: {
    icon: 'Plus',
    variant: 'soft',
    color: 'primary',
    size: 40,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
