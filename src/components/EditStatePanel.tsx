import { For } from "solid-js";

export type InputState = "editable" | "readonly" | "disabled";

interface EditStatePanelProps {
  controlType: string;
  editStates: readonly InputState[];
  currentState: InputState;
  onEditStateChanged: (state: InputState) => void;
}

export const EditStatePanel = ({
  controlType,
  currentState,
  editStates,
  onEditStateChanged,
}: EditStatePanelProps) => {
  return (
    <fieldset class="flex gap-2 flex-wrap border-2 rounded-md p-4 border-purple-800 w-fit">
      <legend class="px-1.5">Input State</legend>
      <For each={editStates}>
        {(state) => (
          <label class="inline-flex items-center justify-center mr-4 gap-2">
            <input
              type="radio"
              name={`inputState-${controlType}`}
              value={state}
              checked={currentState === state}
              onChange={() => {
                onEditStateChanged(state);
              }}
              class="appearance-none w-4 h-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-700 checked:bg-white checked:border-purple-700 checked:before:content-[''] checked:before:block checked:before:w-2.5 checked:before:h-2.5 checked:before:rounded-full checked:before:bg-purple-700 checked:before:mt-0.5 checked:before:ml-0.5"
            />
            <span class="capitalize">{state}</span>
          </label>
        )}
      </For>
    </fieldset>
  );
};
