import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../../../src/components/container/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Container/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    color: 'bg-secondary',
    style: { width: 220, height: 20, borderRadius: 8 },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {};

export const Card: Story = {
  args: {
    style: { width: 280, height: 120, borderRadius: 12 },
  },
};
