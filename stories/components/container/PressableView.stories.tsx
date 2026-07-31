import type { Meta, StoryObj } from '@storybook/react';
import { PressableView } from '../../../src/components/container/PressableView';
import { ThemeText } from '../../../src/core';

const meta: Meta<typeof PressableView> = {
  title: 'Components/Container/PressableView',
  component: PressableView,
  tags: ['autodocs'],
  args: {
    color: 'primary',
    alpha: 20,
    style: { padding: 12, borderRadius: 8 },
  },
  render: (args) => (
    <PressableView {...args}>
      <ThemeText>Tap Area</ThemeText>
    </PressableView>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColor: Story = {
  args: {
    customColor: '#1f2937',
    alpha: 30,
  },
};
