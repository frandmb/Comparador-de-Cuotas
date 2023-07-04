import { Option } from "@/components/Option";
import { Button } from "@kobalte/core";
import { clsx } from "clsx";
import { createSignal, For, Show } from "solid-js";

const App = () => {
  const inflation = 7.8; // No encontré API pública para pullearlo actualizado, ref publicación: https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31
  const [options, setOptions] = createSignal([]);
  const [displayResults, setDisplayResults] = createSignal(false);
  const [compoundPrices, setCompoundPrices] = createSignal(["0", 0]);

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
          <h1 class="mb-1 text-2xl">Comparador de Cuotas.</h1>
          <h4 class="text-xs">
            Calculá qué opción de compra se posiciona mejor contra la inflación
            Argentina.
          </h4>
        </header>
        <main class="mt-5 flex flex-col items-center gap-3">
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
            class="cursor-pointer bg-transparent text-5xl"
            onclick={addOption}
          >
            <div i="system-uicons-plus-circle"></div>
          </Button.Root>
          <span>Inflación estimada: {inflation}</span>

          <Button.Root
            class="bg-green-9 hover:bg-green-8 rounded-xl px-7 py-3 font-bold transition duration-300"
            onclick={async () => {
              const prices = await Promise.all(
                options().map(async (option) => {
                  const [installments, price] = [
                    option["installments"][0](),
                    option["price"][0](),
                  ];
                  return {
                    installments: installments,
                    compoundPrice: await calculateCompoundPrice(
                      Number(price),
                      inflation / 100,
                      parseInt(installments)
                    ),
                    price: price,
                  };
                })
              );
              prices.sort((a, b) => a["compoundPrice"] > b["compoundPrice"]);
              setCompoundPrices(prices);
              showResults();
            }}
          >
            Calcular
          </Button.Root>

          <Show when={displayResults()}>
            <h1>
              Tu mejor opción es pagar
              {() => {
                const { installments, price } = compoundPrices()[0];
                return (
                  (installments > 0
                    ? ` en ${installments} CUOTAS`
                    : ` de CONTADO`) + ` a $${price} (total)`
                );
              }}
            </h1>
          </Show>
        </main>
      </div>
    </div>
  );
};

export default App;
