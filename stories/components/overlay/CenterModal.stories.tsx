import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CenterModal } from '../../../src/components/overlay/CenterModal';
import { Button } from '../../../src/components/primitives/buttons/Button';
import { ThemeText, ThemeView } from '../../../src/core';

const meta: Meta<typeof CenterModal> = {
  title: 'Components/Overlay/CenterModal',
  component: CenterModal,
  tags: ['autodocs'],
  argTypes: {
    setVisible: { control: false },
    children: { control: false },
  },
  render: (args) => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button title="Open Modal" onPress={() => setVisible(true)} />
        <CenterModal {...args} visible={visible} setVisible={setVisible}>
          <ThemeView style={{ padding: 16, gap: 8 }}>
            <ThemeText style={{ fontWeight: 'bold', fontSize: 18 }}>Center Modal</ThemeText>
            <ThemeText color="text-secondary">A centered modal content area.</ThemeText>
            <Button title="Close" variant="soft" onPress={() => setVisible(false)} />
          </ThemeView>
        </CenterModal>
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
