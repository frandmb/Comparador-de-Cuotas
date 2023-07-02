import { Option } from "@/components/Option";
import { Button } from "@kobalte/core";
import { clsx } from "clsx";
import { createSignal, For } from "solid-js";

const inflation = 6.8;

const App = () => {
  const [options, setOptions] = createSignal([]);
  const [displayResults, setDisplayResults] = createSignal(false);

  const toggleResults = () => {
    setDisplayResults(!displayResults());
  };

  const addOption = () => {
    setOptions((opts) => {
      return [...opts, { price: createSignal(""), cuotas: createSignal("1") }];
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
          <h1 class="mb-1 text-3xl">Comparador de Cuotas.</h1>
          <h4 class="text-xs">
            Calculá qué opción te conviene más contra la inflación Argentina.
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
            class="block cursor-pointer text-5xl"
            onclick={addOption}
            i="system-uicons-plus-circle"
          />
          <span>Inflación estimada:</span>

          <Button.Root
            class="bg-green-9 hover:bg-green-8 rounded-xl px-7 py-3 font-bold transition duration-300"
            onclick={() => {
              toggleResults();
            }}
          >
            Calcular
          </Button.Root>

          <section class={displayResults() ? "block" : "hidden"}>
            <h1>
              Tu mejor opción es: <span>{}</span>
            </h1>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
