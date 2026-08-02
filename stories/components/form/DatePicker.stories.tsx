import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from '../../../src/components';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Form/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    onChangeValue: { control: false },
    value: { control: false },
  },
  render: (args) => {
    const [value, setValue] = useState(new Date());
    return <DatePicker {...args} value={value} onChangeValue={setValue} />;
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
