
import { createReadStream } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { createGunzip } from "node:zlib";
import { createInterface } from "node:readline";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));

const INPUT_FILE = path.resolve(
    SCRIPT_DIRECTORY,
    process.argv[2] ?? "title.basics.tsv.gz"
);

const WORDS_FILE = path.resolve(
    SCRIPT_DIRECTORY,
    "../src/data/words.json"
);

const COUNTS_FILE = path.resolve(
    SCRIPT_DIRECTORY,
    "words-counts.json"
);

// Una palabra debe aparecer en, al menos, este número de títulos.
const MIN_TITLE_COUNT = 10;

const INCLUDED_TITLE_TYPES = new Set([
    "movie",
    "tvSeries",
    "tvMiniSeries",
    "videoGame"
]);

const STOP_WORDS = new Set(`
    a an and are as at be been being by for from had has have
    he her hers him his i if in into is it its me my of on or
    our ours she so than that the their them there these they
    this those to too up us was we were what when where which
    who why will with you your yours de la no el le der en del 
    les un di da los il na des du al vs das et que et und las 
    una wa mi se si den van mr am ji ki wo ka re con ma ren sa 
    une yi zhi im off hai tu es pa von th ga ye para te mo ne 
    fu sin ke er wu ang por qi tian ya lo um ng yo hua em ta 
    li bu mit og kai auf dai tou della je ek zi ba het jian sheng 
    ko ex ming gu dem nos va fur dao ve mas jia ha xin per dans 
    st za jin one last do all new out war tv
`.trim().split(/\s+/));

const REPORT_THRESHOLDS = [
    1, 2, 3, 5, 6, 10, 15, 20, 25, 30,
    40, 50, 75, 100, 150, 200, 300, 500
];

function normalizeWords(title) {
    return title
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .match(/[a-z]+/g) ?? [];
}

function getTitleWords(title) {
    return new Set(
        normalizeWords(title).filter(
            word => word.length > 3 && !STOP_WORDS.has(word)
        )
    );
}

async function generateWordCatalog() {
    console.log(`Origen: ${INPUT_FILE}`);
    console.log("Procesando títulos de IMDb...");

    const fileStream = createReadStream(INPUT_FILE);

    const inputStream = INPUT_FILE.endsWith(".gz")
        ? fileStream.pipe(createGunzip())
        : fileStream;

    const lines = createInterface({
        input: inputStream,
        crlfDelay: Infinity
    });

    const wordCounts = new Map();
    let processedTitles = 0;

    let isHeader = true;

    for await (const line of lines) {
        if (isHeader) {
            isHeader = false;
            continue;
        }

        const [
            ,
            titleType,
            ,
            primaryTitle,
            isAdult
        ] = line.split("\t");

        if (!INCLUDED_TITLE_TYPES.has(titleType)) {
            continue;
        }

        if (isAdult === "1" || !primaryTitle || primaryTitle === "\\N") {
            continue;
        }

        processedTitles++;

        // Cada palabra cuenta como máximo una vez por título.
        for (const word of getTitleWords(primaryTitle)) {
            wordCounts.set(
                word,
                (wordCounts.get(word) ?? 0) + 1
            );
        }

        if (processedTitles % 1_000_000 === 0) {
            console.log(
                `Títulos procesados: ${processedTitles.toLocaleString("es-ES")}`
            );
        }
    }

    const sortedWords = [...wordCounts.entries()]
        .map(([word, count]) => ({ word, count }))
        .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word));

    const selectedWords = sortedWords
        .filter(({ count }) => count >= MIN_TITLE_COUNT)
        .map(({ word }) => word)
        .sort((a, b) => a.localeCompare(b));

    await mkdir(path.dirname(WORDS_FILE), { recursive: true });

    await writeFile(
        COUNTS_FILE,
        `${JSON.stringify(sortedWords, null, 2)}\n`,
        "utf8"
    );

    await writeFile(
        WORDS_FILE,
        `${JSON.stringify(selectedWords, null, 2)}\n`,
        "utf8"
    );

    console.log("\n--- Resultado del análisis ---");
    console.log(`Títulos procesados: ${processedTitles.toLocaleString("es-ES")}`);
    console.log(`Palabras distintas encontradas(mas de 3 caracteres): ${sortedWords.length.toLocaleString("es-ES")}`);
    console.log(`Mínimo configurado: ${MIN_TITLE_COUNT} títulos`);
    console.log(`Palabras incluidas en words.json: ${selectedWords.length.toLocaleString("es-ES")}`);

    console.log("\n--- Palabras que quedarían con cada mínimo ---");

    for (const threshold of REPORT_THRESHOLDS) {
        const total = sortedWords.filter(
            ({ count }) => count >= threshold
        ).length;

        console.log(
            `Mínimo ${String(threshold).padStart(3)} títulos: ` +
            `${total.toLocaleString("es-ES")} palabras`
        );
    }

    console.log("\nArchivos generados:");
    console.log(`Catálogo: ${WORDS_FILE}`);
    console.log(`Informe:  ${COUNTS_FILE}`);
}

generateWordCatalog().catch(error => {
    console.error("Error generando el catálogo:", error);
    process.exitCode = 1;
});
