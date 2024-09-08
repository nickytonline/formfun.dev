import type { Accessor } from "solid-js";

interface CustomErrorPeops {
  message: Accessor<string>;
}

export const CustomError = ({ message }: CustomErrorPeops) => {
  return (
    <span class="text-2xl user-interact invisible">
      {message() ?? "&nbsp;"}
    </span>
  );
};
