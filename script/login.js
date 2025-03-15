document.getElementById("submit").addEventListener('click', (event) => {
    event.preventDefault();
    const userName = document.getElementById("userName").value;
    const password = parseInt(document.getElementById("password").value);
    if (userName == "") {
        alert("Please Tell your name first");
    }
    else if (password == '' || password !== 123456) {
        alert("Wrong Password Contact admin to get your Login Code");
    }
    else {
        document.getElementById("header").classList.remove('hidden');
        document.getElementById("vocabulari-section").classList.remove("hidden");
        document.getElementById("faq-section").classList.remove("hidden");
        document.getElementById("faq-section").classList.remove("hidden");
        document.getElementById("heroSection").classList.add("hidden");

        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
        });

    }


})