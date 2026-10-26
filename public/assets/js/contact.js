/* ─────────────────────────────────────────────────────────────────────────────
   FRENCH TOAST — Contact Form Validation
   ─────────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  const form       = document.getElementById('contact-form');
  const statusBox  = document.getElementById('form-status');

  if (!form) return;

  function setError(fieldId, message) {
    const group = document.getElementById(fieldId)?.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    const errEl = group.querySelector('.form-error');
    if (errEl) errEl.textContent = message;
  }

  function clearError(fieldId) {
    const group = document.getElementById(fieldId)?.closest('.form-group');
    if (!group) return;
    group.classList.remove('has-error');
  }

  function validateField(id, value, label) {
    if (!value) {
      setError(id, `${label} is required.`);
      return false;
    }
    clearError(id);
    return true;
  }

  function validateEmail(id, value) {
    if (!value) {
      setError(id, 'Email address is required.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError(id, 'Please enter a valid email address.');
      return false;
    }
    clearError(id);
    return true;
  }

  // Live validation
  form.querySelectorAll('.form-input, .form-textarea').forEach(field => {
    field.addEventListener('blur', () => {
      const id    = field.id;
      const value = field.value.trim();
      if (id === 'email') {
        validateEmail(id, value);
      } else {
        validateField(id, value, field.getAttribute('aria-label') || id);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    const nameOk    = validateField('name', name, 'Name');
    const emailOk   = validateEmail('email', email);
    const messageOk = validateField('message', message, 'Message');

    if (!nameOk || !emailOk || !messageOk) return;

    // Show loading
    const submitBtn = form.querySelector('[type="submit"]');
    const origText  = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    statusBox.className = 'form-status';

    try {
      const res = await fetch('https://formspree.io/f/xnppjeeb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();

      if (res.ok) {
        statusBox.textContent = 'Thank you! Your message has been sent. We\'ll get back to you soon.';
        statusBox.className   = 'form-status success';
        form.reset();
      } else {
        // Formspree returns field-level errors in data.errors
        const detail = data.errors?.map(e => e.message).join(' ') || 'Something went wrong.';
        statusBox.textContent = detail + ' Or call us on 0484 202 5618.';
        statusBox.className   = 'form-status error';
      }
    } catch {
      statusBox.textContent = 'Something went wrong. Please try calling us on 0484 202 5618.';
      statusBox.className   = 'form-status error';
    }
    submitBtn.textContent = origText;
    submitBtn.disabled    = false;
    statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

})();
