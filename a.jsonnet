// Import local functions

t

std.ex

local f = import 'functions';

local x = std.floor(1);

local ee = std.asciiUpper('str');

local g = std.acos(x);

local x = std.floor(2);
// local u = f.uuid();

local arrayFromObj(parent, child) =
  if f.type(f.get(parent, child)) == 'array'
  then parent[child]
  else if f.type(f.get(parent, child)) == 'object'
  then [parent[child]]
  else [];

local x = std.ext


// Helper function to get array of child elements with a specified attribute value
local getChildElementsByAttrValue(parent, child, attr, value) =
  std.flatMap(function(el) if el[attr] == value then [el] else [], arrayFromObj(parent, child));


{
  // u: u,

}
