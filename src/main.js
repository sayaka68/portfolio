import "./styles/style.scss";

//ヘッダーの開閉とアイコンの切り替え(スマホ表示)

const drawerButton = document.querySelector(".js-drawerButton");
const headerNav = document.querySelector(".js-headerNav");

if (drawerButton && headerNav) {
  drawerButton.addEventListener("click", function () {
    if (headerNav.classList.contains("is-open")) {
      headerNav.classList.remove("is-open");
      document.body.classList.remove("noScroll");
      drawerButton.classList.remove("is-checked");
    } else {
      headerNav.classList.add("is-open");
      document.body.classList.add("noScroll");
      drawerButton.classList.add("is-checked");
    }
  });
}

//ヘッダー内リンククリックでメニューを閉じる(スマホ表示)
const headerLinks = document.querySelectorAll(".js-headerLink");
headerLinks.forEach(function (headerLink) {
  headerLink.addEventListener("click", function () {
    if (headerNav.classList.contains("is-open")) {
      headerNav.classList.remove("is-open");
      document.body.classList.remove("noScroll");
      drawerButton.classList.remove("is-checked");
    }
  });
});

//スクロールしたらヘッダーに背景色をつける
window.addEventListener("scroll", function () {
  const header = document.querySelector(".js-header");
  let scrollY = window.scrollY || document.documentElement.scrollTop;

  if (scrollY > 100) {
    header.classList.add("bgWhite");
  } else {
    header.classList.remove("bgWhite");
  }
});

//worksセクション迄来たらmvの背景画像を非表示にする。じゃないとaboutでまた見えちゃう。
window.addEventListener("scroll", function () {
  const mv = document.querySelector(".l-mv");
  const rectMv = mv.getBoundingClientRect();

  if (rectMv.height < scrollY) {
    mv.classList.add("bgDisplayNone"); // 背景画像非表示
  } else {
    mv.classList.remove("bgDisplayNone"); // 背景画像表示
  }
});

//footer copyright 年数自動更新
document.getElementById("year").textContent = new Date().getFullYear();

//worksセクションモダール

// //開くとき
// const projectCards = document.querySelectorAll(".js-projectCard");
// projectCards.forEach(function (projectCard) {
//   projectCard.addEventListener("click", function (e) {
//     e.preventDefault();
//     const overLay = document.getElementById("js-overlay");
//     const modal = projectCard.parentElement.querySelector(".js-modal");

//     savedScrollY = window.scrollY || document.documentElement.scrollTop;
//     document.documentElement.style.setProperty("--scroll-y", `${-scrollY}px`);

//     modal.classList.add("is-open");
//     overLay.classList.add("is-active");
//     document.body.classList.add("u-noScroll");
//   });
// });

// // //閉じるとき
// const closeModals = document.querySelectorAll(".js-closeModal");
// closeModals.forEach(function (closeModal) {
//   closeModal.addEventListener("click", function (e) {
//     e.preventDefault();
//     const overLay = document.getElementById("js-overlay");
//     const modal = document.querySelector(".js-modal.is-open");

//     modal.classList.remove("is-open");
//     overLay.classList.remove("is-active");
//     document.body.classList.remove("u-noScroll");
//     window.scrollTo({
//       top: savedScrollY,
//       behavior: "instant", //元の位置にスクロールしないで戻るにはinstant
//     });
//   });
// });

// Affichage de la liste des projets en JS de manière dynamique
//制作物一覧をJSで表示

import { projects } from "./projects";

function renderProjectList() {
  const works = document.getElementById("works");
  works.innerHTML = `
    <div class="l-inner">
      <h3 class="c-sectionTitle">Réalisations</h3>
      <div class="l-works__body">
        <div class="l-works__projects projectListArea"></div>
        <div class="viewMoreButtonArea" ></div>
      </div>
    </div>
   
  `;

  // 新しい物から表示されるように、projects のコピーを作って id の大きい順にソート
  const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

  // 先頭4件だけ取り出す
  const latestProjects = sortedProjects.slice(0, 4);

  const displayProject = location.pathname.includes("index.html")
    ? latestProjects
    : sortedProjects;

  displayProject.forEach((project) => {
    const projectEl = createProject(project);
    const projectListArea = works.querySelector(".projectListArea");
    projectListArea.appendChild(projectEl);
  });

  let button;

  if (location.pathname.includes("works.html")) {
    button = createBtnReturn();
  } else {
    button = createBtnViewMore();
  }
  // const button = createBtnViewMore();
  works.querySelector(".viewMoreButtonArea").appendChild(button);
}

