function select(elems) {
  if (Array.isArray(elems)) {
    // Toggle off 'selected' class
    [].forEach.call(document.querySelectorAll('.selected'), function(elem) {
      elem.classList.remove('selected');
    });

    elems.forEach(function(elem) {
      elem.classList.add('selected');
    });
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