const sidebarWidth = getComputedStyle(document.documentElement).getPropertyValue("--width-of-side-panel");

// UI vars
const viewFrame = document.getElementById("main-iframe");

let fileType = document.getElementById("fileTypeText");

let currentHighlightedElement = null;

let currentSectionButtonWrapper = null;

let currentSidebar = null;

const topLeftPanel = document.getElementById("top-left-bar");

const openButton = document.getElementById("open-button");

const textDisplay = document.createElement("div");
textDisplay.classList.add("textBox");
textDisplay.style.display = "none";
document.body.appendChild(textDisplay);

// create section one menu
let sectionOneMenu = createMainDropdownMenu();
sectionOneMenu.id = "section1-sidebar";
sectionOneMenu.appendChild(
    createFolder([
        createIframeChanger("Assignment 1", "https://github-is-not-open-source.github.io/s1a1/"),
        createHTMLListing("index.html", "/s1a1/index.html")
    ], "Assignment 1")
);

sectionOneMenu.appendChild(
    createFolder([
        createIframeChanger("Assignment 2", "https://github-is-not-open-source.github.io/s1a2/"),
        createHTMLListing("index.html", "/s1a2/index.html"),
        createCSSListing("index.css", "/s1a2/index.css")
    ], "Assignment 2")
);

sectionOneMenu.appendChild(
    createFolder([
        createIframeChanger("Final Project", "https://github-is-not-open-source.github.io/s1fp/"),
        createHTMLListing("index.html", "/s1fp/index.html"),
        createCSSListing("index.css", "/s1fp/index.css"),
        createHTMLListing("favorite-games.html", "/s1fp/favorite-games.html"),
        createCSSListing("favorite-games.css", "/s1fp/favorite-games.css"),
        createHTMLListing("games-to-play.html", "/s1fp/games-to-play.html")
    ], "Final Project")
);

// create section two menu
let sectionTwoMenu = createMainDropdownMenu();
sectionTwoMenu.id = "section2-sidebar";
sectionTwoMenu.appendChild(
    createFolder([
        createIframeChanger("Assignment 2", "https://github-is-not-open-source.github.io/s2a2/"),
        createHTMLListing("index.html", "/s2a2/index.html"),
        createCSSListing("index.css", "/s2a2/index.css")
    ], "Assignment 2")
);
sectionTwoMenu.appendChild(
    createFolder([
        createIframeChanger("Final Project", "https://github-is-not-open-source.github.io/s2fp/"),
        createHTMLListing("index.html", "/s2fp/index.html"),
        createCSSListing("style.css", "/s2fp/style.css"),
        createJSListing("sketch.js", "/s2fp/sketch.js")
    ], "Final Project")
);

// create section three menu
let sectionThreeMenu = createMainDropdownMenu();
sectionThreeMenu.id = "section3-sidebar";
sectionThreeMenu.appendChild(
    createFolder([
        createIframeChanger("Assignment 1", "https://github-is-not-open-source.github.io/s3a1/"),
        createHTMLListing("index.html", "/s3a1/index.html"),
        createCSSListing("style.css", "/s3a1/style.css"),
        createJSListing("code.js", "/s3a1/code.js")
    ], "Assignment 1")
);
sectionThreeMenu.appendChild(
    createFolder([
        createIframeChanger("Assignment 2", "https://github-is-not-open-source.github.io/s3a2/"),
        createHTMLListing("index.html", "/s3a1/index.html"),
        createCSSListing("style.css", "/s3a2/style.css"),
        createJSListing("script.js", "/s3a2/script.js")
    ], "Assignment 2")
);

sectionThreeMenu.appendChild(
    createFolder([
        createIframeChanger("Final Project", "https://github-is-not-open-source.github.io/s3fp/"),
        createHTMLListing("index.html", "/s3fp/index.html"),
        createCSSListing("style.css", "/s3fp/style.css"),
        createJSListing("sketch.js", "/s3fp/sketch.js")
    ], "Final Project")
);

