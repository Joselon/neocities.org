import { test } from "node:test";
import assert from "node:assert/strict";

import { WatchProgress } from "../../src/domain/WatchProgress.js";

test("WatchProgress stores a minute", () => {
    const progress = new WatchProgress({
        minute: 47
    });

    assert.equal(progress.minute, 47);
});

//ToDo: Test del resto de atributos