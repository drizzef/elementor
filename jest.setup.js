/**
 * fix the mysql2 library lazy require
 * @see https://stackoverflow.com/a/46232762/1854523
 */
require("mysql2/node_modules/iconv-lite").encodingExists("foo");
