import assert from "node:assert/strict";
import test from "node:test";

import {
  fortnoxNumberOrZero,
  parseFortnoxNumber
} from "../dist/services/fortnoxNumbers.js";

test("parses supplier invoice amounts returned as strings", () => {
  assert.equal(parseFortnoxNumber("13604"), 13604);
  assert.equal(parseFortnoxNumber("35827.5"), 35827.5);
  assert.equal(parseFortnoxNumber("-12.50"), -12.5);
});

test("keeps numeric amounts numeric and rejects invalid values", () => {
  assert.equal(parseFortnoxNumber(3750), 3750);
  assert.equal(parseFortnoxNumber(null), undefined);
  assert.equal(parseFortnoxNumber(""), undefined);
  assert.equal(parseFortnoxNumber("not-a-number"), undefined);
  assert.equal(parseFortnoxNumber(Number.NaN), undefined);
});

test("numeric strings add instead of concatenating", () => {
  const balances = ["13604", "3495", "17661.95"];
  const total = balances.reduce((sum, balance) => sum + fortnoxNumberOrZero(balance), 0);

  assert.equal(total, 34760.95);
  assert.equal(typeof total, "number");
});
