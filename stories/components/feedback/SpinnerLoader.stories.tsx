import type { Meta, StoryObj } from '@storybook/react';
import { SpinnerLoader } from '../../../src/components/feedback/loaders/SpinnerLoader';

const meta: Meta<typeof SpinnerLoader> = {
  title: 'Components/Feedback/SpinnerLoader',
  component: SpinnerLoader,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['LoaderPinwheel', 'LoaderCircle', 'Loader', 'LoaderRefresh'],
    },
  },
  args: {
    size: 32,
    color: 'primary',
    name: 'LoaderPinwheel',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Circle: Story = {
  args: {
    name: 'LoaderCircle',
  },
};
