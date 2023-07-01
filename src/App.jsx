import { Option } from "@/components/Option";
import { Button } from "@kobalte/core";
import { clsx } from "clsx";
import { createSignal, For } from "solid-js";

const App = () => {
  const [opt1, setOpt1] = createSignal({ price: "0", cuotas: "1" });
  const [opt2, setOpt2] = createSignal({ price: "0", cuotas: "1" });
  const [displayResults, setDisplayResults] = createSignal(false);
  const [options, setOptions] = createSignal([opt1, opt2]);

  const toggleResults = () => {
    setDisplayResults(!displayResults());
  };

  const addOption = () => {
    setOptions((opts) => {
      return [...opts, {}];
    });
  };

  const removeOption = (id) => {
    setOptions((opts) => {
      opts.pop(id);
      return [...opts];
    });
  };

  return (
    <div class="font-inter w-screen text-gray-300">
      <div class="m-a container p-5">
        <header>
          <h1 class="mb-1 text-3xl">Comparador de Cuotas.</h1>
          <h4 class="text-xs">
            Herramienta para comparar el número óptimo de cuotas para una
            compra, dependiendo del interés.
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
                />
              );
            }}
          </For>
          <span
            class="block cursor-pointer text-5xl"
            onclick={addOption}
            i="system-uicons-plus-circle"
          />

          <Button.Root
            class="bg-green-9 rounded-xl px-7 py-3 font-bold"
            onclick={toggleResults}
          >
            Calcular
          </Button.Root>

          <section class={clsx(displayResults() ? "block" : "hidden")}>
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
