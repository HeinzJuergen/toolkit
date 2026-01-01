$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('ref') === 'legacy') {
        alert("Du hast einen veralteten Link verwendet.\n\nBitte aktualisiere dein Lesezeichen mit der neuen URL.");
    }
});