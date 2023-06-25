import { Option } from "@/components/Option";
import { createSignal, For } from "solid-js";

const App = () => {
  const [opt1, setOpt1] = createSignal();
  const [opt2, setOpt2] = createSignal();
  const [options, setOptions] = createSignal([]);

  return (
    <div class="bg-black h-screen w-screen text-gray-300 font-inter">
      <div class="container p-5">
        <header>
          <h1 class="text-3xl mb-1">Comparador de Cuotas.</h1>
          <h4 class="text-xs">
            Herramienta para comparar el número óptimo de cuotas para una
            compra, dependiendo del interés.
          </h4>
        </header>
        <main class="mt-5">
          <Option idx="1" />
          <Option idx="2" />
          <For each={options()}>
            {(option, idx) => {
              return <Option idx={idx() + 3} />;
            }}
          </For>
          <h1
            class="select-none"
            onclick={() => {
              setOptions((opts) => {
                return [...opts, {}];
              });
            }}
          >
            Agregar otra opción
          </h1>
          <div>
            <h1>
              Tu mejor opción es comprar en <span>{}</span>
            </h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
