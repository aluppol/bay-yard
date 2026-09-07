(function () {
  var MINIMUM_HUMAN_SECONDS = 3;
  var MAXIMUM_PHOTO_BYTES = 10 * 1024 * 1024;

  var PROBLEMS = {
    name: 'Add your name, so we know who to reply to.',
    email: 'Add an email address, so we can send the estimate.',
    city: 'Tell us the city, so we know whether it is in range.',
    service: 'Pick the closest option — "Not sure yet" is fine.',
    details: 'Describe what the system is doing, even in one line.'
  };

  function elapsedSeconds(form) {
    var started = Number(form.querySelector('[data-timing-field]').value);
    return started ? (Date.now() - started) / 1000 : 0;
  }

  function isSubmissionHuman(form) {
    var honeypot = form.querySelector('[name="_honey"]');
    return !honeypot.value && elapsedSeconds(form) >= MINIMUM_HUMAN_SECONDS;
  }

  function isPhotoTooLarge(field) {
    return Boolean(field.files[0]) && field.files[0].size > MAXIMUM_PHOTO_BYTES;
  }

  function describeProblem(field) {
    if (field.type === 'file') {
      return isPhotoTooLarge(field)
        ? 'That photo is over 10 MB and would be rejected. Send a smaller one, or email it instead.'
        : '';
    }
    if (!field.required) return '';
    if (!field.value.trim()) return PROBLEMS[field.name];
    if (field.type === 'email' && !field.checkValidity()) {
      return 'That address is missing an @ or a domain name.';
    }
    return '';
  }

  function invalidFields(form) {
    return Array.prototype.filter.call(form.elements, function (field) {
      return describeProblem(field) !== '';
    });
  }

  function clearProblem(field) {
    if (!field.id) return;
    var message = document.getElementById(field.id + '-problem');
    if (message) message.remove();
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  }

  function showProblem(field) {
    var message = document.createElement('p');
    message.className = 'field-error';
    message.id = field.id + '-problem';
    message.textContent = describeProblem(field);
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', message.id);
    field.parentNode.appendChild(message);
  }

  function clearAllProblems(form) {
    Array.prototype.forEach.call(form.elements, clearProblem);
  }

  function showProblems(fields) {
    fields.forEach(showProblem);
  }

  function handleSubmit(event) {
    var form = event.currentTarget;
    if (!isSubmissionHuman(form)) {
      event.preventDefault();
      return;
    }
    clearAllProblems(form);
    var invalid = invalidFields(form);
    if (!invalid.length) return;
    event.preventDefault();
    showProblems(invalid);
    invalid[0].focus();
  }

  function startForm(form) {
    form.noValidate = true;
    form.querySelector('[data-timing-field]').value = String(Date.now());
    form.addEventListener('submit', handleSubmit);
  }

  var estimateForm = document.querySelector('[data-estimate-form]');
  if (estimateForm) startForm(estimateForm);
}());
