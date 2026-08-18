/* oxlint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Checkbox } from "./Checkbox/Checkbox";
import { Dropdown } from "./Dropdown/Dropdown";
import { REGION_OPTIONS } from "./Dropdown/Dropdown.mocks";
import { FieldGroup } from "./FieldGroup/FieldGroup";
import { FileUpload } from "./FileUpload/FileUpload";
import { Input } from "./Input/Input";
import { InputWithButton } from "./InputWithButton/InputWithButton";
import { NumberInput } from "./NumberInput/NumberInput";
import { RadioGroup } from "./RadioGroup/RadioGroup";
import { difficultyOptions } from "./RadioGroup/RadioGroup.mocks";
import { TextArea } from "./TextArea/TextArea";
import { Toggle } from "./Toggle/Toggle";

const meta = {
  title: "Common/Input/Form showcase",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Complete form and validation states on a single canvas. */
export const Overview: Story = {
  render: () => {
    const [region, setRegion] = useState<string[]>(["gondor"]);
    const [duration, setDuration] = useState(30);
    const [difficulty, setDifficulty] = useState("medium");
    const [guests, setGuests] = useState(true);
    const [lateJoins, setLateJoins] = useState(false);

    return (
      <div style={{ display: "grid", gap: "3rem" }}>
        <section style={{ display: "grid", gap: "1rem" }}>
          <h2 style={{ margin: 0 }}>Complete form</h2>
          <form
            style={{
              display: "grid",
              gap: "var(--space-6)",
              width: "min(42rem, 85vw)",
              padding: "var(--space-8)",
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-surface)",
            }}
          >
            <Input
              label="Deck name"
              placeholder="Friday night trivia"
              fullWidth
            />
            <TextArea
              label="Description"
              placeholder="What should players expect?"
              fullWidth
            />
            <Dropdown
              label="Region"
              options={REGION_OPTIONS}
              value={region}
              onChange={setRegion}
              fullWidth
              multiple={false}
            />
            <NumberInput
              label="Round timer (seconds)"
              value={duration}
              min={5}
              max={120}
              step={5}
              onChange={setDuration}
              fullWidth
            />
            <RadioGroup
              name="showcase-difficulty"
              legend="Difficulty"
              options={difficultyOptions}
              value={difficulty}
              onChange={setDifficulty}
            />
            <Checkbox
              label="Allow guests to join"
              checked={guests}
              onChange={(event) => setGuests(event.target.checked)}
            />
            <Toggle
              label="Allow late joins"
              checked={lateJoins}
              onChange={(event) => setLateJoins(event.target.checked)}
            />
            <FileUpload
              label="Cover image"
              accept="image/*"
              multiple={false}
              infoMessage="PNG or JPEG, up to 5 MB."
              maxBytes={5_000_000}
            />
            <InputWithButton
              label="Invite code"
              placeholder="Enter a code"
              buttonLabel="Apply"
            />

            <FieldGroup labelWidth="clamp(8rem, 30%, 14rem)">
              <Input
                label="Short label"
                labelPosition="start"
                placeholder="Shared label column"
                fullWidth
              />
              <Input
                label="A longer aligned label"
                labelPosition="start"
                extraLabelInfo="Optional OptionalOptionalOptional OptionalOptional OptionalOptional"
                placeholder="Long label info wraps"
                fullWidth
              />
            </FieldGroup>
          </form>
        </section>

        <section style={{ display: "grid", gap: "1rem" }}>
          <h2 style={{ margin: 0 }}>Validation states</h2>
          <div
            style={{ display: "grid", gap: "var(--space-6)", width: "30rem" }}
          >
            <Input label="Default" placeholder="Type something…" fullWidth />
            <Input
              label="With guidance"
              infoMessage="Helpful supporting copy."
              fullWidth
            />
            <Input
              label="Invalid"
              value="Bad value"
              errorMessage="Please try again."
              fullWidth
            />
            <Input label="Disabled" value="Unavailable" disabled fullWidth />
          </div>
        </section>
      </div>
    );
  },
};
