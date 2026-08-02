import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CalendarDialog } from '../../../src/components';
import { Button } from '../../../src/components/primitives/buttons/Button';
import { ThemeText, ThemeView } from '../../../src/core';

const meta: Meta<typeof CalendarDialog> = {
  title: 'Components/Overlay/CalendarDialog',
  component: CalendarDialog,
  tags: ['autodocs'],
  argTypes: {
    onClose: { control: false },
    children: { control: false },
  },
  render: (args) => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button title="Open Modal" onPress={() => setVisible(true)} />
        <CalendarDialog 
            {...args} 
            visible={visible} 
            onClose={() => setVisible(false)}
            onSelect={(date) => alert(`selected date ${date.toISOString()}`)}
        />
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
