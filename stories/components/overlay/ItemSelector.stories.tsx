import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ItemSelector } from '../../../src/components/overlay/ItemSelector';
import { Button } from '../../../src/components/primitives/buttons/Button';
import { ThemeText } from '../../../src/core';

type Item = { value: string; label: string };

const ITEMS: Item[] = [
  { value: 'inbox', label: 'Inbox' },
  { value: 'draft', label: 'Drafts' },
  { value: 'archive', label: 'Archive' },
  { value: 'trash', label: 'Trash' },
];

const meta: Meta<typeof ItemSelector<Item>> = {
  title: 'Components/Overlay/ItemSelector',
  component: ItemSelector,
  tags: ['autodocs'],
  argTypes: {
    data: { control: false },
    renderItem: { control: false },
    keyExtractor: { control: false },
    visible: { control: false },
    onClose: { control: false },
    onSelectItem: { control: false },
  },
  render: (args) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<Item | undefined>(ITEMS[0]);

    return (
      <>
        <Button title="Open Item Selector" onPress={() => setVisible(true)} />
        <ItemSelector<Item>
          {...args}
          visible={visible}
          selectedItem={selected}
          onClose={() => setVisible(false)}
          onSelectItem={(item) => {
            setSelected(item);
            setVisible(false);
          }}
        />
      </>
    );
  },
  args: {
    title: 'Choose Folder',
    description: 'Select where the item should be stored.',
    data: ITEMS,
    keyExtractor: (item: Item) => item.value,
    renderItem: ({ item }: { item: Item; index: number }) => <ThemeText>{item.label}</ThemeText>,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