// create reading response menu
let responseMenu = createMainDropdownMenu();
responseMenu.id = "reading-response-sidebar";
responseMenu.appendChild(
    createTextListing("Week 2", "week2.txt")
);
responseMenu.appendChild(
    createTextListing("Week 3", "week3.txt")
);
responseMenu.appendChild(
    createTextListing("Week 4", "week4.txt")
);
responseMenu.appendChild(
    createTextListing("Week 5", "week5.txt")
);
responseMenu.appendChild(
    createTextListing("Week 6", "week6.txt")
);
responseMenu.appendChild(
    createTextListing("Week 8", "week8.txt")
);
responseMenu.appendChild(
    createTextListing("Week 9", "week9.txt")
);
responseMenu.appendChild(
    createTextListing("Week 10", "week10.txt")
);
responseMenu.appendChild(
    createTextListing("Week 12", "week12.txt")
);
responseMenu.appendChild(
    createTextListing("Week 13", "week13.txt")
);
responseMenu.appendChild(
    createTextListing("Week 14", "week14.txt")
);
responseMenu.appendChild(
    createTextListing("Week 15", "week15.txt")
);

// add sidebar button listeners
document.getElementById("section1-files").addEventListener("click", (e) => changeSidebar("section1"));
document.getElementById("section2-files").addEventListener("click", (e) => changeSidebar("section2"));
document.getElementById("section3-files").addEventListener("click", (e) => changeSidebar("section3"));
document.getElementById("reading-response-files").addEventListener("click", (e) => changeSidebar("reading-response"));

// make sidebar button hide left sidebar

document.getElementById("left-panel-button").addEventListener("click", toggleSidebar);
changeSidebar("section1");

isVisible = true;

function toggleSidebar() {
    let icon = document.getElementById("left-panel-icon");
    if (isVisible) {
        icon.src = "images/layout-sidebar-left-off.png";
        isVisible = false;
        document.documentElement.style.setProperty("--width-of-side-panel", "0px");
        currentSidebar.style.display = "none";
        topLeftPanel.style.display = "none";
    } else {
        icon.src = "images/layout-sidebar-left.png";
        isVisible = true;
        document.documentElement.style.setProperty("--width-of-side-panel", sidebarWidth);
        currentSidebar.style.removeProperty("display");
        topLeftPanel.style.removeProperty("display");
    }
}


// create text listing
function createTextListing(name, textFileName) {
    let listing = createDropdownListing();
    let icon = document.createElement("img");
    icon.src = "/images/file.png"
    icon.style.height = getComputedStyle(document.documentElement).getPropertyValue("--dropDownMenuTextSize");

    listing.appendChild(icon);
    let textChild = document.createElement("div");
    textChild.textContent = name;
    listing.appendChild(textChild);

    async function clickElement() {
        resetMainView();
        textDisplay.style.removeProperty("display");
        fileType.textContent = "Plain Text";
        textDisplay.textContent = await (await (await fetch("/responses/" + textFileName)).blob()).text();
    }

    listing.addEventListener("click", clickElement);

    return listing;
}


// create HTML listing
function createHTMLListing(name, textFileName) {
    let listing = createDropdownListing();
    let icon = document.createElement("img");
    icon.src = "/images/file-code.png"
    icon.style.height = getComputedStyle(document.documentElement).getPropertyValue("--dropDownMenuTextSize");

    listing.appendChild(icon);
    let textChild = document.createElement("div");
    textChild.textContent = name;
    listing.appendChild(textChild);

    async function clickElement() {
        resetMainView();
        textDisplay.style.removeProperty("display");
        fileType.textContent = "HTML";
        textDisplay.textContent = await (await (await fetch(textFileName)).blob()).text();
    }

    listing.addEventListener("click", clickElement);

    return listing;
}

// create CSS listing
function createCSSListing(name, textFileName) {
    let listing = createDropdownListing();
    let icon = document.createElement("img");
    icon.src = "/images/file-code.png"
    icon.style.height = getComputedStyle(document.documentElement).getPropertyValue("--dropDownMenuTextSize");

    listing.appendChild(icon);
    let textChild = document.createElement("div");
    textChild.textContent = name;
    listing.appendChild(textChild);

    async function clickElement() {
        resetMainView();
        textDisplay.style.removeProperty("display");
        fileType.textContent = "CSS";
        textDisplay.textContent = await (await (await fetch(textFileName)).blob()).text();
    }

    listing.addEventListener("click", clickElement);

    return listing;
}


