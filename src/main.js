import "./styles/style.scss";

/* ================================================================================
# FOUC対策と初回アクセス時のみローディング画面表示
================================================================================ */

if (location.pathname === "/" || location.pathname === "/index.html") {
  window.addEventListener("load", () => {
    const isFirstLoad = sessionStorage.getItem("isFirstLoad");

    const bodyVisible = function () {
      document.body.classList.remove("hidden");
    };
    const removeSpinner = function () {
      document.querySelector(".c-loader__box").classList.add("is-remove");
    };
    const removeLoading = function () {
      document.querySelector(".c-loader").classList.add("is-remove");
    };
    const bodyOverflow = function () {
      document.body.style.overflow = "visible";
    };

    if (!isFirstLoad) {
      setTimeout(bodyVisible, 1000);
      setTimeout(removeSpinner, 2500);
      setTimeout(removeLoading, 2700);
      setTimeout(bodyOverflow, 2900);

      sessionStorage.setItem("isFirstLoad", true);
    } else {
      console.log("2回目");
      removeSpinner();
      removeLoading();
      setTimeout(bodyVisible, 1000);
      setTimeout(bodyOverflow, 1000);
    }
  });
} else {
  window.addEventListener("load", () => {
    console.log("ホーム以外");
    const visible = function () {
      document.body.classList.remove("hidden");
      document.body.style.overflow = "visible";
    };

    setTimeout(visible, 1000);
  });
}

//クッキーへの同意バナーを出し、選んでもらう
document.addEventListener("DOMContentLoaded", () => {
  const consent = localStorage.getItem("cookie_consent");
  if (!consent) {
    showConsentBanner();
  } else if (consent === "accepted") {
    loadGA4();
  }
});

function showConsentBanner() {
  const lang = document.documentElement.lang || "fr";
  const texts = {
    fr: {
      mainText:
        "Ce site utilise des cookies à des fins d’analyse. Acceptez-vous l’utilisation de ces cookies ?",
      btnAgree: "Accepter",
      btnReject: "Refuser",
      more: "En savoir plus",
      detail:
        "Ce site utilise Google Analytics 4 pour collecter des données anonymes sur la fréquentation. Ces informations nous aident à améliorer le contenu du site. Aucune donnée personnelle n’est enregistrée ni partagée avec des tiers.",
      detailTitle: "Utilisation des cookies",
      btnClose: "fermer",
    },
    ja: {
      mainText:
        "このサイトでは分析目的でクッキーを使用しています。使用に同意しますか？",
      btnAgree: "同意する",
      btnReject: "拒否する",
      more: "詳しく見る",
      detail:
        "このサイトは匿名のアクセスデータを収集するためにGoogle Analytics 4を使用しています。これらの情報はサイト内容の改善に役立てられ、個人情報は記録されません。",
      detailTitle: "クッキーの使用に関して",
      btnClose: "閉じる",
    },
  };
  const banner = document.createElement("div");
  banner.className = "c-cookieBanner";
  banner.innerHTML = `
    <p>${texts[lang].mainText}</p>
    <button id="accept">${texts[lang].btnAgree}</button>
    <button id="reject">${texts[lang].btnReject}</button>
    <button id="detail">${texts[lang].more}</button>
  `;
  document.body.appendChild(banner);

  const cookieModal = document.createElement("div");
  cookieModal.className = "c-cookieModal";
  cookieModal.innerHTML = `
  <h1>${texts[lang].detailTitle}</h1>
  <p>${texts[lang].detail}</p>
  <button class="c-buttonPrimary --sm" id="closeCookieModal">${texts[lang].btnClose}</button>
  `;
  document.body.appendChild(cookieModal);

  document.getElementById("accept").addEventListener("click", () => {
    localStorage.setItem("cookie_consent", "accepted");
    loadGA4();
    banner.remove();
  });

  document.getElementById("reject").addEventListener("click", () => {
    localStorage.setItem("cookie_consent", "rejected");
    banner.remove();
  });

  document.getElementById("detail").addEventListener("click", () => {
    toggleOverlay();
    toggleModalScroll();
    cookieModal.classList.add("is-open");
  });

  document.getElementById("closeCookieModal").addEventListener("click", () => {
    toggleOverlay();
    toggleModalScroll();
    cookieModal.classList.remove("is-open");
  });
}

