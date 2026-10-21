/*
* Script para ejecutar desde QueVemosApp/
* node split-omdb-words.js 
* Con words.js en ./data/words.json
* Lo divide en 20 partes
*/

import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const sourceFile = path.join(
  currentDirectory,
  "src/data/words.json"
);

const outputDirectory = path.join(
  currentDirectory,
  "src/data/words"
);

const numberOfShards = 20;

async function splitWords() {
  const content = await readFile(sourceFile, "utf8");
  const words = JSON.parse(content);

  if (!Array.isArray(words)) {
    throw new Error("words.json debe contener un array JSON.");
  }

  await mkdir(outputDirectory, { recursive: true });

  // Reparte las palabras de forma intercalada entre los archivos.
  for (let shardIndex = 0; shardIndex < numberOfShards; shardIndex++) {
    const shardWords = words.filter(
      (_, wordIndex) => wordIndex % numberOfShards === shardIndex
    );

    const fileName = `words-${String(shardIndex).padStart(2, "0")}.json`;
    const filePath = path.join(outputDirectory, fileName);

    await writeFile(
      filePath,
      `${JSON.stringify(shardWords, null, 2)}\n`,
      "utf8"
    );

    console.log(`${fileName}: ${shardWords.length} palabras`);
  }

  console.log(
    `\nDivisión completada: ${words.length} palabras en ${numberOfShards} archivos.`
  );
}

splitWords().catch((error) => {
  console.error("Error al dividir las palabras:", error);
  process.exitCode = 1;
});
