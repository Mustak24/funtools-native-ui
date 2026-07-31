import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from '../../../src/components/form/Select';

const OPTIONS = [
  { value: 'Apple' },
  { value: 'Banana' },
  { value: 'Cherry' },
  { value: 'Dragon Fruit' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Form/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    onChangeValue: { control: false },
    data: { control: false },
    renderItem: { control: false },
    value: { control: false },
  },
  render: (args) => {
    const [value, setValue] = useState('Apple');
    return (
      <Select
        {...args}
        label="Fruit"
        value={value}
        onChangeValue={setValue}
        data={OPTIONS}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
