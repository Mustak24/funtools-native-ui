import type { Meta, StoryObj } from '@storybook/react';
import { MonthSwitcher } from '../../../src/core/Calendar'
import { useState } from 'react';

const meta: Meta<typeof MonthSwitcher> = {
  title: 'Core/Calender/MonthSwitcher',
  component: MonthSwitcher,
  tags: ['autodocs'],
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
  render: (args) => {
    const [val, setVal] = useState(0);
    return <MonthSwitcher value={val} onChangeValue={setVal} />
  }
};