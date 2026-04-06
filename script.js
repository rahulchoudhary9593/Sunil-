// ==========================================
        // GOOGLE FORM SUBMIT LOGIC 
        // ==========================================
        const form = document.getElementById('rsvpForm');
        const submitBtn = document.getElementById('submitBtn');

        form.addEventListener('submit', (e) => {
            // Page ko refresh hone se rokne ke liye
            e.preventDefault();

            // Google Form ka formResponse URL
            const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfOYS6sNbWqdWymc_n42CH0DP5bjJq--0u4aBZPMeXnJls2Rw/formResponse';
            
            // Aapke link se nikale gaye asli Entry IDs
            const ENTRY_NAME = 'entry.2055905557'; 
            const ENTRY_GUESTS = 'entry.958416789'; 
            const ENTRY_ATTENDANCE = 'entry.1388709524'; 

            // Form se value nikalna
            const name = document.getElementById('nameInput').value;
            const guests = document.getElementById('guestsInput').value;
            const attendance = document.querySelector('input[name="attendance"]:checked').value;

            // Google Form ke format mein data pack karna
            const formData = new URLSearchParams();
            formData.append(ENTRY_NAME, name);
            formData.append(ENTRY_GUESTS, guests);
            formData.append(ENTRY_ATTENDANCE, attendance);

            // Button par "Sending..." dikhana
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            // Data ko silently Google ko bhejna (AJAX)
            fetch(GOOGLE_FORM_URL, {
                method: 'POST',
                mode: 'no-cors', 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            }).then(() => {
                // Success hone par form gayab aur Thank You message show
                gsap.to(form, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    onComplete: () => {
                        form.style.display = 'none';
                        const success = document.getElementById('rsvpSuccess');
                        success.classList.remove('hidden');
                        gsap.fromTo(".success-icon",
                            { scale: 0, rotation: -180 },
                            { scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" }
                        );
                    }
                });
            }).catch(error => {
                console.error('Error!', error);
                submitBtn.innerHTML = 'ERROR! TRY AGAIN';
                submitBtn.disabled = false;
            });
        });

