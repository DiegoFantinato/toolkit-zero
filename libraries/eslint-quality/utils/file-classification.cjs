"use strict";

const { basename, normalizeFilePath } = require("./path-utils.cjs");

const DEFAULT_MAX_LINES = 350;
const DEFAULT_IGNORED_SEGMENTS = [
  "node_modules",
  "dist",
  "build",
  ".next",
  "generated",
  "migrations",
  "locales",
  "fixtures",
  "mocks",
];

const TEST_FILE_RE = /(^|\/)(test|tests|__tests__)\/|\.(test|spec)\.[cm]?[jt]sx?$/i;
const TYPE_OR_BARREL_RE = /^(index|types?|interfaces?|schema)\.[cm]?[jt]sx?$/i;
const SOURCE_RE = /\.[cm]?[jt]sx?$/i;

function isTestFile(filename) {
  return TEST_FILE_RE.test(normalizeFilePath(filename));
}

function isCheckableSourceFile(filename) {
  const normalized = normalizeFilePath(filename);
  if (!SOURCE_RE.test(normalized)) return false;
  if (/\.d\.ts$/i.test(normalized)) return false;
  if (TYPE_OR_BARREL_RE.test(basename(normalized))) return false;
  return true;
}

function isBaselineIgnored(filename, ignoredSegments = DEFAULT_IGNORED_SEGMENTS) {
  const normalized = `/${normalizeFilePath(filename).replace(/^\/+/, "")}/`;
  return ignoredSegments.some((segment) => normalized.includes(`/${segment}/`));
}

module.exports = {
  DEFAULT_IGNORED_SEGMENTS,
  DEFAULT_MAX_LINES,
  isBaselineIgnored,
  isCheckableSourceFile,
  isTestFile,
};
