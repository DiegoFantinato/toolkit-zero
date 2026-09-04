"use strict";

const path = require("node:path");

function normalizeFilePath(filename) {
  return String(filename || "").replace(/\\/g, "/");
}

function basename(filename) {
  return path.posix.basename(normalizeFilePath(filename));
}

function hasPathSegment(filename, segment) {
  const normalized = `/${normalizeFilePath(filename).replace(/^\/+/, "")}/`;
  const cleanSegment = String(segment || "").replace(/^\/+|\/+$/g, "");
  return cleanSegment ? normalized.includes(`/${cleanSegment}/`) : false;
}

module.exports = {
  basename,
  hasPathSegment,
  normalizeFilePath,
};
