import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from '../../../src/components/overlay/Drawer';
import { Button } from '../../../src/components/primitives/buttons/Button';
import { ThemeText } from '../../../src/core';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Overlay/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
  },
  render: (args) => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button title="Open Drawer" onPress={() => setVisible(true)} />
        <Drawer {...args} visible={visible} onClose={() => setVisible(false)}>
          <Drawer.Header title="Filters" />
          <Drawer.Content>
            <ThemeText color="text-secondary">Drawer body content goes here.</ThemeText>
          </Drawer.Content>
          <Drawer.Footer>
            <Button title="Close" variant="soft" onPress={() => setVisible(false)} />
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
  args: {
    direction: 'bottom',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Bottom: Story = {};

export const Right: Story = {
  args: {
    direction: 'right',
  },
};
