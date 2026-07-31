import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TelInput } from '../../../src/components/form/TelInput';

const meta: Meta<typeof TelInput> = {
  title: 'Components/Form/TelInput',
  component: TelInput,
  tags: ['autodocs'],
  argTypes: {
    onChangeValue: { control: false },
    value: { control: false },
  },
  render: (args) => {
    const [value, setValue] = useState({ code: '+1', number: '' });
    return <TelInput {...args} value={value} onChangeValue={setValue} />;
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
