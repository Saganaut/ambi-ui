/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { RadioGroup } from "./RadioGroup";
import { difficultyOptions, visibilityOptions } from "./RadioGroup.mocks";

const meta = {
  title: "Common/Input/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  args: {
    name: "difficulty",
    legend: "Difficulty",
    options: difficultyOptions,
    value: "medium",
    onChange: fn(),
  },
  argTypes: {
    options: { control: false },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All radio-group variants and states on a single canvas. */
export const Overview: Story = {
  render: (args) => {
    const [difficulty, setDifficulty] = useState(args.value);
    const [visibility, setVisibility] = useState("private");

    return (
      <div style={{ display: "grid", gap: "2rem", width: "min(32rem, 85vw)" }}>
        <section style={{ display: "grid", gap: "0.75rem" }}>
          <h3 style={{ margin: 0 }}>Default</h3>
          <RadioGroup
            {...args}
            name={`${args.name}-default`}
            value={difficulty}
            onChange={setDifficulty}
          />
        </section>

        <section style={{ display: "grid", gap: "0.75rem" }}>
          <h3 style={{ margin: 0 }}>With info message</h3>
          <RadioGroup
            {...args}
            name={`${args.name}-info`}
            infoMessage="Affects scoring multipliers."
          />
        </section>

        <section style={{ display: "grid", gap: "0.75rem" }}>
          <h3 style={{ margin: 0 }}>With error</h3>
          <RadioGroup
            {...args}
            name={`${args.name}-error`}
            errorMessage="Pick a difficulty to continue."
          />
        </section>

        <section style={{ display: "grid", gap: "0.75rem" }}>
          <h3 style={{ margin: 0 }}>Disabled</h3>
          <RadioGroup {...args} name={`${args.name}-disabled`} disabled />
        </section>

        <section style={{ display: "grid", gap: "0.75rem" }}>
          <h3 style={{ margin: 0 }}>Alternative option layout</h3>
          <RadioGroup
            {...args}
            name="visibility"
            legend="Who can see this deck?"
            options={visibilityOptions}
            value={visibility}
            onChange={setVisibility}
          />
        </section>
      </div>
    );
  },
};
