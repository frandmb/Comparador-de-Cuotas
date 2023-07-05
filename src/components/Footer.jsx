import { clsx } from "clsx";

export const Footer = (props) => {
  return (
    <footer
      class={clsx(
        "flex flex-col items-center px-7 text-center text-gray-400",
        props.class
      )}
    >
      <h2 class="text-6">¿Cómo se calcula?</h2>
      <p>
        La comparación se realiza calculando el Valor Presente del dinero en
        cada opción. Se calcula el interés compuesto cuota por cuota y luego se
        suman.
        <br />
        <a
          href="https://economipedia.com/definiciones/valor-futuro.html"
          target="_blank"
          class="underline"
        >
          Ver Fórmula
        </a>
      </p>
      <a
        i="mdi-github"
        class="text-15 mt-5 text-gray-700 hover:text-gray-300"
        href="https://github.com/frandmb/Comparador-de-Cuotas"
        target="_blank"
      />
    </footer>
  );
};
