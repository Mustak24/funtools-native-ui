import type { Meta, StoryObj } from "@storybook/react";
import { MonthCalendarView } from "../../../src/core/Calendar";
import { useState } from "react";

const meta: Meta<typeof MonthCalendarView> = {
    title: "Core/Calender/MonthCalenderView",
    component: MonthCalendarView,
    tags: ["autodocs"],
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    render: (args) => {
        const [val, setVal] = useState(new Date());
        return <MonthCalendarView value={val} onChangeValue={setVal} />;
    },
};
