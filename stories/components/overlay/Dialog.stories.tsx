import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog } from '../../../src/components/overlay/Dialog';
import { Button } from '../../../src/components/primitives/buttons/Button';
import { ThemeText } from '../../../src/core';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Overlay/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
  },
  render: (args) => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button title="Open Dialog" onPress={() => setVisible(true)} />
        <Dialog {...args} visible={visible} onClose={() => setVisible(false)}>
          <Dialog.Header title="Confirm Action" />
          <Dialog.Content>
            <ThemeText color="text-secondary">Do you want to continue with this operation?</ThemeText>
          </Dialog.Content>
          <Dialog.Footer>
            <Button title="Cancel" variant="text" color="text" onPress={() => setVisible(false)} />
            <Button title="Confirm" onPress={() => setVisible(false)} />
          </Dialog.Footer>
        </Dialog>
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
