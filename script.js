document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     ELEMENTS
  ===================================== */

  const pageOne = document.getElementById("pageOne");
  const pageTwo = document.getElementById("pageTwo");

  const opening = document.getElementById("opening");
  const firstMessage = document.getElementById("firstMessage");

  const oneMoreButton = document.getElementById("oneMoreButton");

  const passwordScreen = document.getElementById("passwordScreen");
  const heartScreen = document.getElementById("heartScreen");
  const finalScreen = document.getElementById("finalScreen");

  const passwordInput = document.getElementById("passwordInput");
  const unlockButton = document.getElementById("unlockButton");
  const passwordError = document.getElementById("passwordError");

  const heartButton = document.getElementById("heartButton");
  const loveReveal = document.getElementById("loveReveal");

  const petalsContainer = document.getElementById("petals");


  /* =====================================
     CREATE FLOATING PETALS
  ===================================== */

  function createPetal() {

    const petal = document.createElement("span");

    petal.className = "petal";

    petal.style.left = Math.random() * 100 + "vw";

    petal.style.setProperty(
      "--drift",
      (Math.random() * 160 - 80) + "px"
    );

    petal.style.animationDuration =
      (8 + Math.random() * 8) + "s";

    petal.style.animationDelay =
      (Math.random() * 2) + "s";

    petal.style.opacity =
      (0.25 + Math.random() * 0.45);

    petalsContainer.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 18000);
  }

  for (let i = 0; i < 7; i++) {
    setTimeout(createPetal, i * 700);
  }

  setInterval(createPetal, 1600);


  /* =====================================
     OPENING → MESSAGE
  ===================================== */

  setTimeout(() => {

    opening.classList.add("fade-away");

    setTimeout(() => {

      opening.classList.add("hidden");

      firstMessage.classList.remove("hidden");

      requestAnimationFrame(() => {
        firstMessage.classList.add("show");
      });

    }, 1200);

  }, 3900);


  /* =====================================
     PAGE 1 → PAGE 2
  ===================================== */

  oneMoreButton.addEventListener("click", () => {

    firstMessage.style.transition =
      "opacity .8s ease, transform .8s ease";

    firstMessage.style.opacity = "0";
    firstMessage.style.transform = "translateY(-20px)";

    setTimeout(() => {

      pageOne.classList.remove("active");
      pageOne.style.display = "none";

      pageTwo.classList.add("active");

      window.scrollTo({
        top: 0,
        behavior: "instant"
      });

    }, 750);

  });


  /* =====================================
     PASSWORD
  ===================================== */

  function unlock() {

    const password = passwordInput.value.trim();

    if (password === "0606") {

      passwordError.textContent = "";

      passwordScreen.style.transition =
        "opacity .8s ease, transform .8s ease";

      passwordScreen.style.opacity = "0";
      passwordScreen.style.transform = "translateY(-15px)";

      setTimeout(() => {

        passwordScreen.classList.add("hidden");

        heartScreen.classList.remove("hidden");

      }, 800);

    } else {

      passwordError.textContent =
        "Not quite… try again. 🤍";

      passwordInput.value = "";

      passwordInput.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(6px)" },
          { transform: "translateX(-4px)" },
          { transform: "translateX(0)" }
        ],
        {
          duration: 350
        }
      );

      passwordInput.focus();
    }
  }


  unlockButton.addEventListener("click", unlock);


  passwordInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
      unlock();
    }

  });


  /* =====================================
     HEART → FINAL
  ===================================== */

  heartButton.addEventListener("click", () => {

    heartButton.style.pointerEvents = "none";

    const heart = heartButton.querySelector(".heart");

    heart.style.animation = "none";

    heart.style.transition =
      "transform .7s ease, opacity .7s ease";

    heart.style.transform = "scale(1.45)";
    heart.style.opacity = "0";

    setTimeout(() => {

      heartScreen.style.transition =
        "opacity .8s ease";

      heartScreen.style.opacity = "0";

      setTimeout(() => {

        heartScreen.classList.add("hidden");

        finalScreen.classList.remove("hidden");

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        /*
          The final "I LOVE YOU." is deliberately
          revealed several seconds after
          "Will you be mine?" and the signature.
        */

        setTimeout(() => {
          loveReveal.classList.add("reveal");
        }, 100);

      }, 800);

    }, 700);

  });


  /* =====================================
     PREVENT ACCIDENTAL FORM BEHAVIOUR
  ===================================== */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Enter" &&
      document.activeElement === passwordInput
    ) {
      event.preventDefault();
    }

  });

});
