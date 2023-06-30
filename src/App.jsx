import { Option } from "@/components/Option";
import { createSignal, For } from "solid-js";

const App = () => {
  const [opt1, setOpt1] = createSignal();
  const [opt2, setOpt2] = createSignal();
  const [options, setOptions] = createSignal([]);

  return (
    <div class="font-inter w-screen text-gray-300">
      <div class="container p-5">
        <header>
          <h1 class="mb-1 text-3xl">Comparador de Cuotas.</h1>
          <h4 class="text-xs">
            Herramienta para comparar el número óptimo de cuotas para una
            compra, dependiendo del interés.
          </h4>
        </header>
        <main class="mt-5 flex flex-col items-center gap-3">
          <Option idx="1" />
          <Option idx="2" />
          <For each={options()}>
            {(option, idx) => {
              return <Option idx={idx() + 3} removable />;
            }}
          </For>
          <span
            class="block cursor-pointer text-5xl"
            onclick={() => {
              setOptions((opts) => {
                return [...opts, {}];
              });
            }}
            i="system-uicons-plus-circle"
          />
          <div>
            <h1>
              Tu mejor opción es: <span>{}</span>
            </h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
