import type { Meta, StoryObj } from '@storybook/react';
import { SnapView } from '../../../src/components/container/SnapView';
import { ThemeText, ThemeView } from '../../../src/core';

const ITEMS = ['Slide One', 'Slide Two', 'Slide Three'];

const meta: Meta<typeof SnapView> = {
  title: 'Components/Container/SnapView',
  component: SnapView,
  tags: ['autodocs'],
  argTypes: {
    renderItem: { control: false },
    data: { control: false },
  },
  args: {
    width: 280,
    height: 120,
    data: ITEMS,
    showDots: true,
    autoScroll: true,
    interval: 2000,
    renderItem: ({ item }: { item: string; index: number }) => (
      <ThemeView color="bg-secondary" style={{ flex: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
        <ThemeText>{item}</ThemeText>
      </ThemeView>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    showDots: false,
    autoScroll: false,
    height: 80,
  },
};
