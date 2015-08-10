function select(elems) {
  if (Array.isArray(elems) || elems.jquery) {
    if (!elems.jquery) {
      elems = $(elems);
    }

    $('.selected').removeClass('selected');
    elems.addClass('selected');
  }
}

function run(id) {
  var elem = document.getElementById(id);

  if (elem && elem.value) {
    select(eval(elem.value));
  }
}

document.addEventListener('click', function(event) {
  var tagName = event.target.tagName.toLowerCase();

  if (event.target.dataset.target) {
    run(event.target.dataset.target);
  }
});

document.addEventListener('keypress', function(event) {
  var elem = event.target;

  if (event.keyCode == 13 && elem.value) {
    select(eval(elem.value));
  }
});