import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../src/components/primitives/buttons/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['soft', 'filled', 'outlined', 'ghost'],
      description: 'Visual variant of the button',
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
      description: 'Color theme of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner state',
    },
    height: {
      control: 'number',
      description: 'Height of the button in pixels',
    },
    rounded: {
      control: 'number',
      description: 'Border radius of the button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Click Me',
    variant: 'soft',
    color: 'primary',
  },
};

export const Filled: Story = {
  args: {
    title: 'Filled Button',
    variant: 'filled',
    color: 'primary',
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Button',
    variant: 'outlined',
    color: 'primary',
  },
};

export const Ghost: Story = {
  args: {
    title: 'Ghost Button',
    variant: 'ghost',
    color: 'primary',
  },
};

export const WithStartIcon: Story = {
  args: {
    title: 'Check In',
    startIcon: 'Check',
    variant: 'filled',
    color: 'success',
  },
};

export const WithEndIcon: Story = {
  args: {
    title: 'Next Step',
    endIcon: 'ArrowRight',
    variant: 'filled',
    color: 'primary',
  },
};

export const Loading: Story = {
  args: {
    title: 'Submitting',
    loading: true,
    variant: 'soft',
    color: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Action',
    disabled: true,
    variant: 'soft',
    color: 'primary',
  },
};

export const ErrorVariant: Story = {
  args: {
    title: 'Delete Item',
    startIcon: 'Trash',
    variant: 'filled',
    color: 'error',
  },
};
