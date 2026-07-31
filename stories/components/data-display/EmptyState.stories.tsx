import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '../../../src/components/data-display/EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/Data Display/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: {
    title: 'No Results Found',
    description: 'Try changing your filters or search query.',
    iconName: 'Inbox',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tasks: Story = {
  args: {
    title: 'No Tasks Yet',
    description: 'Create your first task to get started.',
    iconName: 'ListTodo',
  },
};
