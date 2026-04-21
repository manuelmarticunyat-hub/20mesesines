const appContent = {
  memories: [
    {
      image: "./photos/recuerdos/primera-cita.jpg",
      title: "Esa primera cita",
    },
    {
      images: [
        "./photos/recuerdos/campamentos-01.jpg",
        "./photos/recuerdos/campamentos-02.jpg",
        "./photos/recuerdos/campamentos-03.jpg",
      ],
      title: "Esos campamentos",
    },
    {
      images: [
        "./photos/recuerdos/puig-01.jpg",
        "./photos/recuerdos/puig-02.jpg",
        "./photos/recuerdos/puig-03.jpg",
      ],
      title: "Esos momentos en El Puig",
    },
    {
      images: [
        "./photos/recuerdos/comiditas-01.jpg",
        "./photos/recuerdos/comiditas-02.jpg",
        "./photos/recuerdos/comiditas-03.jpg",
      ],
      title: "Esas comiditas juntos",
    },
    {
      image: "./photos/recuerdos/primer-concierto.jpg",
      title: "Ese primer concierto",
    },
    {
      images: [
        "./photos/recuerdos/escapadas-01.jpg",
        "./photos/recuerdos/escapadas-02.jpg",
      ],
      title: "Esas escapadas",
    },
    {
      image: "./photos/recuerdos/compras-juntos.jpg",
      title: "Esas compras juntos",
    },
    {
      images: [
        "./photos/recuerdos/abrazos-calidos-01.jpg",
        "./photos/recuerdos/abrazos-calidos-02.jpg",
        "./photos/recuerdos/abrazos-calidos-03.jpg",
        "./photos/recuerdos/abrazos-calidos-04.jpg",
      ],
      title: "Esos abrazos calidos",
    },
  ],
  future: [
    {
      image: "./photos/futuro/bilbao-verano-2026.jpg",
      title: "Bilbao Verano 2026",
    },
    {
      image: "./photos/futuro/campamentos-2026-2027-2028.jpg",
      title: "Campamento 2026, 2027, 2028...",
    },
    {
      image: "./photos/futuro/miles-de-rutas.jpg",
      title: "Miles de rutas",
    },
    {
      image: "./photos/futuro/noches-de-cena-cocktails.jpg",
      title: "Noches de cena y cocktails",
    },
    {
      image: "./photos/futuro/pelis-y-series.jpg",
      title: "Por muchas pelis y series",
    },
    {
      image: "./photos/futuro/viajes-inolvidables.jpg",
      title: "Viajes inolvidables",
    },
    {
      image: "./photos/futuro/nuestra-boda.jpg",
      title: "Nuestra boda 20??",
    },
    {
      image: "./photos/futuro/luna-de-miel.jpg",
      title: "Nuestra luna de miel",
    },
  ],
};

const screens = [...document.querySelectorAll(".screen")];
const nextButtons = [...document.querySelectorAll(".next-button")];
const memoriesGrid = document.getElementById("memories-grid");
const futureGrid = document.getElementById("future-grid");
const evasiveButton = document.getElementById("evasive-button");
const evasiveArea = document.getElementById("evasive-area");

let activeScreenIndex = 0;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderPolaroids(items, target) {
  const cards = items
    .map((item) => {
      const safeTitle = escapeHtml(item.title);
      const images = item.images ?? [item.image];
      const frameClass =
        images.length > 1 ? "polaroid-frame polaroid-frame-grid" : "polaroid-frame";
      const media = images
        .map((image, index) => {
          const safeImage = escapeHtml(image);
          return `
            <div class="polaroid-media-slot polaroid-media-slot-${images.length}">
              <img
                src="${safeImage}"
                alt="${safeTitle} ${index + 1}"
                loading="lazy"
                onerror="this.replaceWith(createPlaceholder(${JSON.stringify(
                  `${safeTitle} ${index + 1}`
                )}))"
              />
            </div>
          `;
        })
        .join("");

      return `
        <article class="polaroid">
          <div class="${frameClass}">
            ${media}
          </div>
          <p class="polaroid-title">${safeTitle}</p>
        </article>
      `;
    })
    .join("");

  target.innerHTML = cards;
}

function createPlaceholder(title) {
  const note = document.createElement("div");
  note.className = "placeholder-note";
  note.innerHTML = `Pon aqui tu foto<br />${escapeHtml(title)}`;
  return note;
}

window.createPlaceholder = createPlaceholder;

function showScreen(index) {
  screens.forEach((screen, screenIndex) => {
    screen.classList.toggle("screen-active", screenIndex === index);
  });

  activeScreenIndex = index;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goNext() {
  if (activeScreenIndex < screens.length - 1) {
    showScreen(activeScreenIndex + 1);
  }
}

nextButtons.forEach((button) => {
  button.addEventListener("click", goNext);
});

function randomPositionWithin(container, element) {
  const padding = 10;
  const maxX = Math.max(
    padding,
    container.clientWidth - element.offsetWidth - padding
  );
  const maxY = Math.max(
    padding,
    container.clientHeight - element.offsetHeight - padding
  );

  const left = Math.floor(Math.random() * maxX);
  const top = Math.floor(Math.random() * maxY);

  return { left, top };
}

function moveEvasiveButton() {
  const { left, top } = randomPositionWithin(evasiveArea, evasiveButton);
  evasiveButton.style.left = `${left}px`;
  evasiveButton.style.top = `${top}px`;
  evasiveButton.style.transform = "none";
}

["pointerenter", "pointerdown", "touchstart", "mouseover"].forEach((event) => {
  evasiveButton.addEventListener(event, moveEvasiveButton);
});

window.addEventListener("resize", () => {
  if (activeScreenIndex === 4) {
    moveEvasiveButton();
  }
});

renderPolaroids(appContent.memories, memoriesGrid);
renderPolaroids(appContent.future, futureGrid);
