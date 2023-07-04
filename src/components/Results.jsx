import { Button } from "@kobalte/core";
import { For } from "solid-js";

export const Results = (props) => {
  const [bestOption, ...options] = props.compoundPrices();

  const createTable = (columns, values) => {
    return (
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-center text-sm font-light">
                <thead class="border-b font-medium">
                  <tr>
                    <For each={columns}>
                      {(colName) => {
                        return (
                          <th scope="col" class="px-6 py-4">
                            {colName}
                          </th>
                        );
                      }}
                    </For>
                  </tr>
                </thead>
                <tbody>
                  <For each={values}>
                    {(row) => {
                      return (
                        <tr>
                          <For each={row}>
                            {(cell) => {
                              return (
                                <td class="whitespace-nowrap px-6 py-4 font-medium">
                                  {cell}
                                </td>
                              );
                            }}
                          </For>
                        </tr>
                      );
                    }}
                  </For>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section class="fixed inset-0 bg-black p-6">
      <header class="text-right">
        <Button.Root class="bg-transparent" onclick={props.close}>
          <i i="gridicons-cross-circle" class="block text-xl" />
        </Button.Root>
      </header>

      <div>Tu mejor opción contra la inflación es:</div>

      {createTable(
        ["Cuotas", "Precio", "Valor Actual"],
        [
          [
            bestOption.installments === "0"
              ? "CONTADO"
              : bestOption.installments,
            `$${bestOption.price}`,
            `$${bestOption.compoundPrice}`,
          ],
        ]
      )}

      <div class="mt-14">
        Tus otras opciones:
        {createTable(
          ["Cuotas", "Precio", "Valor Actual"],
          options.map((option) => {
            return [
              option.installments === "0" ? "CONTADO" : option.installments,
              `$${option.price}`,
              `$${option.compoundPrice}`,
            ];
          })
        )}
      </div>
    </section>
  );
};
