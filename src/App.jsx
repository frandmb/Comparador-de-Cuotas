import { Footer } from "@/components/Footer";
import { Option } from "@/components/Option";
import { Results } from "@/components/Results";
import { Button, TextField } from "@kobalte/core";
import { For, Show, createSignal } from "solid-js";
import * as constants from "./constants";

const App = () => {
  const [inflation, setInflation] = createSignal(constants.inflation); // ref: https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31
  const [options, setOptions] = createSignal([]);
  const [displayResults, setDisplayResults] = createSignal(false);
  const [compoundPrices, setCompoundPrices] = createSignal([]);

  const calculateCurrentPrice = async (price, inflation, period) => {
    return price * Math.pow(1 - inflation, period);
  };

  const calculateCompoundPrice = async (price, inflation, periods) => {
    if (periods === 0) {
      return price;
    }
    const monthlyPrice = price / periods;
    const results = [];
    for (let period = 1; period <= periods; period++) {
      results.push(calculateCurrentPrice(monthlyPrice, inflation, period));
    }
    return (await Promise.all(results)).reduce((acc, cur) => acc + cur, 0);
  };

  const showResults = () => {
    setDisplayResults(true);
  };

  const hideResults = () => {
    setDisplayResults(false);
  };

  const addOption = () => {
    setOptions((opts) => {
      return [
        ...opts,
        {
          price: createSignal(""),
          installments: createSignal("0"),
        },
      ];
    });
  };

  const removeOption = (id) => {
    setOptions((opts) => {
      opts.splice(id, 1);
      return [...opts];
    });
  };

  [0, 0].forEach(() => {
    addOption();
  });

  return (
    <div class="font-inter w-screen text-gray-300">
      <div class="m-a container p-5">
        <header>
          <h1 class="mb-1 text-2xl lg:text-3xl">Comparador de Cuotas.</h1>
          <h4 class="text-xs">
            Calculá qué opción de compra se posiciona mejor contra la inflación
            mensual estimada. <br /> Fuente:{" "}
            <a
              href="https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31"
              target="blank"
              class="underline"
            >
              {constants.inflationSource}
            </a>{" "}
            (Argentina)
          </h4>
        </header>
        <main class="mt-2 flex flex-col items-center gap-3">
          <TextField.Root
            onChange={setInflation}
            class="flex justify-center"
            validationState={
              Number.isFinite(parseFloat(inflation())) ? "valid" : "invalid"
            }
          >
            <div class="flex w-1/2 flex-row">
              <TextField.Label class="bg-green-9 block w-1/2 pl-2 pr-1 text-center text-xs rounded-l-xl py-1 cursor-pointer">
                Inflación estimada:
              </TextField.Label>
              <div class="bg-slate-8 flex w-1/2 items-center rounded-r-xl">
                <TextField.Input
                  class="bg-slate-8 ui-invalid:(outline outline-red) w-9/10 text-center transition duration-300 ease-in-out"
                  value={inflation()}
                />
              </div>
            </div>
          </TextField.Root>
          <div class="lg:(flex-row flex-wrap) flex flex-col gap-3">
            <For each={options()}>
              {(option, idx) => {
                return (
                  <Option
                    idx={idx() + 1}
                    close={
                      idx() > 1
                        ? () => {
                            removeOption(idx());
                          }
                        : false
                    }
                    optionData={option}
                  />
                );
              }}
            </For>
            <Button.Root
              class="cursor-pointer bg-transparent text-5xl lg:(border-2 border-white border-dashed w-xs rounded-xl h-50)"
              onclick={addOption}
            >
              <div class="m-auto block i-system-uicons-plus-circle" />
            </Button.Root>
          </div>

          <Button.Root
            class="bg-green-9 hover:bg-green-8 rounded-xl px-7 py-3 font-bold transition duration-300"
            onclick={async () => {
              hideResults();
              const prices = await Promise.all(
                options().map(async (option) => {
                  const [installments, price] = [
                    option["installments"][0](),
                    option["price"][0](),
                  ];
                  const decimalInflation = Number(inflation()) / 100;
                  return {
                    installments: installments,
                    compoundPrice: Math.round(
                      await calculateCompoundPrice(
                        Number(price),
                        decimalInflation,
                        parseInt(installments)
                      )
                    ),
                    price: price,
                  };
                })
              );
              prices.sort((a, b) => a["compoundPrice"] - b["compoundPrice"]);
              setCompoundPrices(prices);
              showResults();
            }}
          >
            Calcular
          </Button.Root>

          <Show when={displayResults()}>
            <Results
              compoundPrices={compoundPrices}
              close={hideResults}
              inflation={inflation()}
            />
          </Show>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