function loadGA4() {
  if (document.getElementById("ga4-script")) return; // 二重読み込み防止。すでにあるなら何もしない。
  const script = document.createElement("script");
  script.id = "ga4-script";
  script.src = "/ga4.js";
  document.body.appendChild(script);
}

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

//mvセクションが画面から消えたら背景画像を非表示にする(index.htmlのみに適用)
const mvSection = document.querySelector(".l-mv");
const mvObserver = new IntersectionObserver((entries) => {
  if (!entries[0].isIntersecting) {
    mvSection.classList.add("bgDisplayNone");
  } else {
    mvSection.classList.remove("bgDisplayNone");
  }
});

if (
  location.pathname === "/" ||
  location.pathname.endsWith("index.html") ||
  location.pathname === "/ja/"
) {
  mvObserver.observe(mvSection);
}

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

/* ================================================================================
# works section 制作物カードの表示
================================================================================ */
import { projects } from "./projects";

// work sectionの大枠を作る
function renderProjectList() {
  const lang = document.documentElement.lang || "fr";
  const text = {
    fr: "Réalisations",
    ja: "Works",
  };
  const works = document.getElementById("works");
  works.innerHTML = `
    <div class="l-inner">
      <h3 class="c-sectionTitle">${text[lang]}</h3>
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

  //index.htmlならlatestProjectsで4件だけ、works.htmlならsortedProjectsを表示させる
  const displayProject =
    location.pathname === "/" || location.pathname.endsWith("index.html")
      ? latestProjects
      : sortedProjects;
  console.log(displayProject);

  displayProject.forEach((project) => {
    const projectEl = createProject(project);
    const projectListArea = works.querySelector(".projectListArea");
    projectListArea.appendChild(projectEl);
  });

  let button;

  if (location.pathname.endsWith("works.html")) {
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
  const lang = document.documentElement.lang || "fr";
  const text = {
    fr: "voir plus",
    ja: "一覧を見る",
  };
  const button = document.createElement("a");
  button.className = "l-works__button c-buttonPrimary";
  button.setAttribute("href", "./works.html");
  button.textContent = text[lang];
  return button;
}

function createBtnReturn() {
  const lang = document.documentElement.lang || "fr";
  const text = {
    fr: "retourner à la page d'acuille",
    ja: "ホームページに戻る",
  };
  const button = document.createElement("a");
  button.className = "l-works__button c-buttonPrimary";
  button.setAttribute("href", "./index.html");
  button.textContent = text[lang];
  return button;
}

function toggleOverlay() {
  const overLay = document.getElementById("js-overlay");
  if (!overLay) return; // 存在しなければ何もしない
  overLay.classList.toggle("is-active");
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
  const lang = document.documentElement.lang || "fr";
  const text = {
    fr: {
      buttonText: "voir le site",
      languesText: "languages",
      toolsText: "outils et technologies",
    },
    ja: {
      buttonText: "サイトを見る",
      languesText: "使用言語",
      toolsText: "ツールと技術",
    },
  };

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
        ${project.description[lang]}
      </p>
      <div class="p-projectModal__detail">
        <ul class="p-projectModal__list">
          <li class="p-projectModal__item">
            <span class="p-projectModal__head"
              >${text[lang].languesText} :</span
            >
            <span class="p-projectModal__data"
              >${project.langues.join(", ")}</span
            >
          </li>
          <li class="p-projectModal__item">
            <span class="p-projectModal__head">${text[lang].toolsText} :</span>
            <span class="p-projectModal__data">${project.tools.join(
              ", "
            )}</span>
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
        >${text[lang].buttonText}</a
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
