/**
 * Genera un catálogo de palabras a partir del dataset title.basics.tsv de IMDb.
 *
 * Uso:
 *  node generate-omdb-words.js title.basics.tsv words.json
 * https://datasets.imdbws.com/title.basics.tsv.gz
 */

import { createReadStream, createWriteStream } from "node:fs";
import { mkdir, rename, rm } from "node:fs/promises";
import { createInterface } from "node:readline";
import { dirname, resolve } from "node:path";

const inputPath = process.argv[2];
const outputPath = resolve(process.argv[3] ?? "words.json");

const MIN_WORD_LENGTH = 3;
const MAX_WORD_LENGTH = 24;
const INCLUDE_ADULT_TITLES = false;

const STOP_WORDS = new Set(`
a an and are as at be been being by for from had has have he her hers him his
i if in into is it its me my of on or our ours she so than that the their them
there these they this those to too up us was we were what when where which who
why will with you your yours
`.trim().split(/\s+/));

function extractWords(title) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .match(/[a-z]+/g) ?? [];
}

async function main() {
  if (!inputPath) {
    console.error(
      "Uso: node scripts/generate-movie-words.js <title.basics.tsv.gz> [salida/words.json]"
    );
    process.exitCode = 1;
    return;
  }

  const counts = new Map();
  let movieCount = 0;
  let adultCount = 0;
  let processedRows = 0;

  const input = createReadStream(resolve(inputPath));
  const lines = createInterface({
    input,
    crlfDelay: Infinity,
  });

  let columnIndexes;

  for await (const line of lines) {
    if (!columnIndexes) {
      const headers = line.split("\t");

      columnIndexes = {
        titleType: headers.indexOf("titleType"),
        primaryTitle: headers.indexOf("primaryTitle"),
        originalTitle: headers.indexOf("originalTitle"),
        isAdult: headers.indexOf("isAdult"),
      };

      if (Object.values(columnIndexes).some(index => index < 0)) {
        throw new Error(
          "El TSV no contiene las columnas esperadas de IMDb."
        );
      }

      continue;
    }

    processedRows++;

    const fields = line.split("\t");

    if (fields[columnIndexes.titleType] !== "movie") {
      continue;
    }

    const isAdult = fields[columnIndexes.isAdult] === "1";

    if (isAdult && !INCLUDE_ADULT_TITLES) {
      adultCount++;
      continue;
    }

    movieCount++;

    const titles = [
      fields[columnIndexes.originalTitle],
      fields[columnIndexes.primaryTitle],
    ];

    const wordsInThisMovie = new Set(
      titles.flatMap(extractWords)
    );

    for (const word of wordsInThisMovie) {
      if (
        word.length < MIN_WORD_LENGTH ||
        word.length > MAX_WORD_LENGTH
      ) {
        continue;
      }

      if (STOP_WORDS.has(word)) {
        continue;
      }

      counts.set(word, (counts.get(word) ?? 0) + 1);
    }

    if (processedRows % 1_000_000 === 0) {
      console.error(
        `Filas procesadas: ${processedRows.toLocaleString("en-US")}`
      );
    }
  }

  const words = [...counts.keys()].sort(
    (a, b) => a.localeCompare(b, "en")
  );

  await mkdir(dirname(outputPath), { recursive: true });

  const temporaryPath = `${outputPath}.tmp`;
  const output = createWriteStream(temporaryPath, {
    encoding: "utf8",
  });

  output.write(`${JSON.stringify(words, null, 2)}\n`);

  await new Promise((resolvePromise, rejectPromise) => {
    output.on("error", rejectPromise);
    output.end(resolvePromise);
  });

  await rename(temporaryPath, outputPath).catch(async error => {
    await rm(temporaryPath, { force: true });
    throw error;
  });

  console.log("Catálogo generado correctamente.");
  console.log(`Películas analizadas: ${movieCount.toLocaleString("en-US")}`);
  console.log(`Títulos adultos excluidos: ${adultCount.toLocaleString("en-US")}`);
  console.log(`Palabras únicas: ${words.length.toLocaleString("en-US")}`);
  console.log(`Archivo: ${outputPath}`);

  console.log(
    "Nota: el dataset no identifica el idioma; puede haber palabras de otros idiomas."
  );
}

main().catch(error => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
