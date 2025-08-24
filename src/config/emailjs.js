// Simple contact form handler - no external dependencies needed
export const sendContactEmail = async (formData) => {
  try {
    // Configurare EmailJS pentru trimiterea reală de email-uri
    const templateParams = {
      to_email: 'contact@prep-center.eu',
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      phone: formData.phone || 'Nu a fost furnizat',
      company: formData.company || 'Nu a fost furnizat'
    };
     // Folosim fetch pentru a trimite email-ul prin serviciul tău de email
    const response = await fetch('https://formspree.io/f/xpznvqko', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
        phone: formData.phone,
        _replyto: formData.email,
        _subject: `Mesaj nou de la ${formData.name} - Prep Center France`
      })
    });

    if (response.ok) {
      return { 
        success: true, 
        message: 'Mesajul a fost trimis cu succes! Vă vom contacta în curând prin WhatsApp sau email.' 
      };
    } else {
      throw new Error('Eroare la trimiterea email-ului');
    }
 } catch (error) {
    console.error('EmailJS Error:', error);
    return { 
      success: false, 
       error: 'Eroare la trimiterea mesajului. Vă rugăm să ne contactați direct pe WhatsApp: +33 6 75 11 62 18' 
   };
  }
};