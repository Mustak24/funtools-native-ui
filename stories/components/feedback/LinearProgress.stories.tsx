import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../../../src/components/feedback/Progress/LinearProgress';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/Feedback/LinearProgress',
  component: ProgressBar,
  tags: ['autodocs'],
  args: {
    progress: 45,
    min: 0,
    max: 100,
    height: 8,
    progressColor: 'primary',
    backgroundColor: 'bg-secondary',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Complete: Story = {
  args: {
    progress: 100,
  },
};