// create CSS listing
function createJSListing(name, textFileName) {
    let listing = createDropdownListing();
    let icon = document.createElement("img");
    icon.src = "/images/file-code.png"
    icon.style.height = getComputedStyle(document.documentElement).getPropertyValue("--dropDownMenuTextSize");

    listing.appendChild(icon);
    let textChild = document.createElement("div");
    textChild.textContent = name;
    listing.appendChild(textChild);

    async function clickElement() {
        resetMainView();
        textDisplay.style.removeProperty("display");
        fileType.textContent = "JavaScript";
        textDisplay.textContent = await (await (await fetch(textFileName)).blob()).text();
    }

    listing.addEventListener("click", clickElement);

    return listing;
}

// change_to can be "section1", "section2", "section3", "reading-response"
function changeSidebar(change_to) {
    if (currentSectionButtonWrapper != null) {
        currentSectionButtonWrapper.classList.remove("sectionButtonWrapperChosen");
    }

    if (currentSidebar != null) {
        currentSidebar.style.display = "none";
    }

    currentSidebar = document.getElementById(change_to + "-sidebar");
    currentSidebar.style.removeProperty("display");

    currentSectionButtonWrapper = document.getElementById(change_to + "-files-wrapper");
    currentSectionButtonWrapper.classList.add("sectionButtonWrapperChosen");
}

function createDropdownListing() {
    let out = document.createElement("div");
    out.classList.add("dropdown_listing");

    function clickElement() {
        if (currentHighlightedElement != null) {
            currentHighlightedElement.style.removeProperty("background");
        }
        currentHighlightedElement = out;
        out.style.background = "var(--clickedBackgroundColorListing)";
    }

    out.addEventListener("click", clickElement);
    return out;
}

function resetMainView() {
    viewFrame.style.display = "none";
    textDisplay.style.display = "none";
    fileType.textContent = "";
    openButton.onclick = null;
}

function createIframeChanger(name, url) {
    let listing = createDropdownListing();
    let icon = document.createElement("img");
    icon.src = "/images/link.png"
    icon.style.height = getComputedStyle(document.documentElement).getPropertyValue("--dropDownMenuTextSize");

    listing.appendChild(icon);
    let textChild = document.createElement("div");
    textChild.textContent = name;
    listing.appendChild(textChild);

    function clickElement() {
        resetMainView();
        viewFrame.style.removeProperty("display");
        viewFrame.src = url;
        fileType.textContent = "Website";
        openButton.onclick = () => window.open(url);
    }

    listing.addEventListener("click", clickElement);

    return listing;
}


function createMainDropdownMenu() {
    let dropdown_menu = document.createElement("div");
    dropdown_menu.classList.add("main_dropdown_menu");
    dropdown_menu.classList.add("dropdown_menu");
    document.body.appendChild(dropdown_menu)
    dropdown_menu.style.display = "none";
    return dropdown_menu;
}

function createDropdownMenu() {
    let dropdown_menu = document.createElement("div");
    dropdown_menu.classList.add("dropdown_menu");
    return dropdown_menu;
}

// returns HTMLElement for folder in dropdown menu
function createFolder(elementArray, folderName) {
    let showContents = false;

    let dropdown_menu = createDropdownMenu();

    // create folder icon
    let folderElement = createDropdownListing();

    let arrow = document.createElement("img");
    arrow.src = "/images/closedFolder.png"
    arrow.style.height = getComputedStyle(document.documentElement).getPropertyValue("--dropDownMenuTextSize");
    folderElement.appendChild(arrow);
    let folderIcon = document.createElement("img");
    folderIcon.src = "/images/folder.png"
    folderIcon.style.height = getComputedStyle(document.documentElement).getPropertyValue("--dropDownMenuTextSize");
    folderElement.appendChild(folderIcon);
    let textChild = document.createElement("div");
    textChild.textContent = folderName;
    folderElement.appendChild(textChild);
    dropdown_menu.appendChild(folderElement);

    for (const element of elementArray) {
        dropdown_menu.appendChild(element);
        element.style.display = "none";
        element.style.paddingLeft = "15%";
    }

    // onclick function
    function onClick(event) {
        showContents = !showContents;
        if (showContents) {
            arrow.src = "/images/openedFolder.png"
            for (const element of elementArray) {
                element.style.display = "flex";
            }
        } else {
            arrow.src = "/images/closedFolder.png"
            for (const element of elementArray) {
                element.style.display = "none";
            }
        }
    }

    folderElement.addEventListener("click", onClick);

    return dropdown_menu;
}