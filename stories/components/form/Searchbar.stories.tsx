import type { Meta, StoryObj } from '@storybook/react';
import { Searchbar } from '../../../src/components/form/Searchbar';

const meta: Meta<typeof Searchbar> = {
  title: 'Components/Form/Searchbar',
  component: Searchbar,
  tags: ['autodocs'],
  args: {
    placeholder: 'Search items',
    debounceTime: 400,
    variant: 'outside-label',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
