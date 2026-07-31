import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../../src/components/form/inputs.legacy/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Form/Input (Legacy)',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Type here...',
    defaultValue: '',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithColor: Story = {
  args: {
    color: '#1d4ed8',
    placeholder: 'Blue text input',
  },
};
