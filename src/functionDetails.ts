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

type JsonnetFunction = {
  label: string;
  detail: string;
  documentation: string;
  snippet: string;
};
export const transformerFunctions: JsonnetFunction[] = [
  {
    label: "avg",
    detail: "avg(arr)",
    documentation:
      "Calculates the numerical average of all the values in an array.",
    snippet: "avg(${1:arr})",
  },
  {
    label: "contains",
    detail: "contains(arr, elem)",
    documentation:
      "Checks the occurrence of the specified element in an array.",
    snippet: "contains(${1:arr}, ${2:elem})",
  },
  {
    label: "maxArray",
    detail: "maxArray(arr)",
    documentation:
      "Finds the highest value in an array. Input parameter arr: The input array. Return type The data type of the input array. ",
    snippet: "maxArray(${1:arr})",
  },
  {
    label: "minArray",
    detail: "minArray(arr)",
    documentation: "Finds the lowest value in an array.",
    snippet: "minArray(${1:arr})",
  },
  {
    label: "remove",
    detail: "remove(arr, elem)",
    documentation: "Removes the specified element from an array.",
    snippet: "remove(${1:arr}, ${2:elem})",
  },
  {
    label: "removeAt",
    detail: "removeAt(arr, index)",
    documentation: "Removes an element from an array at the specified index.",
    snippet: "removeAt(${1:arr}, ${2:index)}",
  },
  {
    label: "sum",
    detail: "sum(arr)",
    documentation: "Adds all the values in an array.",
    snippet: "sum(${1:arr})",
  },
  {
    label: "groupBy",
    detail: "groupBy(array, function)",
    documentation:
      "Creates an object composed of keys generated from the results of running each element of array through the iteratee function",
    snippet: "groupBy(${1:arr}, ${2:function})",
  },
  {
    label: "zip",
    detail: "zip([arrays])",
    documentation:
      "Create an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second element of the given arrays, and so on",
    snippet: "zip([${1:arrays}])",
  },

  {
    label: "unzip",
    detail: "unzip(array)",
    documentation:
      "Creates an array of grouped elements. Accepts an array of grouped elements and also creates an array regrouping the elements to their pre-zip configuration",
    snippet: "unzip(${1:array})",
  },

  {
    label: "xnor",
    detail: "xnor(a, b)",
    documentation:
      "Performs a logical XNOR operation on the specified boolean values.",
    snippet: "xnor(${1:a}, ${2:b})",
  },
  {
    label: "xor",
    detail: "xor(a, b)",
    documentation:
      "Performs a logical XOR operation on the specified boolean values.",
    snippet: "xor(${1:a}, ${2:b})",
  },
  {
    label: "sha1",
    detail: "sha1(str)",
    documentation:
      "Computes the cryptographic hash of the input STRING using the Secure Hash Algorithm 1 (SHA-1) algorithm.",
    snippet: "sha1(${1:str})",
  },
  {
    label: "sha256",
    detail: "sha256(str)",
    documentation:
      "Computes the cryptographic hash of the input STRING using the Secure Hash Algorithm 256 (SHA-256) algorithm.",
    snippet: "sha256(${1:str})",
  },
  {
    label: "sha512",
    detail: "sha512(str)",
    documentation:
      "Computes the cryptographic hash of the input STRING using the Secure Hash Algorithm 512 (SHA-512) algorithm.",
    snippet: "sha512(${1:str})",
  },
  {
    label: "sha3",
    detail: "sha3(str)",
    documentation:
      "Computes the cryptographic hash of the input STRING using the Secure Hash Algorithm 3 (SHA-3) algorithm.",
    snippet: "sha3(${1:str})",
  },
  {
    label: "manifestXml",
    detail: 'manifestXml(json, format="badgerfish", indent_output=false)',
    documentation:
      "Converts the specified input JSON object into a XML string.",
    snippet:
      'manifestXml(${1:json}, ${2:format="badgerfish"}, ${3:indent_output=false})',
  },

  {
    label: "objectRemoveKey",
    detail: "objectRemoveKey(obj, key)",
    documentation: "Removes a property from a JSON object.",
    snippet: "objectRemoveKey(${1:obj}, ${2:key})",
  },
  {
    label: "parseXml",
    detail: 'parseXml(xml, format="badgerfish")',
    documentation: "Parses the specified input XML string into a JSON object.",
    snippet: 'parseXml(${1:xml}, ${2:format="badgerfish"})',
  },
  {
    label: "parseCsvWithHeader",
    detail:
      'parseCsvWithHeader(input, delimiter=",", overwrite_duplicate_headers=true)',
    documentation: "Parse given input csv string as json.",
    snippet:
      'parseCsvWithHeader(${1:input}, ${2:delimiter=","}, ${3:overwrite_duplicate_headers=true})',
  },
  {
    label: "manifestCsv",
    detail: "manifestCsv(json, headers=null)",
    documentation: "Convert given json into csv string.",
    snippet: "manifestCsv(${1:json}, ${2:headers=null})",
  },
  {
    label: "isDecimal",
    detail: "isDecimal(num)",
    documentation: "Checks if the given number is a decimal.",
    snippet: "isDecimal(${1:num})",
  },
  {
    label: "isEven",
    detail: "isEven(num)",
    documentation: "Checks if the given number is even.",
    snippet: "isEven(${1:num})",
  },
  {
    label: "isInteger",
    detail: "isInteger(num)",
    documentation: "Checks if the given number is an integer.",
    snippet: "isInteger(${1:num})",
  },
  {
    label: "isOdd",
    detail: "isOdd(num)",
    documentation: "Checks if the given number is odd.",
    snippet: "isOdd(${1:num})",
  },
  {
    label: "randomNumber",
    detail: "randomNumber(lowerBound, upperBound)",
    documentation: "Generates a random real number between a specified range.",
    snippet: 'randomNumber(${1:lowerBound}, "${2:upperBound})',
  },
  {
    label: "round",
    detail: "round(input)",
    documentation: "Rounds off a number to the nearest integer.",
    snippet: "round(${1:input})",
  },
  {
    label: "equalsIgnoreCase",
    detail: "equalsIgnoreCase(str1, str2)",
    documentation:
      "Compare the two given string values irrespective of the string case (lower or upper).",
    snippet: "equalsIgnoreCase(${1:str1}, ${2:str2})",
  },
  {
    label: "isEmpty",
    detail: "isEmpty(str)",
    documentation: "Checks if the length of the given string is 0.",
    snippet: "isEmpty(${1:str})",
  },
  {
    label: "match",
    detail: "match(str, regexp)",
    documentation:
      "Retrieves the result of matching a string against a regular expression.",
    snippet: "match(${1:str}, ${2:regexp})",
  },
  {
    label: "trim",
    detail: "trim(str)",
    documentation:
      "Removes all the leading and trailing spaces of a given string.",
    snippet: "trim(${1:str})",
  },
  {
    label: "dateFormat",
    detail: "dateFormat(timestamp, format_string, timezone, current_format)",
    documentation:
      "Formats a timestamp according to the specified format_string.",
    snippet:
      "dateFormat(${1:timestamp}, ${2:format_string}, ${3:timezone}, ${4:current_format})",
  },
  {
    label: "isLeapYear",
    detail: "isLeapYear(year)",
    documentation: "Checks if the given year is a leap year.",
    snippet: "isLeapYear(${1:year})",
  },
  {
    label: "nowInMillis",
    detail: "nowInMillis()",
    documentation:
      "Returns the current Unix epoch time of an integration in milliseconds.",
    snippet: "nowInMillis()",
  },
  {
    label: "uuid",
    detail: "uuid()",
    documentation:
      "Generates a random universally unique identifier (UUID) as a STRING.",
    snippet: "uuid()",
  },
  {
    label: "getIntegrationName",
    detail: "getIntegrationName()",
    documentation: "Get the name of the current integration.",
    snippet: "getIntegrationName()",
  },
  {
    label: "getIntegrationRegion",
    detail: "getIntegrationRegion()",
    documentation: "Get the region of the current integration.",
    snippet: "getIntegrationRegion()",
  },
  {
    label: "getIntegrationVersionId",
    detail: "getIntegrationVersionId()",
    documentation: "Get the integration version ID of the current integration.",
    snippet: "getIntegrationVersionId()",
  },
  {
    label: "getIntegrationVersionNumber",
    detail: "getIntegrationVersionNumber()",
    documentation: "Get the version number of the current integration.",
    snippet: "getIntegrationVersionNumber()",
  },

  {
    label: "getExecutionId",
    detail: "getExecutionId()",
    documentation: "Get execution ID of the current integration execution.",
    snippet: "getExecutionId()",
  },
  {
    label: "getProjectId",
    detail: "getProjectId()",
    documentation:
      "Get the Google Cloud project ID of the current integration.",
    snippet: "getProjectId()",
  },
];

