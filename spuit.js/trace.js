//trace or log
function log(){
  if(typeof console == "undefined") return;
  console.log.apply(console, jQuery.makeArray(arguments));
}
trace = log;