renderProjectList();

function createProject(project) {
  const projectEl = document.createElement("div");
  projectEl.dataset.id = `${project.id}`;

  projectEl.className = "p-project";
  projectEl.innerHTML = ``;

  const card = createProjectCard(project);
  const modal = createProjectModal(project);
  projectEl.append(card, modal);

  return projectEl;
}

function createProjectCard(project) {
  const projectCard = document.createElement("button");
  projectCard.className = "c-projectCard js-projectCard";

  const stack = [...project.langues, ...project.tools].join(" / ");

  projectCard.innerHTML = `
    <figure class="c-projectCard__img">
      <img
        src="${project.image}"
        alt="maquette d'un site web"
      />
    </figure>
    <div class="c-projectCard__body">
      <p class="c-projectCard__title">
        ${project.name}
      </p>
      <p class="c-projectCard__text">
       ${stack}
      </p>
    </div>
  `;

  projectCard.addEventListener("click", () => {
    const targetModal = projectCard.nextElementSibling;
    targetModal.classList.add("is-open");
    toggleOverlay();
    toggleModalScroll();
  });
  return projectCard;
}

function createBtnViewMore() {
  const button = document.createElement("a");
  button.className = "l-works__button c-buttonPrimary";
  button.setAttribute("href", "./works.html");
  button.textContent = "voir plus";
  return button;
}

function createBtnReturn() {
  const button = document.createElement("a");
  button.className = "l-works__button c-buttonPrimary";
  button.setAttribute("href", "./index.html");
  button.textContent = "retourner à la page d'acuille";
  return button;
}

function toggleOverlay() {
  const overLay = document.getElementById("js-overlay");
  if (overLay.classList.contains("is-active")) {
    overLay.classList.remove("is-active");
  } else {
    overLay.classList.add("is-active");
  }
}

let savedScrollY = 0;

function toggleModalScroll() {
  const body = document.body;
  const isModalOpen = body.classList.contains("u-noScroll");

  if (isModalOpen) {
    // Fermer la modale : retour à la position de scroll
    // モーダルを閉じる：スクロール位置復元
    body.classList.remove("u-noScroll");
    body.style.position = "";
    body.style.top = "";
    window.scrollTo({
      left: 0,
      top: savedScrollY,
      behavior: "instant",
    });
    console.log(savedScrollY);
  } else {
    // Ouvrir la modale : sauvegarde du scroll et blocage de l'écran
    // モーダルを開く：現在のスクロール位置を保存して画面を固定
    savedScrollY = window.scrollY;
    body.classList.add("u-noScroll");
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.width = "100%";
  }
}

function createProjectModal(project) {
  const pModal = document.createElement("div");
  pModal.className = "p-projectModal js-modal";
  pModal.dataset.id = `${project.id}`;

  pModal.innerHTML = `
    <h4 class="p-projectModal__title">${project.name}</h4>
    <button
      class="p-projectModal__closeButton js-closeModal"
    ></button>
    <figure class="p-projectModal__img">
      <img src="${project.image}" alt="maquette d'un site web" />
    </figure>
    <div class="p-projectModal__body">
      <p class="p-projectModal__description">
        ${project.description}
      </p>
      <div class="p-projectModal__detail">
        <ul class="p-projectModal__list">
          <li class="p-projectModal__item">
            <span class="p-projectModal__head"
              >langages et technologies:</span
            >
            <span class="p-projectModal__data"
              >${project.langues}</span
            >
          </li>
          <li class="p-projectModal__item">
            <span class="p-projectModal__head">outils:</span>
            <span class="p-projectModal__data">${project.tools}</span>
          </li>
        </ul>
      </div>
     
      ${
        project.url
          ? `
        <a
        class="p-projectModal__button c-buttonPrimary --sm"
        href=${project.url}
        target="_blank"
        >voir le site</a
        >
       
      `
          : ""
      }
      ${
        project.password
          ? `
         <p class="p-projectModal__id">ID: sayaka / password: ${project.password}</p>`
          : ""
      }
     
      
    </div>
  `;
  return pModal;
}

//閉じるとき
const closeModals = document.querySelectorAll(".js-closeModal");
closeModals.forEach(function (closeModal) {
  closeModal.addEventListener("click", function (e) {
    e.preventDefault();
    const modal = document.querySelector(".js-modal.is-open");
    modal.classList.remove("is-open");

    toggleModalScroll();
    toggleOverlay();
  });
});
