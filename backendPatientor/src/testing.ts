// interface Basic {
//   a: string;
//   b: number;
// }

// interface BasicPlusC extends Basic {
//   c: string;
// }

// interface BasicPlusD extends Basic {
//   d: string;
// }

// type BasicPlusCOrD = BasicPlusC | BasicPlusD;

// type BasicPlusCOrDMinusA = Omit<BasicPlusCOrD, 'a'>;

// const getUnknown = (): BasicPlusCOrDMinusA => (
//   Math.random() > .5 ?
//     { b: 0, c: ""} // <-- Causes error
//   : { b: 0, d: ""}
// );

// const getUnknownBis = (): Omit<BasicPlusC, 'a'> | Omit<BasicPlusD, 'a'> => (
//   Math.random() > .5 ?
//     { b: 0, c: ""}
//   : { b: 0, d: ""}
// );

// const main = (): void => {
//   getUnknown();
//   getUnknownBis();
// };

// main();


// ---------------------------------------------------------------------------------------------------------------------------------------
// By: Andrii Dieiev
// From: https://github.com/microsoft/TypeScript/issues/39556#issuecomment-656925230
type BetterOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// ---------------------------------------------------------------------------------------------------------------------------------------

interface Basic {
  a: string;
  b: number;
}

interface BasicPlusC extends Basic {
  c: string;
}

interface BasicPlusD extends Basic {
  d: string;
}

type BasicPlusCOrD = BasicPlusC | BasicPlusD;

type BasicPlusCOrDMinusA = BetterOmit<BasicPlusCOrD, 'a'>;

const getUnknown = (): BasicPlusCOrDMinusA => (
  Math.random() > .5 ?
    { b: 0, c: ""} // <-- Now works as intended
  : { b: 0, d: ""}
);

const getUnknownBis = (): Omit<BasicPlusC, 'a'> | Omit<BasicPlusD, 'a'> => (
  Math.random() > .5 ?
    { b: 0, c: ""}
  : { b: 0, d: ""}
);

const main = (): void => {
  getUnknown();
  getUnknownBis();
};

main();
