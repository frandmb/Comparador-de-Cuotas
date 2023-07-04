import { Button, TextField } from "@kobalte/core";
import { clsx } from "clsx";
import { createSignal } from "solid-js";

const standardInstallments = ["1", "3", "6", "9", "12", "18", "24", "36"];
export const Option = (props) => {
  const [installments, setInstallments] = props.optionData.installments;
  const [price, setPrice] = props.optionData.price;
  return (
    <section class="border-green-8 border-3 w-xs flex flex-col rounded-xl">
      <div class="flex justify-between px-2 pt-1">
        <h1 class="opacity-85 select-none text-xs">Opción {props.idx}</h1>
        {props.close && (
          <Button.Root
            class="opacity-85 text-6 bg-transparent"
            onclick={props.close}
          >
            <div i="gridicons-cross-circle"></div>
          </Button.Root>
        )}
      </div>
      <div class="flex flex-col gap-5 p-4 pb-5">
        <div class="flex flex-col">
          <TextField.Root
            price={price()}
            onChange={setPrice}
            validationState={
              parseFloat(price()) > 0 || price() === "" ? "valid" : "invalid"
            }
          >
            <TextField.Label>Precio final:</TextField.Label>
            <div class="bg-slate-8 flex items-center rounded-xl">
              <span class="w-1/10 text-center">$</span>
              <TextField.Input
                min="0"
                class="bg-slate-8 ui-invalid:(outline outline-red) w-9/10 rounded-xl py-2 pl-2 transition duration-300 ease-in-out"
                value={price()}
              />
            </div>
            <TextField.ErrorMessage class="color-red absolute text-xs">
              El monto debe ser superior a $0
            </TextField.ErrorMessage>
          </TextField.Root>
        </div>
        <div class="flex flex-col gap-2">
          <TextField.Root
            price={installments()}
            onChange={setInstallments}
            validationState={
              parseFloat(installments()) >= 0 ? "valid" : "invalid"
            }
          >
            <TextField.Label>Cuotas (0 para contado):</TextField.Label>
            <div class="flex h-8 items-center gap-1.5">
              <div class="border-green-9 w-25/29 h-full cursor-pointer select-none rounded-xl border-2">
                {standardInstallments.map((cuotaDefault) => {
                  return (
                    <Button.Root
                      class={clsx(
                        "border-green-9 last:(border-none rounded-r-md) hover:bg-green-9 w-1/8 py-0.7 h-full flex-1 border-r bg-clip-border transition duration-300 ease-in-out first:rounded-l-md",
                        cuotaDefault === installments()
                          ? "bg-green-9"
                          : "bg-transparent"
                      )}
                      onclick={() => {
                        setInstallments(cuotaDefault);
                      }}
                    >
                      {cuotaDefault}
                    </Button.Root>
                  );
                })}
              </div>
              <TextField.Input
                min="0"
                max="60"
                type="number"
                class="bg-slate-8 ui-invalid:(outline outline-red outline) w-4/29 h-full rounded-xl px-2 text-center transition duration-300 ease-in-out"
                value={installments()}
              />
            </div>
            <TextField.ErrorMessage class="color-red absolute break-words text-xs">
              La cuota tiene que ser 0 o más
            </TextField.ErrorMessage>
          </TextField.Root>
        </div>
      </div>
    </section>
  );
};
