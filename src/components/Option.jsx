import { TextField } from "@kobalte/core";
import { clsx } from "clsx";
import { createSignal } from "solid-js";

const cuotasDefault = ["1", "3", "6", "9", "12", "18", "24", "36"];
export const Option = (props) => {
  const [value, setValue] = createSignal("");
  const [cuota, setCuota] = createSignal("1");
  return (
    <section class="border-green-8 border-3 flex flex-col rounded-xl p-4">
      <h1 class="select-none">Opción {props.idx}</h1>

      <div class="flex flex-col">
        <TextField.Root
          value={value()}
          onChange={setValue}
          validationState={
            parseFloat(value()) > 0 || value() === "" ? "valid" : "invalid"
          }
        >
          <TextField.Label>Precio final:</TextField.Label>
          <TextField.Input
            min="0"
            class="bg-slate-8 block rounded-xl px-2 py-2"
          />
          <TextField.ErrorMessage>
            El precio tiene que ser un número mayor a $0
          </TextField.ErrorMessage>
        </TextField.Root>
      </div>
      <div class="flex flex-col gap-2">
        <TextField.Root
          value={cuota()}
          onChange={setCuota}
          validationState={parseFloat(cuota()) >= 1 ? "valid" : "invalid"}
        >
          <TextField.Label>Cuotas:</TextField.Label>
          <TextField.Input
            min="0"
            class="bg-slate-8 block w-[3rem] rounded-xl px-2 py-2"
          />
          <TextField.ErrorMessage>
            La cuota tiene que ser un número mayor a 1
          </TextField.ErrorMessage>
        </TextField.Root>
        <div class="border-green-9 inline-flex table max-w-fit border-collapse cursor-pointer select-none border-2">
          {cuotasDefault.map((cuotaDefault) => {
            return (
              <td
                class={clsx(
                  "border-green-8 w-[2rem] flex-1 border px-2 py-1 text-center",
                  cuotaDefault === cuota() && "bg-green-9"
                )}
                onclick={() => {
                  setCuota(cuotaDefault);
                }}
              >
                {cuotaDefault}
              </td>
            );
          })}
        </div>
      </div>
    </section>
  );
};
