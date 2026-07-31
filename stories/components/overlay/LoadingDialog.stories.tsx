import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LoadingDialog } from '../../../src/components/overlay/LoadingDialog';
import { Button } from '../../../src/components/primitives/buttons/Button';

const meta: Meta<typeof LoadingDialog> = {
  title: 'Components/Overlay/LoadingDialog',
  component: LoadingDialog,
  tags: ['autodocs'],
  argTypes: {
    visible: { control: false },
  },
  render: (args) => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button title="Show Loading" onPress={() => setVisible(true)} />
        <LoadingDialog {...args} visible={visible} />
        {visible ? <Button title="Hide" variant="text" color="text" onPress={() => setVisible(false)} /> : null}
      </>
    );
  },
  args: {
    title: 'Syncing Data',
    subtitles: ['Preparing request...', 'Uploading...', 'Finalizing...'],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
