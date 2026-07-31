import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '../../../src/components/form/Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Form/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: {
    isOn: true,
    color: 'primary',
    size: 22,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {};

export const Off: Story = {
  args: {
    isOn: false,
  },
};
