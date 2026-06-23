// src/email-helper.js
if (typeof window !== 'undefined') {
  window.addEventListener('submit', async (event) => {
    // Form ko dhoondhna jo booking ka hai
    const form = event.target;
    
    // Check karna ki kya ye wahi booking form hai (inputs ke naam se)
    const nameInput = form.querySelector('input[type="text"]');
    const phoneInput = form.querySelector('input[type="tel"]');
    
    if (nameInput && phoneInput) {
      // Form ka data nikalna
      const formData = {
        name: nameInput.value,
        phone: phoneInput.value,
        room_type: form.querySelector('select')?.value || 'Not Specified',
        date: form.querySelector('input[type="date"]')?.value || 'Not Specified',
        guests: form.querySelector('input[type="number"]')?.value || 'Not Specified'
      };

      try {
        // Aapke email API ko background mein call karna
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        console.log('Notification email triggered successfully.');
      } catch (error) {
        console.error('Email error:', error);
      }
    }
  });
}
