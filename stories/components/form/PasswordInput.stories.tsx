import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from '../../../src/components/form/PasswordInput';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/Form/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    variant: 'outside-label',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
