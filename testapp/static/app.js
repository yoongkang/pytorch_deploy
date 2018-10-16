const addTextAreaCallback = (textArea, callback, delay) => {
  var timer = null;
  var func = function(e) {
      if (timer) {
          window.clearTimeout(timer);
      }
      timer = window.setTimeout( function() {
          callback(e.target.value);
      }, delay );
  };
  textArea.oninput = func
  textArea = null;
}

const predict = (text) => {
  const preview = document.getElementById("id_preview")
  preview.innerText = 'Loading...';
  fetch(`/predict/?text=${encodeURI(text)}`, {
    method: "GET",
  })
  .then(response => response.json())
  .then(body => {
    let data = body.data;
    preview.innerText = "";
    data.sort((a, b)=> a.order - b.order)
        .forEach(d => {
            let par = document.createElement("P")
            par.append(document.createTextNode(d.text))
            preview.append(par);
        });
  });
}



document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementsByTagName('textarea')[0];
  addTextAreaCallback(textarea, predict, 1000);
})