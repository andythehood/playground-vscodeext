/*
  Copyright 2024 Google LLC

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import {CompletionItem, CompletionItemKind, SnippetString} from "vscode";

export const functionsCompletionItems: CompletionItem[] = [
  {
    label: "avg",
    sortText: '"avg"',
    kind: CompletionItemKind.Function,
    detail: "avg(arr)",
    documentation:
      "Calculates the numerical average of all the values in an array.",
    insertText: new SnippetString("avg(${1:arr})"),
  },
  {
    label: "contains",
    sortText: '"contains(arr, elem)"',
    kind: CompletionItemKind.Function,
    detail: "contains(arr, elem)",
    documentation:
      "Checks the occurrence of the specified element in an array.",
    insertText: new SnippetString("contains(${1:arr}, ${2:elem})"),
  },
  {
    label: "maxArray",
    sortText: '"maxArray"',
    kind: CompletionItemKind.Function,
    detail: "maxArray(arr)",
    documentation:
      "Finds the highest value in an array. Input parameter arr: The input array. Return type The data type of the input array. ",
    insertText: new SnippetString("maxArray(${1:arr})"),
  },
  {
    label: "minArray",
    sortText: '"minArray"',
    kind: CompletionItemKind.Function,
    detail: "minArray(arr)",
    documentation: "Finds the lowest value in an array.",
    insertText: new SnippetString("minArray(${1:arr})"),
  },
  {
    label: "remove",
    sortText: '"remove"',
    kind: CompletionItemKind.Function,
    detail: "minArray(arr)",
    documentation: "Removes the specified element from an array.",
    insertText: new SnippetString("remove(${1:arr}, ${2:elem})"),
  },
  {
    label: "removeAt",
    sortText: '"removeAt"',
    kind: CompletionItemKind.Function,
    detail: "removeAt(arr, index)",
    documentation: "Removes an element from an array at the specified index.",
    insertText: new SnippetString("removeAt(${1:arr}, ${2:index)}"),
  },
  {
    label: "sum",
    sortText: '"sum"',
    kind: CompletionItemKind.Function,
    detail: "sum(arr)",
    documentation: "Adds all the values in an array.",
    insertText: new SnippetString("sum(${1:arr})"),
  },
  {
    label: "groupBy",
    sortText: '"groupBy"',
    kind: CompletionItemKind.Function,
    detail: "groupBy(array, function)",
    documentation:
      "Creates an object composed of keys generated from the results of running each element of array through the iteratee function",
    insertText: new SnippetString("groupBy(${1:arr}, ${2:function})"),
  },
  {
    label: "zip",
    sortText: '"zip"',
    kind: CompletionItemKind.Function,
    detail: "zip([arrays])",
    documentation:
      "Create an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second element of the given arrays, and so on",
    insertText: new SnippetString("zip([${1:arrays}])"),
  },

  {
    label: "unzip",
    sortText: '"unzip"',
    kind: CompletionItemKind.Function,
    detail: "unzip(array)",
    documentation:
      "Creates an array of grouped elements. Accepts an array of grouped elements and also creates an array regrouping the elements to their pre-zip configuration",
    insertText: new SnippetString("unzip(${1:array})"),
  },

  {
    label: "xnor",
    sortText: '"xnor"',
    kind: CompletionItemKind.Function,
    detail: "xnor(a, b)",
    documentation:
      "Performs a logical XNOR operation on the specified boolean values.",
    insertText: new SnippetString("xnor(${1:a}, ${2:b})"),
  },
  {
    label: "xor",
    sortText: '"xor"',
    kind: CompletionItemKind.Function,
    detail: "xor(a, b)",
    documentation:
      "Performs a logical XOR operation on the specified boolean values.",
    insertText: new SnippetString("xor(${1:a}, ${2:b})"),
  },
  {
    label: "sha1",
    sortText: '"sha1"',
    kind: CompletionItemKind.Function,
    detail: "sha1(str)",
    documentation:
      "Computes the cryptographic hash of the input STRING using the Secure Hash Algorithm 1 (SHA-1) algorithm.",
    insertText: new SnippetString("sha1(${1:str})"),
  },
  {
    label: "sha256",
    sortText: '"sha256"',
    kind: CompletionItemKind.Function,
    detail: "sha256(str)",
    documentation:
      "Computes the cryptographic hash of the input STRING using the Secure Hash Algorithm 256 (SHA-256) algorithm.",
    insertText: new SnippetString("sha256(${1:str})"),
  },
  {
    label: "sha512",
    sortText: '"sha512"',
    kind: CompletionItemKind.Function,
    detail: "sha512(str)",
    documentation:
      "Computes the cryptographic hash of the input STRING using the Secure Hash Algorithm 512 (SHA-512) algorithm.",
    insertText: new SnippetString("sha512(${1:str})"),
  },
  {
    label: "sha3",
    sortText: '"sha3"',
    kind: CompletionItemKind.Function,
    detail: "sha3(str)",
    documentation:
      "Computes the cryptographic hash of the input STRING using the Secure Hash Algorithm 3 (SHA-3) algorithm.",
    insertText: new SnippetString("sha3(${1:str})"),
  },
  {
    label: "manifestXml",
    sortText: '"manifestXml"',
    kind: CompletionItemKind.Function,
    detail: 'manifestXml(json, format = "badgerfish", indent_output = false)',
    documentation:
      "Converts the specified input JSON object into a XML string.",
    insertText: new SnippetString(
      'manifestXml(${1:json}, ${2:format="badgerfish"}, ${3:indent_output=false})',
    ),
  },

  {
    label: "objectRemoveKey",
    sortText: '"objectRemoveKey"',
    kind: CompletionItemKind.Function,
    detail: "objectRemoveKey(obj, key)",
    documentation: "Removes a property from a JSON object.",
    insertText: new SnippetString("objectRemoveKey(${1:obj}, ${2:key})"),
  },
  {
    label: "parseXml",
    sortText: '"parseXml"',
    kind: CompletionItemKind.Function,
    detail: 'parseXml(xml, format = "badgerfish")',
    documentation: "Parses the specified input XML string into a JSON object.",
    insertText: new SnippetString(
      'parseXml(${1:xml}, ${2:format="badgerfish"})',
    ),
  },
  {
    label: "parseCsvWithHeader",
    sortText: '"parseCsvWithHeader"',
    kind: CompletionItemKind.Function,
    detail:
      'parseCsvWithHeader(input, delimiter = ",", overwrite_duplicate_headers = true)',
    documentation: "Parse given input csv string as json.",
    insertText: new SnippetString(
      'parseCsvWithHeader(${1:input}, ${2:delimiter=","}, ${3:overwrite_duplicate_headers=true})',
    ),
  },
  {
    label: "manifestCsv",
    sortText: '"manifestCsv"',
    kind: CompletionItemKind.Function,
    detail: "manifestCsv(json, headers = null)",
    documentation: "Convert given json into csv string.",
    insertText: new SnippetString("manifestCsv(${1:json}, ${2:headers=null})"),
  },
  {
    label: "isDecimal",
    sortText: '"isDecimal"',
    kind: CompletionItemKind.Function,
    detail: "isDecimal(num)",
    documentation: "Checks if the given number is a decimal.",
    insertText: new SnippetString("isDecimal(${1:num})"),
  },
  {
    label: "isEven",
    sortText: '"isEven"',
    kind: CompletionItemKind.Function,
    detail: "isEven(num)",
    documentation: "Checks if the given number is even.",
    insertText: new SnippetString("isEven(${1:num})"),
  },
  {
    label: "isInteger",
    sortText: '"isInteger"',
    kind: CompletionItemKind.Function,
    detail: "isInteger(num)",
    documentation: "Checks if the given number is an integer.",
    insertText: new SnippetString("isInteger(${1:num})"),
  },
  {
    label: "isOdd",
    sortText: '"isOdd"',
    kind: CompletionItemKind.Function,
    detail: "isOdd(num)",
    documentation: "Checks if the given number is odd.",
    insertText: new SnippetString("isOdd(${1:num})"),
  },
  {
    label: "randomNumber",
    sortText: '"randomNumber"',
    kind: CompletionItemKind.Function,
    detail: "randomNumber(lowerBound, upperBound)",
    documentation: "Generates a random real number between a specified range.",
    insertText: new SnippetString(
      'randomNumber(${1:lowerBound}, "${2:upperBound})',
    ),
  },
  {
    label: "round",
    sortText: '"round"',
    kind: CompletionItemKind.Function,
    detail: "round(input)",
    documentation: "Rounds off a number to the nearest integer.",
    insertText: new SnippetString("round(${1:input})"),
  },
  {
    label: "equalsIgnoreCase",
    sortText: '"equalsIgnoreCase"',
    kind: CompletionItemKind.Function,
    detail: "equalsIgnoreCase(str1, str2)",
    documentation:
      "Compare the two given string values irrespective of the string case (lower or upper).",
    insertText: new SnippetString("equalsIgnoreCase(${1:str1}, ${2:str2})"),
  },
  {
    label: "isEmpty",
    sortText: '"isEmpty"',
    kind: CompletionItemKind.Function,
    detail: "isEmpty(str)",
    documentation: "Checks if the length of the given string is 0.",
    insertText: new SnippetString("isEmpty(${1:str})"),
  },
  {
    label: "match",
    sortText: '"match"',
    kind: CompletionItemKind.Function,
    detail: "match(str, regexp)",
    documentation:
      "Retrieves the result of matching a string against a regular expression.",
    insertText: new SnippetString("match(${1:str}, ${2:regexp})"),
  },
  {
    label: "trim",
    sortText: '"trim"',
    kind: CompletionItemKind.Function,
    detail: "trim(str)",
    documentation:
      "Removes all the leading and trailing spaces of a given string.",
    insertText: new SnippetString("trim(${1:str})"),
  },
  {
    label: "dateFormat",
    sortText: '"dateFormat"',
    kind: CompletionItemKind.Function,
    detail: "dateFormat(timestamp, format_string, timezone, current_format)",
    documentation:
      "Formats a timestamp according to the specified format_string.",
    insertText: new SnippetString(
      "dateFormat(${1:timestamp}, ${2:format_string}, ${3:timezone}, ${4:current_format})",
    ),
  },
  {
    label: "isLeapYear",
    sortText: '"isLeapYear"',
    kind: CompletionItemKind.Function,
    detail: "isLeapYear(year)",
    documentation: "Checks if the given year is a leap year.",
    insertText: new SnippetString("isLeapYear(${1:year})"),
  },
  {
    label: "nowInMillis",
    sortText: '"nowInMillis"',
    kind: CompletionItemKind.Function,
    detail: "nowInMillis()",
    documentation:
      "Returns the current Unix epoch time of an integration in milliseconds.",
    insertText: new SnippetString("nowInMillis()"),
  },
  {
    label: "uuid",
    sortText: '"uuid"',
    kind: CompletionItemKind.Function,
    detail: "uuid()",
    documentation:
      "Generates a random universally unique identifier (UUID) as a STRING.",
    insertText: new SnippetString("uuid()"),
  },
  {
    label: "getIntegrationName",
    sortText: '"getIntegrationName"',
    kind: CompletionItemKind.Function,
    detail: "getIntegrationName()",
    documentation: "Get the name of the current integration.",
    insertText: new SnippetString("getIntegrationName()"),
  },
  {
    label: "getIntegrationRegion",
    sortText: '"getIntegrationRegion"',
    kind: CompletionItemKind.Function,
    detail: "getIntegrationRegion()",
    documentation: "Get the region of the current integration.",
    insertText: new SnippetString("getIntegrationRegion()"),
  },
  {
    label: "getIntegrationVersionId",
    sortText: '"getIntegrationVersionId"',
    kind: CompletionItemKind.Function,
    detail: "getIntegrationVersionId()",
    documentation: "Get the integration version ID of the current integration.",
    insertText: new SnippetString("getIntegrationVersionId()"),
  },
  {
    label: "getIntegrationVersionNumber",
    sortText: '"getIntegrationVersionNumber"',
    kind: CompletionItemKind.Function,
    detail: "getIntegrationVersionNumber()",
    documentation: "Get the version number of the current integration.",
    insertText: new SnippetString("getIntegrationVersionNumber()"),
  },

  {
    label: "getExecutionId",
    sortText: '"getExecutionId"',
    kind: CompletionItemKind.Function,
    detail: "getExecutionId()",
    documentation: "Get execution ID of the current integration execution.",
    insertText: new SnippetString("getExecutionId()"),
  },
  {
    label: "getProjectId",
    sortText: '"getProjectId"',
    kind: CompletionItemKind.Function,
    detail: "getProjectId()",
    documentation:
      "Get the Google Cloud project ID of the current integration.",
    insertText: new SnippetString("getProjectId()"),
  },
];

export const stdlibCompletionItems = [
  {
    label: "extVar",
    sortText: "1-extVar",
    kind: CompletionItemKind.Function,
    detail: "extVar(x)",
    documentation:
      "If an external variable with the given name was defined, return its string value. Otherwise, raise an error.",
    insertText: new SnippetString("extVar(${1:x})"),
  },
  {
    label: "type",
    sortText: "1-type",
    kind: CompletionItemKind.Function,
    detail: "type(x)",
    documentation: `Return a string that indicates the type of the value. The possible return values are: "array", "boolean", "function", "null", "number", "object", and "string".`,
    insertText: new SnippetString("type(${1:x})"),
  },
  {
    label: "length",
    sortText: "1-length",
    kind: CompletionItemKind.Function,
    detail: "length(x)",
    documentation:
      "Depending on the type of the value given, either returns the number of elements in the array, the number of codepoints in the string, the number of parameters in the function, or the number of fields in the object. Raises an error if given a primitive value, i.e. null, true or false.",
    insertText: new SnippetString("length(${1:x})"),
  },
  {
    label: "get",
    sortText: "1-get",
    kind: CompletionItemKind.Function,
    detail: "get(o, f, default=null, inc_hidden=true)",
    documentation:
      "Returns the object's field if it exists or default value otherwise. inc_hidden controls whether to include hidden fields.",
    insertText: "get(${1:o}, ${2:f}, ${3:default=null}, ${4:inc_hidden=true})",
  },
  {
    label: "objectHas",
    sortText: "1-objectHas",
    kind: CompletionItemKind.Function,
    detail: "objectHas(o, f)",
    documentation:
      "Returns true if the given object has the field (given as a string), otherwise false. Raises an error if the arguments are not object and string respectively. Returns false if the field is hidden.",
    insertText: new SnippetString("objectHas(${1:o}, ${2:f})"),
  },
  {
    label: "objectFields",
    sortText: "1-objectFields",
    kind: CompletionItemKind.Function,
    detail: "objectFields(o)",
    documentation:
      "Returns an array of strings, each element being a field from the given object. Does not include hidden fields.",
    insertText: new SnippetString("objectFields(${1:o})"),
  },
  {
    label: "objectValues",
    sortText: "1-objectValues",
    kind: CompletionItemKind.Function,
    detail: "objectValues(o)",
    documentation:
      "Returns an array of the values in the given object. Does not include hidden fields.",
    insertText: new SnippetString("objectValues(${1:o})"),
  },
  {
    label: "objectKeysValues",
    sortText: "1-objectKeysValues",
    kind: CompletionItemKind.Function,
    detail: "objectKeysValues(o)",
    documentation:
      "Returns an array of objects from the given object, each object having two fields: key (string) and value (object). Does not include hidden fields.",
    insertText: new SnippetString("objectKeysValues(${1:o})"),
  },
  {
    label: "objectHasAll",
    sortText: "1-objectHasAll",
    kind: CompletionItemKind.Function,
    detail: "objectKeysValues(o)",
    documentation: "As std.objectHas but also includes hidden fields.",
    insertText: new SnippetString("objectHasAll(${1:o}, ${2:f})"),
  },
  {
    label: "objectFieldsAll",
    sortText: "1-objectFieldsAll",
    kind: CompletionItemKind.Function,
    detail: "objectFieldsAll(o)",
    documentation: "As std.objectFields but also includes hidden fields.",
    insertText: new SnippetString("objectFieldsAll(${1:o})"),
  },
  {
    label: "objectValuesAll",
    sortText: "1-objectValuesAll",
    kind: CompletionItemKind.Function,
    detail: "objectValuesAll(o)",
    documentation: "As std.objectValues but also includes hidden fields.",
    insertText: new SnippetString("objectValuesAll(${1:o})"),
  },
  {
    label: "objectKeysValuesAll",
    sortText: "1-objectKeysValuesAll",
    kind: CompletionItemKind.Function,
    detail: "objectKeysValuesAll(o)",
    documentation: "As std.objectKeysValues but also includes hidden fields.",
    insertText: new SnippetString("objectKeysValuesAll(${1:o})"),
  },
  {
    label: "prune",
    sortText: "1-prune",
    kind: CompletionItemKind.Function,
    detail: "prune(a)",
    documentation: `Recursively remove all "empty" members of a. "Empty" is defined as zero length 'arrays', zero length 'objects', or 'null' values. The argument a may have any type.`,
    insertText: new SnippetString("prune(${1:a})"),
  },
  {
    label: "mapWithKey",
    sortText: "1-mapWithKey",
    kind: CompletionItemKind.Function,
    detail: "mapWithKey(func, obj)",
    documentation:
      "Apply the given function to all fields of the given object, also passing the field name. The function func is expected to take the field name as the first parameter and the field value as the second.",
    insertText: new SnippetString("mapWithKey(${1:func}, ${2:obj})"),
  },
  {
    label: "abs",
    sortText: "1-abs",
    kind: CompletionItemKind.Function,
    detail: "abs(n)",
    documentation: "Return the absolute value of n",
    insertText: new SnippetString("abs(${1:n})"),
  },
  {
    label: "sign",
    sortText: "1-sign",
    kind: CompletionItemKind.Function,
    detail: "sign(n)",
    documentation: "",
    insertText: new SnippetString("sign(${1:n})"),
  },
  {
    label: "max",
    sortText: "1-max",
    kind: CompletionItemKind.Function,
    detail: "max(a, b)",
    documentation: "",
    insertText: new SnippetString("max(${1:a}, ${2:b})"),
  },
  {
    label: "min",
    sortText: "1-min",
    kind: CompletionItemKind.Function,
    detail: "min(a, b)",
    documentation: "",
    insertText: new SnippetString("min(${1:a}, ${2:b})"),
  },
  {
    label: "pow",
    sortText: "1-pow",
    kind: CompletionItemKind.Function,
    detail: "pow(x, n)",
    documentation: "",
    insertText: new SnippetString("pow(${1:x}, ${2:n})"),
  },
  {
    label: "exp",
    sortText: "1-exp",
    kind: CompletionItemKind.Function,
    detail: "exp(x)",
    documentation: "",
    insertText: new SnippetString("exp(${1:x})"),
  },
  {
    label: "log",
    sortText: "1-log",
    kind: CompletionItemKind.Function,
    detail: "log(x)",
    documentation: "",
    insertText: new SnippetString("log(${1:x})"),
  },
  {
    label: "exponent",
    sortText: "1-exponent",
    kind: CompletionItemKind.Function,
    detail: "exponent(x)",
    documentation: "",
    insertText: new SnippetString("exponent(${1:x})"),
  },
  {
    label: "mantissa",
    sortText: "1-mantissa",
    kind: CompletionItemKind.Function,
    detail: "mantissa(x)",
    documentation: "",
    insertText: new SnippetString("mantissa(${1:x})"),
  },
  {
    label: "floor",
    sortText: "1-floor",
    kind: CompletionItemKind.Function,
    detail: "floor(x)",
    documentation: "",
    insertText: new SnippetString("floor(${1:x})"),
  },
  {
    label: "ceil",
    sortText: "1-ceil",
    kind: CompletionItemKind.Function,
    detail: "ceil(x)",
    documentation: "",
    insertText: new SnippetString("ceil(${1:x})"),
  },
  {
    label: "sqrt",
    sortText: "1-sqrt",
    kind: CompletionItemKind.Function,
    detail: "sqrt(x)",
    documentation: "",
    insertText: new SnippetString("sqrt(${1:x})"),
  },
  {
    label: "sin",
    sortText: "1-sin",
    kind: CompletionItemKind.Function,
    detail: "sin(x)",
    documentation: "",
    insertText: new SnippetString("sin(${1:x})"),
  },
  {
    label: "cos",
    sortText: "1-cos",
    kind: CompletionItemKind.Function,
    detail: "cos(x)",
    documentation: "",
    insertText: new SnippetString("cos(${1:x})"),
  },
  {
    label: "tan",
    sortText: "1-tan",
    kind: CompletionItemKind.Function,
    detail: "tan(x)",
    documentation: "",
    insertText: new SnippetString("tan(${1:x})"),
  },
  {
    label: "asin",
    sortText: "1-asin",
    kind: CompletionItemKind.Function,
    detail: "asin(x)",
    documentation: "",
    insertText: new SnippetString("asin(${1:x})"),
  },
  {
    label: "acos",
    sortText: "1-acos",
    kind: CompletionItemKind.Function,
    detail: "acos(x)",
    documentation: "",
    insertText: new SnippetString("acos(${1:x})"),
  },
  {
    label: "atan",
    sortText: "1-atan",
    kind: CompletionItemKind.Function,
    detail: "atan(x)",
    documentation: "",
    insertText: new SnippetString("atan(${1:x})"),
  },
  {
    label: "round",
    sortText: "1-round",
    kind: CompletionItemKind.Function,
    detail: "round(x)",
    documentation: "",
    insertText: new SnippetString("round(${1:x})"),
  },
  {
    label: "clamp",
    sortText: "1-clamp",
    kind: CompletionItemKind.Function,
    detail: "clamp(x, minVal, maxVal)",
    documentation: `Clamp a value to fit within the range [minVal, maxVal]. Equivalent to std.max(minVal, std.min(x, maxVal)).
        
Example: std.clamp(-3, 0, 5) yields 0.

Example: std.clamp(4, 0, 5) yields 4.

Example: std.clamp(7, 0, 5) yields 5.`,
    insertText: new SnippetString("clamp(${1:x}, ${2:minVal}, ${3:maxVal})"),
  },
  {
    label: "assertEqual",
    sortText: "1-assertEqual",
    kind: CompletionItemKind.Function,
    detail: "assertEqual(a, b)",
    documentation:
      "Ensure that a == b. Returns true or throws an error message.",
    insertText: new SnippetString("assertEqual(${1:a}, ${2:b})"),
  },
  {
    label: "toString",
    sortText: "1-toString",
    kind: CompletionItemKind.Function,
    detail: "toString(a)",
    documentation: "Convert the given argument to a string.",
    insertText: new SnippetString("toString(${1:a})"),
  },
  {
    label: "codepoint",
    sortText: "1-codepoint",
    kind: CompletionItemKind.Function,
    detail: "codepoint(str)",
    documentation:
      "Returns the positive integer representing the unicode codepoint of the character in the given single-character string. This function is the inverse of std.char(n).",
    insertText: new SnippetString("codepoint(${1:str})"),
  },
  {
    label: "char",
    sortText: "1-char",
    kind: CompletionItemKind.Function,
    detail: "char(n)",
    documentation:
      "Returns a string of length one whose only unicode codepoint has integer id n. This function is the inverse of std.codepoint(str).",
    insertText: new SnippetString("char(${1:n})"),
  },
  {
    label: "substr",
    sortText: "1-substr",
    kind: CompletionItemKind.Function,
    detail: "substr(str, from, len)",
    documentation:
      "Returns a string that is the part of s that starts at offset from and is len codepoints long. If the string s is shorter than from+len, the suffix starting at position from will be returned.",
    insertText: new SnippetString("substr(${1:str}, ${2:from}, ${3:len})"),
  },
  {
    label: "findSubstr",
    sortText: "1-findSubstr",
    kind: CompletionItemKind.Function,
    detail: "findSubstr(pat, str)",
    documentation:
      "Returns an array that contains the indexes of all occurrences of pat in str.",
    insertText: new SnippetString("findSubstr(${1:pat}, ${2:str})"),
  },
  {
    label: "startsWith",
    sortText: "1-startsWith",
    kind: CompletionItemKind.Function,
    detail: "startsWith(a, b)",
    documentation: "Returns whether the string a is prefixed by the string b.",
    insertText: new SnippetString("startsWith(${1:a}, ${2:b})"),
  },
  {
    label: "endsWith",
    sortText: "1-endsWith",
    kind: CompletionItemKind.Function,
    detail: "endsWith(a, b)",
    documentation: "Returns whether the string a is suffixed by the string b.",
    insertText: new SnippetString("endsWith(${1:a}, ${2:b})"),
  },
  {
    label: "stripChars",
    sortText: "1-stripChars",
    kind: CompletionItemKind.Function,
    detail: "stripChars(str, chars)",
    documentation: `Removes characters chars from the beginning and from the end of str.
        
Example: std.stripChars(" test test test ", " ") yields "test test test".

Example: std.stripChars("aaabbbbcccc", "ac") yields "bbbb".

Example: std.stripChars("cacabbbbaacc", "ac") yields "bbbb".`,
    insertText: new SnippetString("stripChars(${1:str}, ${2:chars})"),
  },
  {
    label: "lstripChars",
    sortText: "1-lstripChars",
    kind: CompletionItemKind.Function,
    detail: "lstripChars(str, chars)",
    documentation: `Removes characters chars from the beginning of str.
Example: std.lstripChars(" test test test ", " ") yields "test test test ".

Example: std.lstripChars("aaabbbbcccc", "ac") yields "bbbbcccc".

Example: std.lstripChars("cacabbbbaacc", "ac") yields "bbbbaacc".      `,
    insertText: new SnippetString("lstripChars(${1:str}, ${2:chars})"),
  },
  {
    label: "rstripChars",
    sortText: "1-rstripChars",
    kind: CompletionItemKind.Function,
    detail: "rstripChars(str, chars)",
    documentation: `Removes characters chars from the end of str.
Example: std.rstripChars(" test test test ", " ") yields " test test test".

Example: std.rstripChars("aaabbbbcccc", "ac") yields "aaabbbb".

Example: std.rstripChars("cacabbbbaacc", "ac") yields "cacabbbb".`,
    insertText: new SnippetString("rstripChars(${1:str}, ${2:chars})"),
  },
  {
    label: "split",
    sortText: "1-split",
    kind: CompletionItemKind.Function,
    detail: "split(str, c)",
    documentation: `Split the string str into an array of strings, divided by the string c.
        
Example: std.split("foo/_bar", "/_") yields [ "foo", "bar" ].

Example: std.split("/_foo/_bar", "/_") yields [ "", "foo", "bar" ].`,
    insertText: new SnippetString("split(${1:str}, ${2:c})"),
  },
  {
    label: "splitLimit",
    sortText: "1-splitLimit",
    kind: CompletionItemKind.Function,
    detail: "splitLimit(str, c, maxsplits)",
    documentation: `As std.split(str, c) but will stop after maxsplits splits, thereby the largest array it will return has length maxsplits + 1. A limit of -1 means unlimited.

Example: std.splitLimit("foo/_bar", "/_", 1) yields [ "foo", "bar" ].

Example: std.splitLimit("/_foo/_bar", "/_", 1) yields [ "", "foo/_bar" ].`,
    insertText: new SnippetString(
      "splitLimit(${1:str}, ${2:c}, ${3:maxsplits})",
    ),
  },
  {
    label: "splitLimitR",
    sortText: "1-splitLimitR",
    kind: CompletionItemKind.Function,
    detail: "splitLimitR(str, c, maxsplits)",
    documentation: `As std.splitLimit(str, c, maxsplits) but will split from right to left.

Example: std.splitLimitR("/_foo/_bar", "/_", 1) yields [ "/_foo", "bar" ].`,
    insertText: new SnippetString(
      "splitLimitR(${1:str}, ${2:c}, ${3:maxsplits})",
    ),
  },
  {
    label: "strReplace",
    sortText: "1-strReplace",
    kind: CompletionItemKind.Function,
    detail: "strReplace(str, from, to)",
    documentation: `Returns a copy of the string in which all occurrences of string from have been replaced with string to.

Example: std.strReplace('I like to skate with my skateboard', 'skate', 'surf') yields "I like to surf with my surfboard".        `,
    insertText: new SnippetString("strReplace(${1:str}, ${2:from}, ${3:to})"),
  },
  {
    label: "isEmpty",
    sortText: "1-isEmpty",
    kind: CompletionItemKind.Function,
    detail: "isEmpty(str)",
    documentation: "Returns true if the the given string is of zero length.",
    insertText: new SnippetString("isEmpty(${1:str})"),
  },
  {
    label: "asciiUpper",
    sortText: "1-asciiUpper",
    kind: CompletionItemKind.Function,
    detail: "asciiUpper(str)",
    documentation: `Returns a copy of the string in which all ASCII letters are capitalized.
        
Example: std.asciiUpper('100 Cats!') yields "100 CATS!".`,
    insertText: new SnippetString("asciiUpper(${1:str})"),
  },
  {
    label: "asciiLower",
    sortText: "1-asciiLower",
    kind: CompletionItemKind.Function,
    detail: "asciiLower(str)",
    documentation: `Returns a copy of the string in which all ASCII letters are lower cased.
        
Example: std.asciiLower('100 Cats!') yields "100 cats!".`,
    insertText: new SnippetString("asciiLower(${1:str})"),
  },
  {
    label: "stringChars",
    sortText: "1-stringChars",
    kind: CompletionItemKind.Function,
    detail: "stringChars(str)",
    documentation: `Split the string str into an array of strings, each containing a single codepoint.
        
Example: std.stringChars("foo") yields [ "f", "o", "o" ].`,
    insertText: new SnippetString("stringChars(${1:str})"),
  },
  {
    label: "format",
    sortText: "1-format",
    kind: CompletionItemKind.Function,
    detail: "format(str, vals)",
    documentation: `Format the string str using the values in vals. The values can be an array, an object, or in other cases are treated as if they were provided in a singleton array. The string formatting follows the same rules as Python. The % operator can be used as a shorthand for this function.
        
Example: std.format("Hello %03d", 12) yields "Hello 012".

Example: "Hello %03d" % 12 yields "Hello 012".

Example: "Hello %s, age %d" % ["Foo", 25] yields "Hello Foo, age 25".

Example: "Hello %(name)s, age %(age)d" % {age: 25, name: "Foo"} yields "Hello Foo, age 25".`,
    insertText: new SnippetString("format(${1:str}, ${2:vals})"),
  },
  {
    label: "escapeStringBash",
    sortText: "1-escapeStringBash",
    kind: CompletionItemKind.Function,
    detail: "escapeStringBash(str)",
    documentation: `Wrap str in single quotes, and escape any single quotes within str by changing them to a sequence '"'"'. This allows injection of arbitrary strings as arguments of commands in bash scripts.`,
    insertText: new SnippetString("escapeStringBash(${1:str})"),
  },
  {
    label: "escapeStringDollars",
    sortText: "1-escapeStringDollars",
    kind: CompletionItemKind.Function,
    detail: "escapeStringDollars(str)",
    documentation:
      "Convert $ to $$ in str. This allows injection of arbitrary strings into systems that use $ for string interpolation (like Terraform).",
    insertText: new SnippetString("escapeStringDollars(${1:str})"),
  },
  {
    label: "escapeStringJson",
    sortText: "1-escapeStringJson",
    kind: CompletionItemKind.Function,
    detail: "escapeStringJson(str)",
    documentation: `Convert str to allow it to be embedded in a JSON representation, within a string. This adds quotes, escapes backslashes, and escapes unprintable characters.

Example: local description = "Multiline\nc:\\path"; "{name: %s}" % std.escapeStringJson(description) yields "{name: \"Multiline\\nc:\\\\path\"}".
        `,
    insertText: new SnippetString("escapeStringJson(${1:str})"),
  },
  {
    label: "escapeStringPython",
    sortText: "1-escapeStringPython",
    kind: CompletionItemKind.Function,
    detail: "escapeStringPython(str)",
    documentation:
      "Convert str to allow it to be embedded in Python. This is an alias for std.escapeStringJson.",
    insertText: new SnippetString("escapeStringPython(${1:str})"),
  },
  {
    label: "escapeStringXml",
    sortText: "1-escapeStringXml",
    kind: CompletionItemKind.Function,
    detail: "escapeStringXml(str)",
    documentation: `Convert str to allow it to be embedded in XML (or HTML). The following replacements are made:

      {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "\"": "&quot;",
        "'": "&apos;",
      }
      `,
    insertText: new SnippetString("escapeStringXml(${1:str})"),
  },
  {
    label: "parseInt",
    sortText: "1-parseInt",
    kind: CompletionItemKind.Function,
    detail: "parseInt(str)",
    documentation: "Parses a signed decimal integer from the input string.",
    insertText: new SnippetString("parseInt(${1:str})"),
  },
  {
    label: "parseOctal",
    sortText: "1-parseOctal",
    kind: CompletionItemKind.Function,
    detail: "parseOctal(str)",
    documentation: `Parses an unsigned octal integer from the input string. Initial zeroes are tolerated.

Example: std.parseOctal("755") yields 493.`,
    insertText: new SnippetString("parseOctal(${1:str})"),
  },
  {
    label: "parseHex",
    sortText: "1-parseHex",
    kind: CompletionItemKind.Function,
    detail: "parseHex(str)",
    documentation: `Parses an unsigned hexadecimal integer, from the input string. Case insensitive.

Example: std.parseHex("ff") yields 255.`,
    insertText: new SnippetString("parseHex(${1:str})"),
  },
  {
    label: "parseJson",
    sortText: "1-parseJson",
    kind: CompletionItemKind.Function,
    detail: "parseJson(str)",
    documentation: `Parses a JSON string.

Example: std.parseJson('{"foo": "bar"}') yields { "foo": "bar" }.`,
    insertText: new SnippetString("parseJson(${1:str})"),
  },
  {
    label: "parseYaml",
    sortText: "1-parseYaml",
    kind: CompletionItemKind.Function,
    detail: "parseYaml(str)",
    documentation: `Parses a YAML string. This is provided as a "best-effort" mechanism and should not be relied on to provide a fully standards compliant YAML parser. YAML is a superset of JSON, consequently "downcasting" or manifestation of YAML into JSON or Jsonnet values will only succeed when using the subset of YAML that is compatible with JSON. The parser does not support YAML documents with scalar values at the root. The root node of a YAML document must start with either a YAML sequence or map to be successfully parsed.

Example: std.parseYaml('foo: bar') yields { "foo": "bar" }.`,
    insertText: new SnippetString("parseYaml(${1:str})"),
  },
  {
    label: "encodeUTF8",
    sortText: "1-encodeUTF8",
    kind: CompletionItemKind.Function,
    detail: "encodeUTF8(str)",
    documentation:
      "Encode a string using UTF8. Returns an array of numbers representing bytes.",
    insertText: new SnippetString("encodeUTF8(${1:str})"),
  },
  {
    label: "decodeUTF8",
    sortText: "1-decodeUTF8",
    kind: CompletionItemKind.Function,
    detail: "decodeUTF8(arr)",
    documentation:
      "Decode an array of numbers representing bytes using UTF8. Returns a string.",
    insertText: new SnippetString("decodeUTF8(${1:arr})"),
  },
  {
    label: "manifestIni",
    sortText: "1-manifestIni",
    kind: CompletionItemKind.Function,
    detail: "manifestIni(ini)",
    documentation: `Convert the given structure to a string in INI format. This allows using Jsonnet's object model to build a configuration to be consumed by an application expecting an INI file. The data is in the form of a set of sections, each containing a key/value mapping. These examples should make it clear:

{
    main: { a: "1", b: "2" },
    sections: {
        s1: {x: "11", y: "22", z: "33"},
        s2: {p: "yes", q: ""},
        empty: {},
    }
}
Yields a string containing this INI file:

a = 1
b = 2
[empty]
[s1]
x = 11
y = 22
z = 33
[s2]
p = yes
q =`,
    insertText: new SnippetString("manifestIni(${1:ini})"),
  },
  {
    label: "manifestPython",
    sortText: "1-manifestPython",
    kind: CompletionItemKind.Function,
    detail: "manifestPython(v)",
    documentation: `Convert the given value to a JSON-like form that is compatible with Python. The chief differences are True / False / None instead of true / false / null.

{
    b: ["foo", "bar"],
    c: true,
    d: null,
    e: { f1: false, f2: 42 },
}
Yields a string containing Python code like:

{
    "b": ["foo", "bar"],
    "c": True,
    "d": None,
    "e": {"f1": False, "f2": 42}
}`,
    insertText: new SnippetString("manifestPython(${1:v})"),
  },
  {
    label: "manifestPythonVars",
    sortText: "1-manifestPythonVars",
    kind: CompletionItemKind.Function,
    detail: "manifestPythonVars(conf)",
    documentation: `Convert the given object to a JSON-like form that is compatible with Python. The key difference to std.manifestPython is that the top level is represented as a list of Python global variables.

{
    b: ["foo", "bar"],
    c: true,
    d: null,
    e: { f1: false, f2: 42 },
}
Yields a string containing this Python code:

b = ["foo", "bar"]
c = True
d = None
e = {"f1": False, "f2": 42}`,
    insertText: new SnippetString("manifestPythonVars(${1:conf})"),
  },
  {
    label: "manifestJsonEx",
    sortText: "1-manifestJsonEx",
    kind: CompletionItemKind.Function,
    detail: "manifestJsonEx(value, indent, newline, key_val_sep)",
    documentation: `Convert the given object to a JSON form. indent is a string containing one or more whitespaces that are used for indentation. newline is by default \n and is inserted where a newline would normally be used to break long lines. key_val_sep is used to separate the key and value of an object field:

Example: std.manifestJsonEx( { x: [1, 2, 3, true, false, null, "string\nstring"], y: { a: 1, b: 2, c: [1, 2] }, }, " ") yields "{\n \"x\": [\n 1,\n 2,\n 3,\n true,\n false,\n null,\n \"string\\nstring\"\n ],\n \"y\": {\n \"a\": 1,\n \"b\": 2,\n \"c\": [\n 1,\n 2\n ]\n }\n}".

Example: std.manifestJsonEx( { x: [1, 2, "string\nstring"], y: { a: 1, b: [1, 2] }, }, "", " ", " : ") yields "{ \"x\" : [ 1, 2, \"string\\nstring\" ], \"y\" : { \"a\" : 1, \"b\" : [ 1, 2 ] } }".`,
    insertText:
      "manifestJsonEx(${1:value}, ${2:indent}, ${3:newline}, ${4:key_val_sep})",
  },
  {
    label: "manifestJsonMinified",
    sortText: "1-manifestJsonMinified",
    kind: CompletionItemKind.Function,
    detail: "manifestJsonMinified(value)",
    documentation: `Convert the given object to a minified JSON form. Under the covers, it calls std.manifestJsonEx:'):

Example: std.manifestJsonMinified( { x: [1, 2, 3, true, false, null, "string\nstring"], y: { a: 1, b: 2, c: [1, 2] }, }) yields "{\"x\":[1,2,3,true,false,null,\"string\\nstring\"],\"y\":{\"a\":1,\"b\":2,\"c\":[1,2]}}".`,
    insertText: new SnippetString("manifestJsonMinified(${1:value})"),
  },
  {
    label: "manifestYamlDoc",
    sortText: "1-manifestYamlDoc",
    kind: CompletionItemKind.Function,
    detail:
      "manifestYamlDoc(value, indent_array_in_object=false, quote_keys=true)",
    documentation: `Convert the given value to a YAML form. Note that std.manifestJson could also be used for this purpose, because any JSON is also valid YAML. But this function will produce more canonical-looking YAML.

std.manifestYamlDoc(
  {
      x: [1, 2, 3, true, false, null,
          "string\\nstring\\n"],
      y: { a: 1, b: 2, c: [1, 2] },
  },
  indent_array_in_object=false)
Yields a string containing this YAML:

"x":
  - 1
  - 2
  - 3
  - true
  - false
  - null
  - |
      string
      string
"y":
  "a": 1
  "b": 2
  "c":
      - 1
      - 2
The indent_array_in_object param adds additional indentation which some people may find easier to read.

The quote_keys parameter controls whether YAML identifiers are always quoted or only when necessary.

`,
    insertText:
      "manifestYamlDoc(${1:value}, ${2:indent_array_in_object=false}, ${3:quote_keys=true})",
  },
  {
    label: "manifestYamlStream",
    sortText: "1-manifestYamlStream",
    kind: CompletionItemKind.Function,
    detail:
      "manifestYamlStream(value, indent_array_in_object=false, c_document_end=false, quote_keys=true)",
    documentation: `Given an array of values, emit a YAML "stream", which is a sequence of documents separated by --- and ending with ....

std.manifestYamlStream(
  ['a', 1, []],
  indent_array_in_object=false,
  c_document_end=true)
Yields this string:

---
"a"
---
1
---
[]
...
The indent_array_in_object and quote_keys params are the same as in manifestYamlDoc.

The c_document_end param adds the optional terminating ....`,
    insertText:
      "manifestYamlStream(${1:value}, ${2:indent_array_in_object=false}, ${3:c_document_end=false}, ${4:quote_keys=true})",
  },
  {
    label: "manifestXmlJsonml",
    sortText: "1-manifestXmlJsonml",
    kind: CompletionItemKind.Function,
    detail: "manifestXmlJsonml(value)",
    documentation: `Convert the given JsonML-encoded value to a string containing the XML.

std.manifestXmlJsonml([
    'svg', { height: 100, width: 100 },
    [
        'circle', {
        cx: 50, cy: 50, r: 40,
        stroke: 'black', 'stroke-width': 3,
        fill: 'red',
        }
    ],
])
Yields a string containing this XML (all on one line):

<svg height="100" width="100">
    <circle cx="50" cy="50" fill="red" r="40"
    stroke="black" stroke-width="3"></circle>;
</svg>;`,
    insertText: new SnippetString("manifestXmlJsonml(${1:value})"),
  },
  {
    label: "manifestTomlEx",
    sortText: "1-manifestTomlEx",
    kind: CompletionItemKind.Function,
    detail: "manifestTomlEx(toml, indent)",
    documentation: `Convert the given object to a TOML form. indent is a string containing one or more whitespaces that are used for indentation:

Example: std.manifestTomlEx({ key1: "value", key2: 1, section: { a: 1, b: "str", c: false, d: [1, "s", [2, 3]], subsection: { k: "v", }, }, sectionArray: [ { k: "v1", v: 123 }, { k: "v2", c: "value2" }, ], }, " ") yields "key1 = \"value\"\nkey2 = 1\n\n[section]\n a = 1\n b = \"str\"\n c = false\n d = [\n 1,\n \"s\",\n [ 2, 3 ]\n ]\n\n [section.subsection]\n k = \"v\"\n\n[[sectionArray]]\n k = \"v1\"\n v = 123\n\n[[sectionArray]]\n c = \"value2\"\n k = \"v2\"".`,
    insertText: new SnippetString("manifestTomlEx(${1:toml}, ${2:indent})"),
  },
  {
    label: "makeArray",
    sortText: "1-makeArray",
    kind: CompletionItemKind.Function,
    detail: "makeArray(sz, func)",
    documentation: `Create a new array of sz elements by calling func(i) to initialize each element. Func is expected to be a function that takes a single parameter, the index of the element it should initialize.

Example: std.makeArray(3,function(x) x * x) yields [ 0, 1, 4 ].`,
    insertText: new SnippetString("makeArray(${1:sz}, ${2:func})"),
  },
  {
    label: "member",
    sortText: "1-member",
    kind: CompletionItemKind.Function,
    detail: "member(arr, x)",
    documentation:
      "Returns whether x occurs in arr. Argument arr may be an array or a string.",
    insertText: new SnippetString("member(${1:arr}, ${2:x})"),
  },
  {
    label: "count",
    sortText: "1-count",
    kind: CompletionItemKind.Function,
    detail: "count(arr, x)",
    documentation: "Return the number of times that x occurs in arr.",
    insertText: new SnippetString("count(${1:arr}, ${2:x})"),
  },
  {
    label: "find",
    sortText: "1-find",
    kind: CompletionItemKind.Function,
    detail: "find(value, arr)",
    documentation:
      "Returns an array that contains the indexes of all occurrences of value in arr.",
    insertText: new SnippetString("find(${1:value}, ${2:arr})"),
  },
  {
    label: "map",
    sortText: "1-map",
    kind: CompletionItemKind.Function,
    detail: "map(func, arr)",
    documentation:
      "Apply the given function to every element of the array to form a new array.",
    insertText: new SnippetString("map(${1:func}, ${2:arr})"),
  },
  {
    label: "mapWithIndex",
    sortText: "1-mapWithIndex",
    kind: CompletionItemKind.Function,
    detail: "mapWithIndex(func, arr)",
    documentation:
      "Similar to map above, but it also passes to the function the element's index in the array. The function func is expected to take the index as the first parameter and the element as the second.",
    insertText: new SnippetString("mapWithIndex(${1:func}, ${2:arr})"),
  },
  {
    label: "filterMap",
    sortText: "1-filterMap",
    kind: CompletionItemKind.Function,
    detail: "filterMap(filter_func, map_func, arr)",
    documentation:
      "It first filters, then maps the given array, using the two functions provided.",
    insertText: new SnippetString(
      "filterMap(${1:filter_func}, ${2:map_func}, ${3:arr})",
    ),
  },
  {
    label: "flatMap",
    sortText: "1-flatMap",
    kind: CompletionItemKind.Function,
    detail: "flatMap(func, arr)",
    documentation: `Apply the given function to every element of arr to form a new array then flatten the result. The argument arr must be an array or a string. If arr is an array, function func must return an array. If arr is a string, function func must return an string.

The std.flatMap function can be thought of as a generalized std.map, with each element mapped to 0, 1 or more elements.

Example: std.flatMap(function(x) [x, x], [1, 2, 3]) yields [ 1, 1, 2, 2, 3, 3 ].

Example: std.flatMap(function(x) if x == 2 then [] else [x], [1, 2, 3]) yields [ 1, 3 ].

Example: std.flatMap(function(x) if x == 2 then [] else [x * 3, x * 2], [1, 2, 3]) yields [ 3, 2, 9, 6 ].

Example: std.flatMap(function(x) x+x, "foo") yields "ffoooo".`,
    insertText: new SnippetString("flatMap(${1:func}, ${2:arr})"),
  },
  {
    label: "filter",
    sortText: "1-filter",
    kind: CompletionItemKind.Function,
    detail: "filter(func, arr)",
    documentation:
      "Return a new array containing all the elements of arr for which the func function returns true.",
    insertText: new SnippetString("filter(${1:func}, ${2:arr})"),
  },
  {
    label: "foldl",
    sortText: "1-foldl",
    kind: CompletionItemKind.Function,
    detail: "foldl(func, arr, init)",
    documentation:
      "Classic foldl function. Calls the function on the result of the previous function call and each array element, or init in the case of the initial element. Traverses the array from left to right.",
    insertText: new SnippetString("foldl(${1:func}, ${2:arr}, ${3:init})"),
  },
  {
    label: "foldr",
    sortText: "1-foldr",
    kind: CompletionItemKind.Function,
    detail: "foldr(func, arr, init)",
    documentation:
      "Classic foldr function. Calls the function on the result of the previous function call and each array element, or init in the case of the initial element. Traverses the array from right to left.",
    insertText: new SnippetString("foldr(${1:func}, ${2:arr}, ${3:init})"),
  },
  {
    label: "range",
    sortText: "1-range",
    kind: CompletionItemKind.Function,
    detail: "range(from, to)",
    documentation:
      "Return an array of ascending numbers between the two limits, inclusively.",
    insertText: new SnippetString("range(${1:from}, ${2:to})"),
  },
  {
    label: "repeat",
    sortText: "1-repeat",
    kind: CompletionItemKind.Function,
    detail: "repeat(what, count)",
    documentation: `Repeats an array or a string what a number of times specified by an integer count.

Example: std.repeat([1, 2, 3], 3) yields [ 1, 2, 3, 1, 2, 3, 1, 2, 3 ].

Example: std.repeat("blah", 2) yields "blahblah".`,
    insertText: new SnippetString("repeat(${1:what}, ${2:count})"),
  },
  {
    label: "slice",
    sortText: "1-slice",
    kind: CompletionItemKind.Function,
    detail: "slice(indexable, index, end, step)",
    documentation: `Selects the elements of an array or a string from index to end with step and returns an array or a string respectively.

Note that it's recommended to use dedicated slicing syntax both for arrays and strings (e.g. arr[0:4:1] instead of std.slice(arr, 0, 4, 1)).

Example: std.slice([1, 2, 3, 4, 5, 6], 0, 4, 1) yields [ 1, 2, 3, 4 ].

Example: std.slice([1, 2, 3, 4, 5, 6], 1, 6, 2) yields [ 2, 4, 6 ].

Example: std.slice("jsonnet", 0, 4, 1) yields "json".`,
    insertText: new SnippetString(
      "slice(${1:indexable}, ${2:index}, ${3:end}, ${4:step})",
    ),
  },
  {
    label: "join",
    sortText: "1-join",
    kind: CompletionItemKind.Function,
    detail: "join(sep, arr)",
    documentation: `If sep is a string, then arr must be an array of strings, in which case they are concatenated with sep used as a delimiter. If sep is an array, then arr must be an array of arrays, in which case the arrays are concatenated in the same way, to produce a single array.

Example: std.join(".", ["www", "google", "com"]) yields "www.google.com".

Example: std.join([9, 9], [[1], [2, 3]]) yields [ 1, 9, 9, 2, 3 ].`,
    insertText: new SnippetString("join(${1:sep}, ${2:arr})"),
  },
  {
    label: "lines",
    sortText: "1-lines",
    kind: CompletionItemKind.Function,
    detail: "lines(arr)",
    documentation:
      "Concatenate an array of strings into a text file with newline characters after each string. This is suitable for constructing bash scripts and the like.",
    insertText: new SnippetString("lines(${1:arr})"),
  },
  {
    label: "flattenArrays",
    sortText: "1-flattenArrays",
    kind: CompletionItemKind.Function,
    detail: "flattenArrays(arr)",
    documentation: `Concatenate an array of arrays into a single array.

Example: std.flattenArrays([[1, 2], [3, 4], [[5, 6], [7, 8]]]) yields [ 1, 2, 3, 4, [ 5, 6 ], [ 7, 8 ] ].`,
    insertText: new SnippetString("flattenArrays(${1:arr})"),
  },
  {
    label: "reverse",
    sortText: "1-reverse",
    kind: CompletionItemKind.Function,
    detail: "reverse(arrs)",
    documentation: "Reverses an array.",
    insertText: new SnippetString("reverse(${1:arrs})"),
  },
  {
    label: "sort",
    sortText: "1-sort",
    kind: CompletionItemKind.Function,
    detail: "sort(arr, keyF=id)",
    documentation: `Sorts the array using the <= operator.

Optional argument keyF is a single argument function used to extract comparison key from each array element. Default value is identity function keyF=function(x) x.`,
    insertText: new SnippetString("sort(${1:arr}, ${2:keyF=id})"),
  },
  {
    label: "uniq",
    sortText: "1-uniq",
    kind: CompletionItemKind.Function,
    detail: "uniq(arr, keyF=id)",
    documentation: `Removes successive duplicates. When given a sorted array, removes all duplicates.

Optional argument keyF is a single argument function used to extract comparison key from each array element. Default value is identity function keyF=function(x) x.`,
    insertText: new SnippetString("uniq(${1:arr}, ${2:keyF=id})"),
  },
  {
    label: "all",
    sortText: "1-all",
    kind: CompletionItemKind.Function,
    detail: "all(arr)",
    documentation: `Return true if all elements of arr is true, false otherwise. all([]) evaluates to true.

It's an error if 1) arr is not an array, or 2) arr contains non-boolean values.`,
    insertText: new SnippetString("all(${1:arr})"),
  },
  {
    label: "any",
    sortText: "1-any",
    kind: CompletionItemKind.Function,
    detail: "any(arr)",
    documentation: `Return true if any element of arr is true, false otherwise. any([]) evaluates to false.

It's an error if 1) arr is not an array, or 2) arr contains non-boolean values.`,
    insertText: new SnippetString("any(${1:arr})"),
  },
  {
    label: "sum",
    sortText: "1-sum",
    kind: CompletionItemKind.Function,
    detail: "sum(arr)",
    documentation: "Return sum of all element in arr.",
    insertText: new SnippetString("sum(${1:arr})"),
  },
  {
    label: "set",
    sortText: "1-set",
    kind: CompletionItemKind.Function,
    detail: "set(arr, keyF=id)",
    documentation: "Shortcut for std.uniq(std.sort(arr)).",
    insertText: new SnippetString("set(${1:arr}, ${2:keyF=id})"),
  },
  {
    label: "setInter",
    sortText: "1-setInter",
    kind: CompletionItemKind.Function,
    detail: "setInter(a, b, keyF=id)",
    documentation: "Set intersection operation (values in both a and b).",
    insertText: new SnippetString("setInter(${1:a}, ${2:b}, ${3:keyF=id})"),
  },
  {
    label: "setUnion",
    sortText: "1-setUnion",
    kind: CompletionItemKind.Function,
    detail: "setUnion(a, b, keyF=id)",
    documentation: `Set union operation (values in any of a or b). Note that + on sets will simply concatenate the arrays, possibly forming an array that is not a set (due to not being ordered without duplicates).

Example: std.setUnion([1, 2], [2, 3]) yields [ 1, 2, 3 ].

Example: std.setUnion([{n:"A", v:1}, {n:"B"}], [{n:"A", v: 9999}, {n:"C"}], keyF=function(x) x.n) yields [ { "n": "A", "v": 1 }, { "n": "B" }, { "n": "C" } ].`,
    insertText: new SnippetString("setUnion(${1:a}, ${2:b}, ${3:keyF=id})"),
  },
  {
    label: "setDiff",
    sortText: "1-setDiff",
    kind: CompletionItemKind.Function,
    detail: "setDiff(a, b, keyF=id)",
    documentation: "Set difference operation (values in a but not b).",
    insertText: new SnippetString("setDiff(${1:a}, ${2:b}, ${3:keyF=id})"),
  },
  {
    label: "setMember",
    sortText: "1-setMember",
    kind: CompletionItemKind.Function,
    detail: "setMember(x, arr, keyF=id)",
    documentation: "Returns true if x is a member of array, otherwise false.",
    insertText: new SnippetString("setMember(${1:x}, ${2:arr}, ${3:keyF=id})"),
  },
  {
    label: "base64",
    sortText: "1-base64",
    kind: CompletionItemKind.Function,
    detail: "base64(input)",
    documentation:
      "Encodes the given value into a base64 string. The encoding sequence is A-Za-z0-9+/ with = to pad the output to a multiple of 4 characters. The value can be a string or an array of numbers, but the codepoints / numbers must be in the 0 to 255 range. The resulting string has no line breaks.",
    insertText: new SnippetString("base64(${1:input})"),
  },
  {
    label: "base64DecodeBytes",
    sortText: "1-base64DecodeBytes",
    kind: CompletionItemKind.Function,
    detail: "base64DecodeBytes(str)",
    documentation:
      "Decodes the given base64 string into an array of bytes (number values). Currently assumes the input string has no linebreaks and is padded to a multiple of 4 (with the = character). In other words, it consumes the output of std.base64().",
    insertText: new SnippetString("base64DecodeBytes(${1:str})"),
  },
  {
    label: "base64Decode",
    sortText: "1-base64Decode",
    kind: CompletionItemKind.Function,
    detail: "base64Decode(str)",
    documentation: `Deprecated, use std.base64DecodeBytes and decode the string explicitly (e.g. with std.decodeUTF8) instead.

Behaves like std.base64DecodeBytes() except returns a naively encoded string instead of an array of bytes.`,
    insertText: new SnippetString("base64Decode(${1:str})"),
  },
  {
    label: "md5",
    sortText: "1-md5",
    kind: CompletionItemKind.Function,
    detail: "md5(s)",
    documentation: "Encodes the given value into an MD5 string.",
    insertText: new SnippetString("md5(${1:s})"),
  },
  {
    label: "xor",
    sortText: "1-xor",
    kind: CompletionItemKind.Function,
    detail: "xor(x, y)",
    documentation: "Returns the xor of the two given booleans.",
    insertText: new SnippetString("xor(${1:x}, ${2:y})"),
  },
  {
    label: "xnor",
    sortText: "1-xnor",
    kind: CompletionItemKind.Function,
    detail: "xnor(x, y)",
    documentation: "Returns the xnor of the two given booleans.",
    insertText: new SnippetString("xnor(${1:x}, ${2:y})"),
  },
  {
    label: "mergePatch",
    sortText: "1-mergePatch",
    kind: CompletionItemKind.Function,
    detail: "mergePatch(target, patch)",
    documentation: "Applies patch to target according to RFC7396",
    insertText: new SnippetString("mergePatch(${1:target}, ${2:patch})"),
  },
  {
    label: "trace",
    sortText: "1-trace",
    kind: CompletionItemKind.Function,
    detail: "trace(str, rest)",
    documentation: `Outputs the given string str to stderr and returns rest as the result.

Example:

local conditionalReturn(cond, in1, in2) =
  if (cond) then
      std.trace('cond is true returning '
              + std.toString(in1), in1)
  else
      std.trace('cond is false returning '
              + std.toString(in2), in2);

{
    a: conditionalReturn(true, { b: true }, { c: false }),
}
Prints:

TRACE: test.jsonnet:3 cond is true returning {"b": true}
{
    "a": {
        "b": true
    }
}`,
    insertText: new SnippetString("trace(${1:str}, ${2:rest})"),
  },
];

// export const createFunctionsSuggestions = (): CompletionItem[] => {
//   return f.concat(stdlib);
// };

// export const createStdlibSuggestions = (): CompletionItem[] => {
//   // const suggestions:CompletionItem[] = [
//   //   {
//   //     label: "extVar",
//   //     sortText: '"extVar"',
//   //     kind:CompletionItemKind.Function,
//   //     detail:"",
//   // documentation:"",
//   //     insertText: new SnippetString("extVar(${1:x})"),
//   //      InsertTextFormat.Snippet,
//   //
//   //   },
//   // ];

//   // return suggestions;

//   return [
//     {
//       label: "extVar",
//       sortText: '"extVar"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("extVar(${1:x})"),
//     },
//     {
//       label: "type",
//       sortText: '"type"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("type(${1:x})"),
//     },
//     {
//       label: "length",
//       sortText: '"length"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("length(${1:x})"),
//     },
//     {
//       label: "get",
//       sortText: '"get"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText:
//         "get(${1:o}, ${2:f}, ${3:default=null}, ${4:inc_hidden=true})",
//     },
//     {
//       label: "objectHas",
//       sortText: '"objectHas"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("objectHas(${1:o}, ${2:f})"),
//     },
//     {
//       label: "objectFields",
//       sortText: '"objectFields"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("objectFields(${1:o})"),
//     },
//     {
//       label: "objectValues",
//       sortText: '"objectValues"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("objectValues(${1:o})"),
//     },
//     {
//       label: "objectKeysValues",
//       sortText: '"objectKeysValues"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("objectKeysValues(${1:o})"),
//     },
//     {
//       label: "objectHasAll",
//       sortText: '"objectHasAll"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("objectHasAll(${1:o}, ${2:f})"),
//     },
//     {
//       label: "objectFieldsAll",
//       sortText: '"objectFieldsAll"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("objectFieldsAll(${1:o})"),
//     },
//     {
//       label: "objectValuesAll",
//       sortText: '"objectValuesAll"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("objectValuesAll(${1:o})"),
//     },
//     {
//       label: "objectKeysValuesAll",
//       sortText: '"objectKeysValuesAll"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("objectKeysValuesAll(${1:o})"),
//     },
//     {
//       label: "prune",
//       sortText: '"prune"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("prune(${1:a})"),
//     },
//     {
//       label: "mapWithKey",
//       sortText: '"mapWithKey"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("mapWithKey(${1:func}, ${2:obj})"),
//     },
//     {
//       label: "abs",
//       sortText: '"abs"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("abs(${1:n})"),
//     },
//     {
//       label: "sign",
//       sortText: '"sign"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("sign(${1:n})"),
//     },
//     {
//       label: "max",
//       sortText: '"max"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("max(${1:a}, ${2:b})"),
//     },
//     {
//       label: "min",
//       sortText: '"min"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("min(${1:a}, ${2:b})"),
//     },
//     {
//       label: "pow",
//       sortText: '"pow"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("pow(${1:x}, ${2:n})"),
//     },
//     {
//       label: "exp",
//       sortText: '"exp"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("exp(${1:x})"),
//     },
//     {
//       label: "log",
//       sortText: '"log"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("log(${1:x})"),
//     },
//     {
//       label: "exponent",
//       sortText: '"exponent"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("exponent(${1:x})"),
//     },
//     {
//       label: "mantissa",
//       sortText: '"mantissa"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("mantissa(${1:x})"),
//     },
//     {
//       label: "floor",
//       sortText: '"floor"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("floor(${1:x})"),
//     },
//     {
//       label: "ceil",
//       sortText: '"ceil"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("ceil(${1:x})"),
//     },
//     {
//       label: "sqrt",
//       sortText: '"sqrt"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("sqrt(${1:x})"),
//     },
//     {
//       label: "sin",
//       sortText: '"sin"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("sin(${1:x})"),
//     },
//     {
//       label: "cos",
//       sortText: '"cos"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("cos(${1:x})"),
//     },
//     {
//       label: "tan",
//       sortText: '"tan"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("tan(${1:x})"),
//     },
//     {
//       label: "asin",
//       sortText: '"asin"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("asin(${1:x})"),
//     },
//     {
//       label: "acos",
//       sortText: '"acos"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("acos(${1:x})"),
//     },
//     {
//       label: "atan",
//       sortText: '"atan"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("atan(${1:x})"),
//     },
//     {
//       label: "round",
//       sortText: '"round"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("round(${1:x})"),
//     },
//     {
//       label: "clamp",
//       sortText: '"clamp"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("clamp(${1:x}, ${2:minVal}, ${3:maxVal})"),
//     },
//     {
//       label: "assertEqual",
//       sortText: '"assertEqual"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("assertEqual(${1:a}, ${2:b})"),
//     },
//     {
//       label: "toString",
//       sortText: '"toString"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("toString(${1:a})"),
//     },
//     {
//       label: "codepoint",
//       sortText: '"codepoint"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("codepoint(${1:str})"),
//     },
//     {
//       label: "char",
//       sortText: '"char"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("char(${1:n})"),
//     },
//     {
//       label: "substr",
//       sortText: '"substr"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("substr(${1:str}, ${2:from}, ${3:len})"),
//     },
//     {
//       label: "findSubstr",
//       sortText: '"findSubstr"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("findSubstr(${1:pat}, ${2:str})"),
//     },
//     {
//       label: "startsWith",
//       sortText: '"startsWith"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("startsWith(${1:a}, ${2:b})"),
//     },
//     {
//       label: "endsWith",
//       sortText: '"endsWith"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("endsWith(${1:a}, ${2:b})"),
//     },
//     {
//       label: "stripChars",
//       sortText: '"stripChars"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("stripChars(${1:str}, ${2:chars})"),
//     },
//     {
//       label: "lstripChars",
//       sortText: '"lstripChars"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("lstripChars(${1:str}, ${2:chars})"),
//     },
//     {
//       label: "rstripChars",
//       sortText: '"rstripChars"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("rstripChars(${1:str}, ${2:chars})"),
//     },
//     {
//       label: "split",
//       sortText: '"split"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("split(${1:str}, ${2:c})"),
//     },
//     {
//       label: "splitLimit",
//       sortText: '"splitLimit"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString(
//         "splitLimit(${1:str}, ${2:c}, ${3:maxsplits})",
//       ),
//     },
//     {
//       label: "splitLimitR",
//       sortText: '"splitLimitR"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString(
//         "splitLimitR(${1:str}, ${2:c}, ${3:maxsplits})",
//       ),
//     },
//     {
//       label: "strReplace",
//       sortText: '"strReplace"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("strReplace(${1:str}, ${2:from}, ${3:to})"),
//     },
//     {
//       label: "isEmpty",
//       sortText: '"isEmpty"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("isEmpty(${1:str})"),
//     },
//     {
//       label: "asciiUpper",
//       sortText: '"asciiUpper"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("asciiUpper(${1:str})"),
//     },
//     {
//       label: "asciiLower",
//       sortText: '"asciiLower"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("asciiLower(${1:str})"),
//     },
//     {
//       label: "stringChars",
//       sortText: '"stringChars"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("stringChars(${1:str})"),
//     },
//     {
//       label: "format",
//       sortText: '"format"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("format(${1:str}, ${2:vals})"),
//     },
//     {
//       label: "escapeStringBash",
//       sortText: '"escapeStringBash"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("escapeStringBash(${1:str})"),
//     },
//     {
//       label: "escapeStringDollars",
//       sortText: '"escapeStringDollars"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("escapeStringDollars(${1:str})"),
//     },
//     {
//       label: "escapeStringJson",
//       sortText: '"escapeStringJson"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("escapeStringJson(${1:str})"),
//     },
//     {
//       label: "escapeStringPython",
//       sortText: '"escapeStringPython"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("escapeStringPython(${1:str})"),
//     },
//     {
//       label: "escapeStringXml",
//       sortText: '"escapeStringXml"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("escapeStringXml(${1:str})"),
//     },
//     {
//       label: "parseInt",
//       sortText: '"parseInt"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("parseInt(${1:str})"),
//     },
//     {
//       label: "parseOctal",
//       sortText: '"parseOctal"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("parseOctal(${1:str})"),
//     },
//     {
//       label: "parseHex",
//       sortText: '"parseHex"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("parseHex(${1:str})"),
//     },
//     {
//       label: "parseJson",
//       sortText: '"parseJson"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("parseJson(${1:str})"),
//     },
//     {
//       label: "parseYaml",
//       sortText: '"parseYaml"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("parseYaml(${1:str})"),
//     },
//     {
//       label: "encodeUTF8",
//       sortText: '"encodeUTF8"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("encodeUTF8(${1:str})"),
//     },
//     {
//       label: "decodeUTF8",
//       sortText: '"decodeUTF8"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("decodeUTF8(${1:arr})"),
//     },
//     {
//       label: "manifestIni",
//       sortText: '"manifestIni"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("manifestIni(${1:ini})"),
//     },
//     {
//       label: "manifestPython",
//       sortText: '"manifestPython"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("manifestPython(${1:v})"),
//     },
//     {
//       label: "manifestPythonVars",
//       sortText: '"manifestPythonVars"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("manifestPythonVars(${1:conf})"),
//     },
//     {
//       label: "manifestJsonEx",
//       sortText: '"manifestJsonEx"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText:
//         "manifestJsonEx(${1:value}, ${2:indent}, ${3:newline}, ${4:key_val_sep})",
//     },
//     {
//       label: "manifestJsonMinified",
//       sortText: '"manifestJsonMinified"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("manifestJsonMinified(${1:value})"),
//     },
//     {
//       label: "manifestYamlDoc",
//       sortText: '"manifestYamlDoc"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText:
//         "manifestYamlDoc(${1:value}, ${2:indent_array_in_object=false}, ${3:quote_keys=true})",
//     },
//     {
//       label: "manifestYamlStream",
//       sortText: '"manifestYamlStream"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText:
//         "manifestYamlStream(${1:value}, ${2:indent_array_in_object=false}, ${3:c_document_end=false}, ${4:quote_keys=true})",
//     },
//     {
//       label: "manifestXmlJsonml",
//       sortText: '"manifestXmlJsonml"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("manifestXmlJsonml(${1:value})"),
//     },
//     {
//       label: "manifestTomlEx",
//       sortText: '"manifestTomlEx"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("manifestTomlEx(${1:toml}, ${2:indent})"),
//     },
//     {
//       label: "makeArray",
//       sortText: '"makeArray"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("makeArray(${1:sz}, ${2:func})"),
//     },
//     {
//       label: "member",
//       sortText: '"member"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("member(${1:arr}, ${2:x})"),
//     },
//     {
//       label: "count",
//       sortText: '"count"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("count(${1:arr}, ${2:x})"),
//     },
//     {
//       label: "find",
//       sortText: '"find"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("find(${1:value}, ${2:arr})"),
//     },
//     {
//       label: "map",
//       sortText: '"map"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("map(${1:func}, ${2:arr})"),
//     },
//     {
//       label: "mapWithIndex",
//       sortText: '"mapWithIndex"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("mapWithIndex(${1:func}, ${2:arr})"),
//     },
//     {
//       label: "filterMap",
//       sortText: '"filterMap"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString(
//         "filterMap(${1:filter_func}, ${2:map_func}, ${3:arr})",
//       ),
//     },
//     {
//       label: "flatMap",
//       sortText: '"flatMap"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("flatMap(${1:func}, ${2:arr})"),
//     },
//     {
//       label: "filter",
//       sortText: '"filter"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("filter(${1:func}, ${2:arr})"),
//     },
//     {
//       label: "foldl",
//       sortText: '"foldl"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("foldl(${1:func}, ${2:arr}, ${3:init})"),
//     },
//     {
//       label: "foldr",
//       sortText: '"foldr"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("foldr(${1:func}, ${2:arr}, ${3:init})"),
//     },
//     {
//       label: "range",
//       sortText: '"range"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("range(${1:from}, ${2:to})"),
//     },
//     {
//       label: "repeat",
//       sortText: '"repeat"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("repeat(${1:what}, ${2:count})"),
//     },
//     {
//       label: "slice",
//       sortText: '"slice"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString(
//         "slice(${1:indexable}, ${2:index}, ${3:end}, ${4:step})",
//       ),
//     },
//     {
//       label: "join",
//       sortText: '"join"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("join(${1:sep}, ${2:arr})"),
//     },
//     {
//       label: "lines",
//       sortText: '"lines"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("lines(${1:arr})"),
//     },
//     {
//       label: "flattenArrays",
//       sortText: '"flattenArrays"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("flattenArrays(${1:arr})"),
//     },
//     {
//       label: "reverse",
//       sortText: '"reverse"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("reverse(${1:arrs})"),
//     },
//     {
//       label: "sort",
//       sortText: '"sort"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("sort(${1:arr}, ${2:keyF=id})"),
//     },
//     {
//       label: "uniq",
//       sortText: '"uniq"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("uniq(${1:arr}, ${2:keyF=id})"),
//     },
//     {
//       label: "all",
//       sortText: '"all"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("all(${1:arr})"),
//     },
//     {
//       label: "any",
//       sortText: '"any"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("any(${1:arr})"),
//     },
//     {
//       label: "sum",
//       sortText: '"sum"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("sum(${1:arr})"),
//     },
//     {
//       label: "set",
//       sortText: '"set"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("set(${1:arr}, ${2:keyF=id})"),
//     },
//     {
//       label: "setInter",
//       sortText: '"setInter"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("setInter(${1:a}, ${2:b}, ${3:keyF=id})"),
//     },
//     {
//       label: "setUnion",
//       sortText: '"setUnion"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("setUnion(${1:a}, ${2:b}, ${3:keyF=id})"),
//     },
//     {
//       label: "setDiff",
//       sortText: '"setDiff"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("setDiff(${1:a}, ${2:b}, ${3:keyF=id})"),
//     },
//     {
//       label: "setMember",
//       sortText: '"setMember"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString(
//         "setMember(${1:x}, ${2:arr}, ${3:keyF=id})",
//       ),
//     },
//     {
//       label: "base64",
//       sortText: '"base64"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("base64(${1:input})"),
//     },
//     {
//       label: "base64DecodeBytes",
//       sortText: '"base64DecodeBytes"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("base64DecodeBytes(${1:str})"),
//     },
//     {
//       label: "base64Decode",
//       sortText: '"base64Decode"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("base64Decode(${1:str})"),
//     },
//     {
//       label: "md5",
//       sortText: '"md5"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("md5(${1:s})"),
//     },
//     {
//       label: "xor",
//       sortText: '"xor"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("xor(${1:x}, ${2:y})"),
//     },
//     {
//       label: "xnor",
//       sortText: '"xnor"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("xnor(${1:x}, ${2:y})"),
//     },
//     {
//       label: "mergePatch",
//       sortText: '"mergePatch"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("mergePatch(${1:target}, ${2:patch})"),
//     },
//     {
//       label: "trace",
//       sortText: '"trace"',
//       kind: CompletionItemKind.Function,
//       detail: "",
//       documentation: "",
//       insertText: new SnippetString("trace(${1:str}, ${2:rest})"),
//     },
//   ];
// };
