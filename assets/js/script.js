//ヘッダーの開閉とアイコンの切り替え(スマホ表示)

const drawerButton = document.querySelector(".js-drawerButton");
const headerNav = document.querySelector(".js-headerNav");

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

//worksセクションモダール

let savedScrollY = 0;

//開くとき
const projectCards = document.querySelectorAll(".js-projectCard");
projectCards.forEach(function (projectCard) {
	projectCard.addEventListener("click", function (e) {
		e.preventDefault();
		const overLay = document.getElementById("js-overlay");
		const modal = projectCard.parentElement.querySelector(".js-modal");

		savedScrollY = window.scrollY || document.documentElement.scrollTop;
		document.documentElement.style.setProperty("--scroll-y", `${-scrollY}px`);

		modal.classList.add("is-open");
		overLay.classList.add("is-active");
		document.body.classList.add("u-noScroll");
	});
});

//閉じるとき
const closeModals = document.querySelectorAll(".js-closeModal");
closeModals.forEach(function (closeModal) {
	closeModal.addEventListener("click", function (e) {
		e.preventDefault();
		const overLay = document.getElementById("js-overlay");
		const modal = document.querySelector(".js-modal.is-open");

		modal.classList.remove("is-open");
		overLay.classList.remove("is-active");
		document.body.classList.remove("u-noScroll");
		window.scrollTo({
			top: savedScrollY,
			behavior: "instant", //元の位置にスクロールしないで戻るにはinstant
		});
	});
});
