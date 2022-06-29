let data = document.getElementById('data');

let user = document.getElementById('user')

let pass = document.getElementById('pass');
let pass_confirm = document.getElementById('pass_confirm');

let ciphermode = document.getElementById('ciphermode');
let result_enc = document.getElementById('result_enc');
let result_dec = document.getElementById('result_dec');

let button = document.getElementById('encode_decode');
button.addEventListener('click', function () { crypt(); }, false);

function crypt () {
  console.log('Crypt() accessed');

  var d = (data.value).replace("'", "\'");
  result_enc.value="";
  result_dec.value="";

  if(user.value === "") return;
  if(pass.value === "") return;
  let key = String(user.value) + String(pass.value);

  triplesec.decrypt ({

    data:          triplesec.Buffer.from(data.value, "hex"),
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
      result_enc.value = ciphertext;
    }

  });

}
