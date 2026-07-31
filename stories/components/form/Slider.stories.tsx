import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from '../../../src/components/form/Slider';
import { ThemeText, ThemeView } from '../../../src/core';

const meta: Meta<typeof Slider> = {
  title: 'Components/Form/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    onChangeValue: { control: false },
    renderLabel: { control: false },
    onSelectValue: { control: false },
  },
  args: {
    minmax: [0, 100],
    step: 5,
    height: 10,
    color: 'primary',
  },
  render: (args) => {
    const [value, setValue] = useState(35);
    return (
      <ThemeView style={{ width: 320, gap: 12 }}>
        <Slider
          {...args}
          value={value}
          onChangeValue={setValue}
          renderLabel={(val) => (
            <ThemeView color="bg-secondary" style={{ paddingVertical: 2, paddingHorizontal: 8, borderRadius: 8 }}>
              <ThemeText>{Math.round(val)}</ThemeText>
            </ThemeView>
          )}
        />
        <ThemeText>Value: {Math.round(value)}</ThemeText>
      </ThemeView>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
