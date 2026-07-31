import type { Meta, StoryObj } from '@storybook/react';
import { PanelSwitcher } from '../../../src/components/logic/PanelSwitcher';
import { ThemeText, ThemeView } from '../../../src/core';

const PANELS = [
  {
    value: 'one',
    content: (
      <ThemeView color="bg-secondary" style={{ padding: 10, borderRadius: 8 }}>
        <ThemeText>Panel One</ThemeText>
      </ThemeView>
    ),
  },
  {
    value: 'two',
    content: (
      <ThemeView color="bg-secondary" style={{ padding: 10, borderRadius: 8 }}>
        <ThemeText>Panel Two</ThemeText>
      </ThemeView>
    ),
  },
];

const meta: Meta<typeof PanelSwitcher> = {
  title: 'Components/Logic/PanelSwitcher',
  component: PanelSwitcher,
  tags: ['autodocs'],
  argTypes: {
    panels: { control: false },
  },
  args: {
    activePanelValue: 'one',
    panels: PANELS,
    style: { width: 220 },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPanel: Story = {};

export const SecondPanel: Story = {
  args: {
    activePanelValue: 'two',
  },
};
