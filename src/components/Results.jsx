import { Footer } from "@/components/Footer";
import { Button } from "@kobalte/core";
import { For } from "solid-js";

export const Results = (props) => {
  const [bestOption, ...options] = props.compoundPrices();
  const { inflation } = props;

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
    <section class="fixed inset-0 bg-black p-6 z-50 lg:(relative)">
      <div class="container m-a">
        <div class="flex sm:justify-center justify-end">
          <Button.Root class="bg-transparent" onclick={props.close}>
            <div class="i-gridicons-cross-circle block text-xl lg:(text-4xl)" />
          </Button.Root>
        </div>

        <div>
          Tu mejor opción contra una inflación de {inflation}% mensual es:
        </div>

        {createTable(
          ["Cuotas", "Precio", "Equivalente Hoy"],
          [
            [
              bestOption.installments === "0"
                ? "contado"
                : bestOption.installments,
              `$${bestOption.price || 0}`,
              `$${bestOption.compoundPrice}`,
            ],
          ]
        )}

        <div class="mt-14">
          Tus otras opciones:
          {createTable(
            ["Cuotas", "Precio", "Equivalente Hoy"],
            options.map((option) => {
              return [
                option.installments === "0" ? "contado" : option.installments,
                `$${option.price || 0}`,
                `$${option.compoundPrice}`,
              ];
            })
          )}
        </div>

        <Footer class="lg:hidden" />
      </div>
    </section>
  );
};
