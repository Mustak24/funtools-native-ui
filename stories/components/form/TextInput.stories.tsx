import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '../../../src/components/form/TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/Form/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    type: 'string',
    variant: 'outside-label',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Decimal: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    type: 'decimal-2',
  },
};
