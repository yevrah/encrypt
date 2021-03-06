let data = document.getElementById('data');
let user = document.getElementById('user')
let pass = document.getElementById('pass');
let pass_confirm = document.getElementById('pass_confirm');
let ciphermode = document.getElementById('ciphermode');
let result_enc = document.getElementById('result_enc');
let result_dec = document.getElementById('result_dec');

let button = document.getElementById('encode_decode');
button.addEventListener('click', function () { crypt(); }, false);

window.addEventListener("keydown", function(e) {
  if(e.keyCode === 69 && e.metaKey) { crypt() }
})

function crypt () {

  // Replace header and footer, and remove 80 character wrapping
  var ciphertext = data.value.replace(/==::.*/g,"").replace(/\n/g,"");

  // Reset previous entries
  result_enc.value="";
  result_dec.value="";

  if(user.value === "") return;
  if(pass.value === "") return;
  let key = String(user.value) + String(pass.value);

  triplesec.decrypt ({

    data:          triplesec.Buffer.from(ciphertext, "hex"),
    key:           triplesec.Buffer.from(key),
    progress_hook: function (obj) { /* ... */ }

  }, function (err, buff) {

    if (! err) {
      result_dec.value = buff.toString();
    }

  });


  if(pass.value !== pass_confirm.value) 
  {
    result_enc.value = "Double password required...";
    return; 
  }

  triplesec.encrypt ({

    data:          triplesec.Buffer.from(data.value),
    key:           triplesec.Buffer.from(key),
    progress_hook: function (obj) { 
      result_enc.value = "...";
    }

  }, function(err, buff) {

    if (! err) {
      var ciphertext = buff.toString('hex');
      // Wrap at 80 characers
      ciphertext = ciphertext.replace(/(.{80})/g, "$1\n");

      let header = `==::encrypted::user::${user.value}::==`.padEnd(80,"=") + "\n";
      let footer = "\n==::end::=======================================================================";

      result_enc.value = header + ciphertext + footer;
    }

  });
}




// Detect OS Version - helps with keys
let os = 'Unkown';
let meta_key = "&#8984";

if (navigator.appVersion.indexOf('Win') != -1)    {os = 'Windows'; meta_key = 'Windows Key'; }
if (navigator.appVersion.indexOf('Mac') != -1)    {os = 'MacOS'; meta_key = '&#8984;'; }
if (navigator.appVersion.indexOf('X11') != -1)    {os = 'UNIX'; meta_key = 'Meta Key'; }
if (navigator.appVersion.indexOf('Linux') != -1)  {os = 'Linux'; meta_key = 'Meta Key'; }

document.getElementById('mkey').innerHTML = meta_key;