export const stdlibFunctions: JsonnetFunction[] = [
  {
    label: "extVar",
    detail: "extVar(x)",
    documentation:
      "If an external variable with the given name was defined, return its string value. Otherwise, raise an error.",
    snippet: "extVar(${1:x})",
  },
  {
    label: "type",
    detail: "type(x)",
    documentation: `Return a string that indicates the type of the value. The possible return values are: "array", "boolean", "function", "null", "number", "object", and "string".`,
    snippet: "type(${1:x})",
  },
  {
    label: "length",
    detail: "length(x)",
    documentation:
      "Depending on the type of the value given, either returns the number of elements in the array, the number of codepoints in the string, the number of parameters in the function, or the number of fields in the object. Raises an error if given a primitive value, i.e. null, true or false.",
    snippet: "length(${1:x})",
  },
  {
    label: "get",
    detail: "get(o, f, default=null, inc_hidden=true)",
    documentation:
      "Returns the object's field if it exists or default value otherwise. inc_hidden controls whether to include hidden fields.",
    snippet: "get(${1:o}, ${2:f}, ${3:default=null}, ${4:inc_hidden=true})",
  },
  {
    label: "objectHas",
    detail: "objectHas(o, f)",
    documentation:
      "Returns true if the given object has the field (given as a string), otherwise false. Raises an error if the arguments are not object and string respectively. Returns false if the field is hidden.",
    snippet: "objectHas(${1:o}, ${2:f})",
  },
  {
    label: "objectFields",
    detail: "objectFields(o)",
    documentation:
      "Returns an array of strings, each element being a field from the given object. Does not include hidden fields.",
    snippet: "objectFields(${1:o})",
  },
  {
    label: "objectValues",
    detail: "objectValues(o)",
    documentation:
      "Returns an array of the values in the given object. Does not include hidden fields.",
    snippet: "objectValues(${1:o})",
  },
  {
    label: "objectKeysValues",
    detail: "objectKeysValues(o)",
    documentation:
      "Returns an array of objects from the given object, each object having two fields: key (string) and value (object). Does not include hidden fields.",
    snippet: "objectKeysValues(${1:o})",
  },
  {
    label: "objectHasAll",
    detail: "objectHasAll(o,f)",
    documentation: "As std.objectHas but also includes hidden fields.",
    snippet: "objectHasAll(${1:o}, ${2:f})",
  },
  {
    label: "objectFieldsAll",
    detail: "objectFieldsAll(o)",
    documentation: "As std.objectFields but also includes hidden fields.",
    snippet: "objectFieldsAll(${1:o})",
  },
  {
    label: "objectValuesAll",
    detail: "objectValuesAll(o)",
    documentation: "As std.objectValues but also includes hidden fields.",
    snippet: "objectValuesAll(${1:o})",
  },
  {
    label: "objectKeysValuesAll",
    detail: "objectKeysValuesAll(o)",
    documentation: "As std.objectKeysValues but also includes hidden fields.",
    snippet: "objectKeysValuesAll(${1:o})",
  },
  {
    label: "prune",
    detail: "prune(a)",
    documentation: `Recursively remove all "empty" members of a. "Empty" is defined as zero length 'arrays', zero length 'objects', or 'null' values. The argument a may have any type.`,
    snippet: "prune(${1:a})",
  },
  {
    label: "mapWithKey",
    detail: "mapWithKey(func, obj)",
    documentation:
      "Apply the given function to all fields of the given object, also passing the field name. The function func is expected to take the field name as the first parameter and the field value as the second.",
    snippet: "mapWithKey(${1:func}, ${2:obj})",
  },
  {
    label: "abs",
    detail: "abs(n)",
    documentation: "Return the absolute value of n",
    snippet: "abs(${1:n})",
  },
  {
    label: "sign",
    detail: "sign(n)",
    documentation: "",
    snippet: "sign(${1:n})",
  },
  {
    label: "max",
    detail: "max(a, b)",
    documentation: "",
    snippet: "max(${1:a}, ${2:b})",
  },
  {
    label: "min",
    detail: "min(a, b)",
    documentation: "",
    snippet: "min(${1:a}, ${2:b})",
  },
  {
    label: "pow",
    detail: "pow(x, n)",
    documentation: "",
    snippet: "pow(${1:x}, ${2:n})",
  },
  {
    label: "exp",
    detail: "exp(x)",
    documentation: "",
    snippet: "exp(${1:x})",
  },
  {
    label: "log",
    detail: "log(x)",
    documentation: "",
    snippet: "log(${1:x})",
  },
  {
    label: "exponent",
    detail: "exponent(x)",
    documentation: "",
    snippet: "exponent(${1:x})",
  },
  {
    label: "mantissa",
    detail: "mantissa(x)",
    documentation: "",
    snippet: "mantissa(${1:x})",
  },
  {
    label: "floor",
    detail: "floor(x)",
    documentation: "",
    snippet: "floor(${1:x})",
  },
  {
    label: "ceil",
    detail: "ceil(x)",
    documentation: "",
    snippet: "ceil(${1:x})",
  },
  {
    label: "sqrt",
    detail: "sqrt(x)",
    documentation: "",
    snippet: "sqrt(${1:x})",
  },
  {
    label: "sin",
    detail: "sin(x)",
    documentation: "",
    snippet: "sin(${1:x})",
  },
  {
    label: "cos",
    detail: "cos(x)",
    documentation: "",
    snippet: "cos(${1:x})",
  },
  {
    label: "tan",
    detail: "tan(x)",
    documentation: "",
    snippet: "tan(${1:x})",
  },
  {
    label: "asin",
    detail: "asin(x)",
    documentation: "",
    snippet: "asin(${1:x})",
  },
  {
    label: "acos",
    detail: "acos(x)",
    documentation: "",
    snippet: "acos(${1:x})",
  },
  {
    label: "atan",
    detail: "atan(x)",
    documentation: "",
    snippet: "atan(${1:x})",
  },
  {
    label: "round",
    detail: "round(x)",
    documentation: "",
    snippet: "round(${1:x})",
  },
  {
    label: "clamp",
    detail: "clamp(x, minVal, maxVal)",
    documentation: `Clamp a value to fit within the range [minVal, maxVal]. Equivalent to std.max(minVal, std.min(x, maxVal)).
        
Example: std.clamp(-3, 0, 5) yields 0.

Example: std.clamp(4, 0, 5) yields 4.

Example: std.clamp(7, 0, 5) yields 5.`,
    snippet: "clamp(${1:x}, ${2:minVal}, ${3:maxVal})",
  },
  {
    label: "assertEqual",
    detail: "assertEqual(a, b)",
    documentation:
      "Ensure that a == b. Returns true or throws an error message.",
    snippet: "assertEqual(${1:a}, ${2:b})",
  },
  {
    label: "toString",
    detail: "toString(a)",
    documentation: "Convert the given argument to a string.",
    snippet: "toString(${1:a})",
  },
  {
    label: "codepoint",
    detail: "codepoint(str)",
    documentation:
      "Returns the positive integer representing the unicode codepoint of the character in the given single-character string. This function is the inverse of std.char(n).",
    snippet: "codepoint(${1:str})",
  },
  {
    label: "char",
    detail: "char(n)",
    documentation:
      "Returns a string of length one whose only unicode codepoint has integer id n. This function is the inverse of std.codepoint(str).",
    snippet: "char(${1:n})",
  },
  {
    label: "substr",
    detail: "substr(str, from, len)",
    documentation:
      "Returns a string that is the part of s that starts at offset from and is len codepoints long. If the string s is shorter than from+len, the suffix starting at position from will be returned.",
    snippet: "substr(${1:str}, ${2:from}, ${3:len})",
  },
  {
    label: "findSubstr",
    detail: "findSubstr(pat, str)",
    documentation:
      "Returns an array that contains the indexes of all occurrences of pat in str.",
    snippet: "findSubstr(${1:pat}, ${2:str})",
  },
  {
    label: "startsWith",
    detail: "startsWith(a, b)",
    documentation: "Returns whether the string a is prefixed by the string b.",
    snippet: "startsWith(${1:a}, ${2:b})",
  },
  {
    label: "endsWith",
    detail: "endsWith(a, b)",
    documentation: "Returns whether the string a is suffixed by the string b.",
    snippet: "endsWith(${1:a}, ${2:b})",
  },
  {
    label: "stripChars",
    detail: "stripChars(str, chars)",
    documentation: `Removes characters chars from the beginning and from the end of str.
        
Example: std.stripChars(" test test test ", " ") yields "test test test".

Example: std.stripChars("aaabbbbcccc", "ac") yields "bbbb".

Example: std.stripChars("cacabbbbaacc", "ac") yields "bbbb".`,
    snippet: "stripChars(${1:str}, ${2:chars})",
  },
  {
    label: "lstripChars",
    detail: "lstripChars(str, chars)",
    documentation: `Removes characters chars from the beginning of str.
Example: std.lstripChars(" test test test ", " ") yields "test test test ".

Example: std.lstripChars("aaabbbbcccc", "ac") yields "bbbbcccc".

Example: std.lstripChars("cacabbbbaacc", "ac") yields "bbbbaacc".      `,
    snippet: "lstripChars(${1:str}, ${2:chars})",
  },
  {
    label: "rstripChars",
    detail: "rstripChars(str, chars)",
    documentation: `Removes characters chars from the end of str.
Example: std.rstripChars(" test test test ", " ") yields " test test test".

Example: std.rstripChars("aaabbbbcccc", "ac") yields "aaabbbb".

Example: std.rstripChars("cacabbbbaacc", "ac") yields "cacabbbb".`,
    snippet: "rstripChars(${1:str}, ${2:chars})",
  },
  {
    label: "split",
    detail: "split(str, c)",
    documentation: `Split the string str into an array of strings, divided by the string c.
        
Example: std.split("foo/_bar", "/_") yields [ "foo", "bar" ].

Example: std.split("/_foo/_bar", "/_") yields [ "", "foo", "bar" ].`,
    snippet: "split(${1:str}, ${2:c})",
  },
  {
    label: "splitLimit",
    detail: "splitLimit(str, c, maxsplits)",
    documentation: `As std.split(str, c) but will stop after maxsplits splits, thereby the largest array it will return has length maxsplits + 1. A limit of -1 means unlimited.

Example: std.splitLimit("foo/_bar", "/_", 1) yields [ "foo", "bar" ].

Example: std.splitLimit("/_foo/_bar", "/_", 1) yields [ "", "foo/_bar" ].`,
    snippet: "splitLimit(${1:str}, ${2:c}, ${3:maxsplits})",
  },
  {
    label: "splitLimitR",
    detail: "splitLimitR(str, c, maxsplits)",
    documentation: `As std.splitLimit(str, c, maxsplits) but will split from right to left.

Example: std.splitLimitR("/_foo/_bar", "/_", 1) yields [ "/_foo", "bar" ].`,
    snippet: "splitLimitR(${1:str}, ${2:c}, ${3:maxsplits})",
  },
  {
    label: "strReplace",
    detail: "strReplace(str, from, to)",
    documentation: `Returns a copy of the string in which all occurrences of string from have been replaced with string to.

Example: std.strReplace('I like to skate with my skateboard', 'skate', 'surf') yields "I like to surf with my surfboard".        `,
    snippet: "strReplace(${1:str}, ${2:from}, ${3:to})",
  },
  {
    label: "isEmpty",
    detail: "isEmpty(str)",
    documentation: "Returns true if the the given string is of zero length.",
    snippet: "isEmpty(${1:str})",
  },
  {
    label: "asciiUpper",
    detail: "asciiUpper(str)",
    documentation: `Returns a copy of the string in which all ASCII letters are capitalized.
        
Example: std.asciiUpper('100 Cats!') yields "100 CATS!".`,
    snippet: "asciiUpper(${1:str})",
  },
  {
    label: "asciiLower",
    detail: "asciiLower(str)",
    documentation: `Returns a copy of the string in which all ASCII letters are lower cased.
        
Example: std.asciiLower('100 Cats!') yields "100 cats!".`,
    snippet: "asciiLower(${1:str})",
  },
  {
    label: "stringChars",
    detail: "stringChars(str)",
    documentation: `Split the string str into an array of strings, each containing a single codepoint.
        
Example: std.stringChars("foo") yields [ "f", "o", "o" ].`,
    snippet: "stringChars(${1:str})",
  },
  {
    label: "format",
    detail: "format(str, vals)",
    documentation: `Format the string str using the values in vals. The values can be an array, an object, or in other cases are treated as if they were provided in a singleton array. The string formatting follows the same rules as Python. The % operator can be used as a shorthand for this function.
        
Example: std.format("Hello %03d", 12) yields "Hello 012".

Example: "Hello %03d" % 12 yields "Hello 012".

Example: "Hello %s, age %d" % ["Foo", 25] yields "Hello Foo, age 25".

Example: "Hello %(name)s, age %(age)d" % {age: 25, name: "Foo"} yields "Hello Foo, age 25".`,
    snippet: "format(${1:str}, ${2:vals})",
  },
  {
    label: "escapeStringBash",
    detail: "escapeStringBash(str)",
    documentation: `Wrap str in single quotes, and escape any single quotes within str by changing them to a sequence '"'"'. This allows injection of arbitrary strings as arguments of commands in bash scripts.`,
    snippet: "escapeStringBash(${1:str})",
  },
  {
    label: "escapeStringDollars",
    detail: "escapeStringDollars(str)",
    documentation:
      "Convert $ to $$ in str. This allows injection of arbitrary strings into systems that use $ for string interpolation (like Terraform).",
    snippet: "escapeStringDollars(${1:str})",
  },
  {
    label: "escapeStringJson",
    detail: "escapeStringJson(str)",
    documentation: `Convert str to allow it to be embedded in a JSON representation, within a string. This adds quotes, escapes backslashes, and escapes unprintable characters.

Example: local description = "Multiline\nc:\\path"; "{name: %s}" % std.escapeStringJson(description) yields "{name: \"Multiline\\nc:\\\\path\"}".`,
    snippet: "escapeStringJson(${1:str})",
  },
  {
    label: "escapeStringPython",
    detail: "escapeStringPython(str)",
    documentation:
      "Convert str to allow it to be embedded in Python. This is an alias for std.escapeStringJson.",
    snippet: "escapeStringPython(${1:str})",
  },
  {
    label: "escapeStringXml",
    detail: "escapeStringXml(str)",
    documentation: `Convert str to allow it to be embedded in XML (or HTML). The following replacements are made:

      {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "\"": "&quot;",
        "'": "&apos;",
      }`,
    snippet: "escapeStringXml(${1:str})",
  },
  {
    label: "parseInt",
    detail: "parseInt(str)",
    documentation: "Parses a signed decimal integer from the input string.",
    snippet: "parseInt(${1:str})",
  },
  {
    label: "parseOctal",
    detail: "parseOctal(str)",
    documentation: `Parses an unsigned octal integer from the input string. Initial zeroes are tolerated.

Example: std.parseOctal("755") yields 493.`,
    snippet: "parseOctal(${1:str})",
  },
  {
    label: "parseHex",
    detail: "parseHex(str)",
    documentation: `Parses an unsigned hexadecimal integer, from the input string. Case insensitive.

Example: std.parseHex("ff") yields 255.`,
    snippet: "parseHex(${1:str})",
  },
  {
    label: "parseJson",
    detail: "parseJson(str)",
    documentation: `Parses a JSON string.

Example: std.parseJson('{"foo": "bar"}') yields { "foo": "bar" }.`,
    snippet: "parseJson(${1:str})",
  },
  {
    label: "parseYaml",
    detail: "parseYaml(str)",
    documentation: `Parses a YAML string. This is provided as a "best-effort" mechanism and should not be relied on to provide a fully standards compliant YAML parser. YAML is a superset of JSON, consequently "downcasting" or manifestation of YAML into JSON or Jsonnet values will only succeed when using the subset of YAML that is compatible with JSON. The parser does not support YAML documents with scalar values at the root. The root node of a YAML document must start with either a YAML sequence or map to be successfully parsed.

Example: std.parseYaml('foo: bar') yields { "foo": "bar" }.`,
    snippet: "parseYaml(${1:str})",
  },
  {
    label: "encodeUTF8",
    detail: "encodeUTF8(str)",
    documentation:
      "Encode a string using UTF8. Returns an array of numbers representing bytes.",
    snippet: "encodeUTF8(${1:str})",
  },
  {
    label: "decodeUTF8",
    detail: "decodeUTF8(arr)",
    documentation:
      "Decode an array of numbers representing bytes using UTF8. Returns a string.",
    snippet: "decodeUTF8(${1:arr})",
  },
  {
    label: "manifestIni",
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
    snippet: "manifestIni(${1:ini})",
  },
  {
    label: "manifestPython",
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
    snippet: "manifestPython(${1:v})",
  },
  {
    label: "manifestPythonVars",
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
    snippet: "manifestPythonVars(${1:conf})",
  },
  {
    label: "manifestJsonEx",
    detail: "manifestJsonEx(value, indent, newline, key_val_sep)",
    documentation: `Convert the given object to a JSON form. indent is a string containing one or more whitespaces that are used for indentation. newline is by default \n and is inserted where a newline would normally be used to break long lines. key_val_sep is used to separate the key and value of an object field:

Example: std.manifestJsonEx( { x: [1, 2, 3, true, false, null, "string\nstring"], y: { a: 1, b: 2, c: [1, 2] }, }, " ") yields "{\n \"x\": [\n 1,\n 2,\n 3,\n true,\n false,\n null,\n \"string\\nstring\"\n ],\n \"y\": {\n \"a\": 1,\n \"b\": 2,\n \"c\": [\n 1,\n 2\n ]\n }\n}".

Example: std.manifestJsonEx( { x: [1, 2, "string\nstring"], y: { a: 1, b: [1, 2] }, }, "", " ", " : ") yields "{ \"x\" : [ 1, 2, \"string\\nstring\" ], \"y\" : { \"a\" : 1, \"b\" : [ 1, 2 ] } }".`,
    snippet:
      "manifestJsonEx(${1:value}, ${2:indent}, ${3:newline}, ${4:key_val_sep})",
  },
  {
    label: "manifestJsonMinified",
    detail: "manifestJsonMinified(value)",
    documentation: `Convert the given object to a minified JSON form. Under the covers, it calls std.manifestJsonEx:'):

Example: std.manifestJsonMinified( { x: [1, 2, 3, true, false, null, "string\nstring"], y: { a: 1, b: 2, c: [1, 2] }, }) yields "{\"x\":[1,2,3,true,false,null,\"string\\nstring\"],\"y\":{\"a\":1,\"b\":2,\"c\":[1,2]}}".`,
    snippet: "manifestJsonMinified(${1:value})",
  },
  {
    label: "manifestYamlDoc",
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

The quote_keys parameter controls whether YAML identifiers are always quoted or only when necessary.`,
    snippet:
      "manifestYamlDoc(${1:value}, ${2:indent_array_in_object=false}, ${3:quote_keys=true})",
  },
  {
    label: "manifestYamlStream",
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
    snippet:
      "manifestYamlStream(${1:value}, ${2:indent_array_in_object=false}, ${3:c_document_end=false}, ${4:quote_keys=true})",
  },
  {
    label: "manifestXmlJsonml",
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
    snippet: "manifestXmlJsonml(${1:value})",
  },
  {
    label: "manifestTomlEx",
    detail: "manifestTomlEx(toml, indent)",
    documentation: `Convert the given object to a TOML form. indent is a string containing one or more whitespaces that are used for indentation:

Example: std.manifestTomlEx({ key1: "value", key2: 1, section: { a: 1, b: "str", c: false, d: [1, "s", [2, 3]], subsection: { k: "v", }, }, sectionArray: [ { k: "v1", v: 123 }, { k: "v2", c: "value2" }, ], }, " ") yields "key1 = \"value\"\nkey2 = 1\n\n[section]\n a = 1\n b = \"str\"\n c = false\n d = [\n 1,\n \"s\",\n [ 2, 3 ]\n ]\n\n [section.subsection]\n k = \"v\"\n\n[[sectionArray]]\n k = \"v1\"\n v = 123\n\n[[sectionArray]]\n c = \"value2\"\n k = \"v2\"".`,
    snippet: "manifestTomlEx(${1:toml}, ${2:indent})",
  },
  {
    label: "makeArray",
    detail: "makeArray(sz, func)",
    documentation: `Create a new array of sz elements by calling func(i) to initialize each element. Func is expected to be a function that takes a single parameter, the index of the element it should initialize.

Example: std.makeArray(3,function(x) x * x) yields [ 0, 1, 4 ].`,
    snippet: "makeArray(${1:sz}, ${2:func})",
  },
  {
    label: "member",
    detail: "member(arr, x)",
    documentation:
      "Returns whether x occurs in arr. Argument arr may be an array or a string.",
    snippet: "member(${1:arr}, ${2:x})",
  },
  {
    label: "count",
    detail: "count(arr, x)",
    documentation: "Return the number of times that x occurs in arr.",
    snippet: "count(${1:arr}, ${2:x})",
  },
  {
    label: "find",
    detail: "find(value, arr)",
    documentation:
      "Returns an array that contains the indexes of all occurrences of value in arr.",
    snippet: "find(${1:value}, ${2:arr})",
  },
  {
    label: "map",
    detail: "map(func, arr)",
    documentation:
      "Apply the given function to every element of the array to form a new array.",
    snippet: "map(${1:func}, ${2:arr})",
  },
  {
    label: "mapWithIndex",
    detail: "mapWithIndex(func, arr)",
    documentation:
      "Similar to map above, but it also passes to the function the element's index in the array. The function func is expected to take the index as the first parameter and the element as the second.",
    snippet: "mapWithIndex(${1:func}, ${2:arr})",
  },
  {
    label: "filterMap",
    detail: "filterMap(filter_func, map_func, arr)",
    documentation:
      "It first filters, then maps the given array, using the two functions provided.",
    snippet: "filterMap(${1:filter_func}, ${2:map_func}, ${3:arr})",
  },
  {
    label: "flatMap",
    detail: "flatMap(func, arr)",
    documentation: `Apply the given function to every element of arr to form a new array then flatten the result. The argument arr must be an array or a string. If arr is an array, function func must return an array. If arr is a string, function func must return an string.

The std.flatMap function can be thought of as a generalized std.map, with each element mapped to 0, 1 or more elements.

Example: std.flatMap(function(x) [x, x], [1, 2, 3]) yields [ 1, 1, 2, 2, 3, 3 ].

Example: std.flatMap(function(x) if x == 2 then [] else [x], [1, 2, 3]) yields [ 1, 3 ].

Example: std.flatMap(function(x) if x == 2 then [] else [x * 3, x * 2], [1, 2, 3]) yields [ 3, 2, 9, 6 ].

Example: std.flatMap(function(x) x+x, "foo") yields "ffoooo".`,
    snippet: "flatMap(${1:func}, ${2:arr})",
  },
  {
    label: "filter",
    detail: "filter(func, arr)",
    documentation:
      "Return a new array containing all the elements of arr for which the func function returns true.",
    snippet: "filter(${1:func}, ${2:arr})",
  },
  {
    label: "foldl",
    detail: "foldl(func, arr, init)",
    documentation:
      "Classic foldl function. Calls the function on the result of the previous function call and each array element, or init in the case of the initial element. Traverses the array from left to right.",
    snippet: "foldl(${1:func}, ${2:arr}, ${3:init})",
  },
  {
    label: "foldr",
    detail: "foldr(func, arr, init)",
    documentation:
      "Classic foldr function. Calls the function on the result of the previous function call and each array element, or init in the case of the initial element. Traverses the array from right to left.",
    snippet: "foldr(${1:func}, ${2:arr}, ${3:init})",
  },
  {
    label: "range",
    detail: "range(from, to)",
    documentation:
      "Return an array of ascending numbers between the two limits, inclusively.",
    snippet: "range(${1:from}, ${2:to})",
  },
  {
    label: "repeat",
    detail: "repeat(what, count)",
    documentation: `Repeats an array or a string what a number of times specified by an integer count.

Example: std.repeat([1, 2, 3], 3) yields [ 1, 2, 3, 1, 2, 3, 1, 2, 3 ].

Example: std.repeat("blah", 2) yields "blahblah".`,
    snippet: "repeat(${1:what}, ${2:count})",
  },
  {
    label: "slice",
    detail: "slice(indexable, index, end, step)",
    documentation: `Selects the elements of an array or a string from index to end with step and returns an array or a string respectively.

Note that it's recommended to use dedicated slicing syntax both for arrays and strings (e.g. arr[0:4:1] instead of std.slice(arr, 0, 4, 1)).

Example: std.slice([1, 2, 3, 4, 5, 6], 0, 4, 1) yields [ 1, 2, 3, 4 ].

Example: std.slice([1, 2, 3, 4, 5, 6], 1, 6, 2) yields [ 2, 4, 6 ].

Example: std.slice("jsonnet", 0, 4, 1) yields "json".`,
    snippet: "slice(${1:indexable}, ${2:index}, ${3:end}, ${4:step})",
  },
  {
    label: "join",
    detail: "join(sep, arr)",
    documentation: `If sep is a string, then arr must be an array of strings, in which case they are concatenated with sep used as a delimiter. If sep is an array, then arr must be an array of arrays, in which case the arrays are concatenated in the same way, to produce a single array.

Example: std.join(".", ["www", "google", "com"]) yields "www.google.com".

Example: std.join([9, 9], [[1], [2, 3]]) yields [ 1, 9, 9, 2, 3 ].`,
    snippet: "join(${1:sep}, ${2:arr})",
  },
  {
    label: "lines",
    detail: "lines(arr)",
    documentation:
      "Concatenate an array of strings into a text file with newline characters after each string. This is suitable for constructing bash scripts and the like.",
    snippet: "lines(${1:arr})",
  },
  {
    label: "flattenArrays",
    detail: "flattenArrays(arr)",
    documentation: `Concatenate an array of arrays into a single array.

Example: std.flattenArrays([[1, 2], [3, 4], [[5, 6], [7, 8]]]) yields [ 1, 2, 3, 4, [ 5, 6 ], [ 7, 8 ] ].`,
    snippet: "flattenArrays(${1:arr})",
  },
  {
    label: "reverse",
    detail: "reverse(arrs)",
    documentation: "Reverses an array.",
    snippet: "reverse(${1:arrs})",
  },
  {
    label: "sort",
    detail: "sort(arr, keyF=id)",
    documentation: `Sorts the array using the <= operator.

Optional argument keyF is a single argument function used to extract comparison key from each array element. Default value is identity function keyF=function(x) x.`,
    snippet: "sort(${1:arr}, ${2:keyF=id})",
  },
  {
    label: "uniq",
    detail: "uniq(arr, keyF=id)",
    documentation: `Removes successive duplicates. When given a sorted array, removes all duplicates.

Optional argument keyF is a single argument function used to extract comparison key from each array element. Default value is identity function keyF=function(x) x.`,
    snippet: "uniq(${1:arr}, ${2:keyF=id})",
  },
  {
    label: "all",
    detail: "all(arr)",
    documentation: `Return true if all elements of arr is true, false otherwise. all([]) evaluates to true.

It's an error if 1) arr is not an array, or 2) arr contains non-boolean values.`,
    snippet: "all(${1:arr})",
  },
  {
    label: "any",
    detail: "any(arr)",
    documentation: `Return true if any element of arr is true, false otherwise. any([]) evaluates to false.

It's an error if 1) arr is not an array, or 2) arr contains non-boolean values.`,
    snippet: "any(${1:arr})",
  },
  {
    label: "sum",
    detail: "sum(arr)",
    documentation: "Return sum of all element in arr.",
    snippet: "sum(${1:arr})",
  },
  {
    label: "set",
    detail: "set(arr, keyF=id)",
    documentation: "Shortcut for std.uniq(std.sort(arr)).",
    snippet: "set(${1:arr}, ${2:keyF=id})",
  },
  {
    label: "setInter",
    detail: "setInter(a, b, keyF=id)",
    documentation: "Set intersection operation (values in both a and b).",
    snippet: "setInter(${1:a}, ${2:b}, ${3:keyF=id})",
  },
  {
    label: "setUnion",
    detail: "setUnion(a, b, keyF=id)",
    documentation: `Set union operation (values in any of a or b). Note that + on sets will simply concatenate the arrays, possibly forming an array that is not a set (due to not being ordered without duplicates).

Example: std.setUnion([1, 2], [2, 3]) yields [ 1, 2, 3 ].

Example: std.setUnion([{n:"A", v:1}, {n:"B"}], [{n:"A", v: 9999}, {n:"C"}], keyF=function(x) x.n) yields [ { "n": "A", "v": 1 }, { "n": "B" }, { "n": "C" } ].`,
    snippet: "setUnion(${1:a}, ${2:b}, ${3:keyF=id})",
  },
  {
    label: "setDiff",
    detail: "setDiff(a, b, keyF=id)",
    documentation: "Set difference operation (values in a but not b).",
    snippet: "setDiff(${1:a}, ${2:b}, ${3:keyF=id})",
  },
  {
    label: "setMember",
    detail: "setMember(x, arr, keyF=id)",
    documentation: "Returns true if x is a member of array, otherwise false.",
    snippet: "setMember(${1:x}, ${2:arr}, ${3:keyF=id})",
  },
  {
    label: "base64",
    detail: "base64(input)",
    documentation:
      "Encodes the given value into a base64 string. The encoding sequence is A-Za-z0-9+/ with = to pad the output to a multiple of 4 characters. The value can be a string or an array of numbers, but the codepoints / numbers must be in the 0 to 255 range. The resulting string has no line breaks.",
    snippet: "base64(${1:input})",
  },
  {
    label: "base64DecodeBytes",
    detail: "base64DecodeBytes(str)",
    documentation:
      "Decodes the given base64 string into an array of bytes (number values). Currently assumes the input string has no linebreaks and is padded to a multiple of 4 (with the = character). In other words, it consumes the output of std.base64().",
    snippet: "base64DecodeBytes(${1:str})",
  },
  {
    label: "base64Decode",
    detail: "base64Decode(str)",
    documentation: `Deprecated, use std.base64DecodeBytes and decode the string explicitly (e.g. with std.decodeUTF8) instead.

Behaves like std.base64DecodeBytes() except returns a naively encoded string instead of an array of bytes.`,
    snippet: "base64Decode(${1:str})",
  },
  {
    label: "md5",
    detail: "md5(s)",
    documentation: "Encodes the given value into an MD5 string.",
    snippet: "md5(${1:s})",
  },
  {
    label: "xor",
    detail: "xor(x, y)",
    documentation: "Returns the xor of the two given booleans.",
    snippet: "xor(${1:x}, ${2:y})",
  },
  {
    label: "xnor",
    detail: "xnor(x, y)",
    documentation: "Returns the xnor of the two given booleans.",
    snippet: "xnor(${1:x}, ${2:y})",
  },
  {
    label: "mergePatch",
    detail: "mergePatch(target, patch)",
    documentation: "Applies patch to target according to RFC7396",
    snippet: "mergePatch(${1:target}, ${2:patch})",
  },
  {
    label: "trace",
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
    snippet: "trace(${1:str}, ${2:rest})",
  },
];
