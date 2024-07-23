import {
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { db, storage } from "./Api";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { authRequired } from "./Auth";
import emailjs from "@emailjs/browser";

export async function randomApps(x) {
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomSize() {
    return (Math.random() * (100 - 1) + 1).toFixed(2) + "MB";
  }

  function getRandomDownloads() {
    return Math.floor(Math.random() * (1000000 - 1000) + 1000);
  }

  function getRandomId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function getRandomAbout() {
    const abouts = [
      "A great app for productivity. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt molestias vitae cupiditate nostrum, odio libero, minus et eum alias sit, temporibus velit. Maxime quod ipsum, obcaecati est recusandae provident",
      "Stay connected with your friends and family. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt molestias vitae cupiditate nostrum, odio libero, minus et eum alias sit, temporibus velit. Maxime quod ipsum, obcaecati est recusandae provident",
      "Learn new skills and improve yourself. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt molestias vitae cupiditate nostrum, odio libero, minus et eum alias sit, temporibus velit. Maxime quod ipsum, obcaecati est recusandae provident",
      "Shop the latest trends and deals. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt molestias vitae cupiditate nostrum, odio libero, minus et eum alias sit, temporibus velit. Maxime quod ipsum, obcaecati est recusandae provident",
      "Listen to your favorite music on the go. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt molestias vitae cupiditate nostrum, odio libero, minus et eum alias sit, temporibus velit. Maxime quod ipsum, obcaecati est recusandae provident",
    ];
    return getRandomElement(abouts);
  }

  const authors = [
    "TechCorp",
    "Innovative Solutions",
    "NextGen Developers",
    "Alpha Studios",
    "Creative Minds",
    "Taiwo Joshua",
  ];

  function getRandomCategories(categories) {
    const numberOfCategories = Math.floor(Math.random() * 3) + 1; // Randomly assign 1 to 3 categories
    const selectedCategories = new Set();
    while (selectedCategories.size < numberOfCategories) {
      selectedCategories.add(getRandomElement(categories));
    }
    return Array.from(selectedCategories);
  }

  function getRandomIcon() {
    const icons = [
      "/images/apps/app1.png",
      "/images/apps/app2.png",
      "/images/apps/app3.png",
      "/images/apps/app4.png",
      "/images/apps/app5.png",
    ];
    return getRandomElement(icons);
  }

  function getRandomLink() {
    const links = [
      "/images/apps/app1.png",
      "/images/apps/app2.png",
      "/images/apps/app3.png",
      "/images/apps/app4.png",
      "/images/apps/app5.png",
    ];
    return getRandomElement(links);
  }

  function getRandomPreviews() {
    const previews = [
      "/images/apps/app1.png",
      "/images/apps/app2.png",
      "/images/apps/app3.png",
      "/images/apps/app4.png",
      "/images/apps/app5.png",
    ];
    const rands = [];
    const npreview = Math.floor(Math.random() * 5 + 3);
    for (let p = 0; p < npreview; p++) {
      rands.push(previews[Math.floor(Math.random() * previews.length)]);
    }
    return rands;
  }

  function getRandomTime() {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    const randomTime = new Date(
      startOfDay.getTime() +
        Math.random() * (endOfDay.getTime() - startOfDay.getTime())
    );

    return randomTime.getTime();
    // return randomTime.toLocaleTimeString(); // Returns time in a human-readable format
  }

  async function getRandomApps(numberOfApps) {
    const appNames = [
      "App One",
      "App Two",
      "App Three",
      "App Four",
      "App Five",
      "App Six",
      "App Seven",
      "App Eight",
      "App Nine",
      "App Ten",
    ];

    let fet = await fetch("/data/categories.json");
    let cats = await fet.json();

    let categories = [];
    cats.map((cat) => {
      categories = [...categories, ...cat.subcategories];
      return cat;
    });

    const apps = [];

    for (let i = 0; i < numberOfApps; i++) {
      const app = {
        id: getRandomId(),
        icon: getRandomIcon(),
        name: getRandomElement(appNames),
        link: getRandomLink(),
        size: getRandomSize(),
        downloads: getRandomDownloads(),
        about: getRandomAbout(),
        author: getRandomCategories(authors).join(" | "),
        categories: getRandomCategories(categories),
        preview: getRandomPreviews(),
        timestamp: getRandomTime(),
      };
      apps.push(app);
    }

    return apps;
  }

  const randomApps = await getRandomApps(x);
  console.log(randomApps);
}

export async function randomDonations(x) {
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomSize() {
    return (Math.random() * (100 - 1) + 1).toFixed(2) + "MB";
  }

  function getRandomId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function getRandomAbout() {
    const abouts = [
      "A great app for productivity. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt molestias vitae cupiditate nostrum, odio libero, minus et eum alias sit, temporibus velit. Maxime quod ipsum, obcaecati est recusandae provident",
      "Stay connected with your friends and family. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt molestias vitae cupiditate nostrum, odio libero, minus et eum alias sit, temporibus velit. Maxime quod ipsum, obcaecati est recusandae provident",
      "Learn new skills and improve yourself. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt molestias vitae cupiditate nostrum, odio libero, minus et eum alias sit, temporibus velit. Maxime quod ipsum, obcaecati est recusandae provident",
      "Shop the latest trends and deals. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt molestias vitae cupiditate nostrum, odio libero, minus et eum alias sit, temporibus velit. Maxime quod ipsum, obcaecati est recusandae provident",
      "Listen to your favorite music on the go. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt molestias vitae cupiditate nostrum, odio libero, minus et eum alias sit, temporibus velit. Maxime quod ipsum, obcaecati est recusandae provident",
    ];
    return getRandomElement(abouts);
  }

  const authors = [
    "TechCorp",
    "Innovative Solutions",
    "NextGen Developers",
    "Alpha Studios",
    "Creative Minds",
    "Taiwo Joshua",
  ];

  function getRandomCategories(categories) {
    const numberOfCategories = Math.floor(Math.random() * 3) + 1; // Randomly assign 1 to 3 categories
    const selectedCategories = new Set();
    while (selectedCategories.size < numberOfCategories) {
      selectedCategories.add(getRandomElement(categories));
    }
    return Array.from(selectedCategories);
  }

  function getRandomIcon() {
    const icons = [
      "/images/apps/app1.png",
      "/images/apps/app2.png",
      "/images/apps/app3.png",
      "/images/apps/app4.png",
      "/images/apps/app5.png",
    ];
    return getRandomElement(icons);
  }

  function getRandomLink() {
    const links = [
      "/images/apps/app1.png",
      "/images/apps/app2.png",
      "/images/apps/app3.png",
      "/images/apps/app4.png",
      "/images/apps/app5.png",
    ];
    return getRandomElement(links);
  }

  function getRandomPreviews() {
    const previews = [
      "/images/apps/app1.png",
      "/images/apps/app2.png",
      "/images/apps/app3.png",
      "/images/apps/app4.png",
      "/images/apps/app5.png",
    ];
    const rands = [];
    const npreview = Math.floor(Math.random() * 5 + 3);
    for (let p = 0; p < npreview; p++) {
      rands.push(previews[Math.floor(Math.random() * previews.length)]);
    }
    return rands;
  }

  function getRandomTime() {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    const randomTime = new Date(
      startOfDay.getTime() +
        Math.random() * (endOfDay.getTime() - startOfDay.getTime())
    );

    return randomTime.getTime();
    // return randomTime.toLocaleTimeString(); // Returns time in a human-readable format
  }

  function getRandomName() {
    const firstName = ["John", "Mary", "Michael", "Emma", "James", "Sophia"];
    const lastName = [
      "Smith",
      "Johnson",
      "Williams",
      "Jones",
      "Brown",
      "Davis",
    ];
    return `${firstName[Math.floor(Math.random() * firstName.length)]} ${
      lastName[Math.floor(Math.random() * lastName.length)]
    }`;
  }

  function getRandomEmail() {
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${getRandomName()
      .toLowerCase()
      .replace(/\s+/g, "")}@${randomDomain}`;
  }

  function getRandomMessage() {
    const messages = [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  async function getRandomDonations(numberOfApps) {
    const appNames = [
      "App One",
      "App Two",
      "App Three",
      "App Four",
      "App Five",
      "App Six",
      "App Seven",
      "App Eight",
      "App Nine",
      "App Ten",
    ];

    let fet = await fetch("/data/categories.json");
    let cats = await fet.json();

    let categories = [];
    cats.map((cat) => {
      categories = [...categories, ...cat.subcategories];
      return cat;
    });

    const apps = [];

    for (let i = 0; i < numberOfApps; i++) {
      const app = {
        id: getRandomId(),
        icon: getRandomIcon(),
        name: getRandomElement(appNames),
        link: getRandomLink(),
        size: getRandomSize(),
        about: getRandomAbout(),
        author: getRandomCategories(authors).join(" | "),
        categories: getRandomCategories(categories),
        preview: getRandomPreviews(),
        donor: getRandomName(),
        email: getRandomEmail(),
        message: getRandomMessage(),
        timestamp: getRandomTime(),
      };
      apps.push(app);
    }

    return apps;
  }

  const randomApps = await getRandomDonations(x);
  console.log(randomApps);
}

export async function randomRequests(x) {
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomId() {
    return Math.random().toString(36).substr(2, 9);
  }

  const authors = [
    "TechCorp",
    "Innovative Solutions",
    "NextGen Developers",
    "Alpha Studios",
    "Creative Minds",
    "Taiwo Joshua",
  ];

  function getRandomCategories(categories) {
    const numberOfCategories = Math.floor(Math.random() * 3) + 1; // Randomly assign 1 to 3 categories
    const selectedCategories = new Set();
    while (selectedCategories.size < numberOfCategories) {
      selectedCategories.add(getRandomElement(categories));
    }
    return Array.from(selectedCategories);
  }

  function getRandomTime() {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    const randomTime = new Date(
      startOfDay.getTime() +
        Math.random() * (endOfDay.getTime() - startOfDay.getTime())
    );

    return randomTime.getTime();
    // return randomTime.toLocaleTimeString(); // Returns time in a human-readable format
  }

  function getRandomName() {
    const firstName = ["John", "Mary", "Michael", "Emma", "James", "Sophia"];
    const lastName = [
      "Smith",
      "Johnson",
      "Williams",
      "Jones",
      "Brown",
      "Davis",
    ];
    return `${firstName[Math.floor(Math.random() * firstName.length)]} ${
      lastName[Math.floor(Math.random() * lastName.length)]
    }`;
  }

  function getRandomEmail() {
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${getRandomName()
      .toLowerCase()
      .replace(/\s+/g, "")}@${randomDomain}`;
  }

  function getRandomMessage() {
    const messages = [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  async function getRandomRequests(numberOfApps) {
    const appNames = [
      "App One",
      "App Two",
      "App Three",
      "App Four",
      "App Five",
      "App Six",
      "App Seven",
      "App Eight",
      "App Nine",
      "App Ten",
    ];

    const statusOptions = ["Processing", "Completed", "Not Found"];

    let fet = await fetch("/data/categories.json");
    let cats = await fet.json();

    let categories = [];
    cats.map((cat) => {
      categories = [...categories, ...cat.subcategories];
      return cat;
    });

    const apps = [];

    for (let i = 0; i < numberOfApps; i++) {
      const app = {
        id: getRandomId(),
        ticket: Math.floor(Math.random() * 9000000000) + 1000000000,
        donor: getRandomName(),
        email: getRandomEmail(),
        message: getRandomMessage(),
        name: getRandomElement(appNames),
        status: getRandomElement(statusOptions),
        author: getRandomCategories(authors).join(" | "),
        categories: getRandomCategories(categories),
        timestamp: getRandomTime(),
      };
      apps.push(app);
    }

    return apps;
  }

  const randomRequests = await getRandomRequests(x);
  console.log(randomRequests);
}

export function countElementsInRow(selector) {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return 0;

  const firstElementTop = elements[0].getBoundingClientRect().top;
  let count = 0;

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop === firstElementTop) {
      count++;
    }
  });

  return count;
}

export function stripSpecialChar(string) {
  const specialChars = ["\\", "/", "*", ":", "?", '"', "<", ">", "|", "&"];
  let newString = "";
  for (let k = 0; k < string.length; k++) {
    if (!specialChars.includes(string[k])) {
      newString += string[k];
    }
  }
  return newString;
}

function compareByProperty(a, b, property) {
  let ap = a[property];
  let bp = b[property];
  return typeof ap === "number" && typeof bp === "number"
    ? ap - bp
    : ap.localeCompare(bp);
}

export function sortByProperty(arr, property) {
  try {
    let array = arr.slice();
    return array.sort((a, b) => compareByProperty(a, b, property));
  } catch (error) {
    // console.log(error);
    return arr;
  }
}

export function filterObject(obj, predicate) {
  return Object.keys(obj).reduce((result, key) => {
    if (predicate(obj[key])) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

export function showSwal(icon, title, text, time) {
  Swal.fire({
    icon: icon,
    name: title,
    text: text,
    confirmButtonText: "OK",
    timer: time,
  });
}

export function formatDownloads(x) {
  const num = parseInt(x);
  if (!num) {
    return num;
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + "M+";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K+";
  } else {
    return num.toString();
  }
}

export function expandKeywords(inputString, keywords) {
  const words = inputString.split(/\s+/);
  for (let i = 0; i < words.length; i++) {
    const word = words[i].toUpperCase();
    if (keywords.hasOwnProperty(word)) {
      inputString += " " + keywords[word];
    } else {
      const values = Object.values(keywords);
      const index = values.indexOf(word);
      if (index !== -1) {
        const keys = Object.keys(keywords);
        inputString += " " + keys[index];
      }
    }
  }
  return inputString;
}

function sortArrayByWordsInCommon(
  arr,
  searchedName,
  prioritizeAuthor = true,
  prioritizeName = false,
  prioritizeCategory = false
) {
  let array = arr.slice();

  // Function to calculate number of words in common between two strings
  function wordsInCommon(input1, input2) {
    const str1 = typeof input1 === "object" ? input1.join(" | ") : input1;
    const str2 = typeof input2 === "object" ? input2.join(" | ") : input2;
    const words1 = str1?.toLowerCase().split(/\s+/);
    const words2 = str2?.toLowerCase().split(/\s+/);

    let commonWords = 0;
    words1?.forEach((word1) => {
      if (words2.includes(word1)) {
        commonWords++;
      }
    });
    return commonWords;
  }

  // Sorting the array based on the number of words in common
  array.sort(function (a, b) {
    let commonWordsA, commonWordsB;

    if (prioritizeAuthor) {
      commonWordsA = wordsInCommon(a.author, searchedName);
      commonWordsB = wordsInCommon(b.author, searchedName);
    } else if (prioritizeName) {
      commonWordsA = wordsInCommon(a.name, searchedName);
      commonWordsB = wordsInCommon(b.name, searchedName);
    } else if (prioritizeCategory) {
      commonWordsA = wordsInCommon(a.categories, searchedName);
      commonWordsB = wordsInCommon(b.categories, searchedName);
    } else {
    }

    // Sort in descending order of common words
    return commonWordsB - commonWordsA;
  });

  // Filter out items with 0 words in common
  const filteredArray = array.filter((item) => {
    if (prioritizeAuthor) {
      return wordsInCommon(item.author, searchedName) !== 0;
    } else if (prioritizeName) {
      return wordsInCommon(item.name, searchedName) !== 0;
    } else if (prioritizeCategory) {
      return wordsInCommon(item.categories, searchedName) !== 0;
    } else {
      return false;
    }
  });

  return filteredArray;
}

export async function sortBooks(
  data,
  sear,
  priority = ["name", "author", "categories"]
) {
  let searc = sear;
  if (typeof sear === "object") searc = sear.join(" | ");

  const synonyms = (await wordSearcher(searc)).join(" ");
  const search = searc + " " + synonyms;

  const sortedArrayByAuthor = sortArrayByWordsInCommon(data, search, true);
  const sortedArrayByName = sortArrayByWordsInCommon(data, search, false, true);
  const sortedArrayByCategories = sortArrayByWordsInCommon(
    data,
    search,
    false,
    false,
    true
  );

  const order = {
    name: sortedArrayByName,
    author: sortedArrayByAuthor,
    categories: sortedArrayByCategories,
  };

  let combined = [];
  combined = combined.concat(
    order[priority[0]],
    order[priority[1]],
    order[priority[2]],
    data
  );
  combined = combined.map((dat) => JSON.stringify(dat));
  combined = new Set(combined);
  combined = Array.from(combined);
  combined = combined.map((dat) => JSON.parse(dat));
  const length =
    sortedArrayByAuthor.length +
    sortedArrayByCategories.length +
    sortedArrayByName.length;
  return { output: combined, length };
}

export function getPriority(priority) {
  if (priority === "author") {
    return ["author", "categories", "name"];
  } else if (priority === "categories") {
    return ["categories", "author", "name"];
  } else {
    return ["name", "author", "categories"];
  }
}

export function stripSpace(string) {
  let newString = "";
  for (let k = 0; k < string.length; k++) {
    if (string[k] !== " ") {
      newString += string[k];
    }
  }
  return newString;
}

export function checkExtension(string) {
  const extensions = ["jpeg", "jpg", "png", "heic"];
  const ext = string.slice(string.lastIndexOf(".") + 1).toLowerCase();
  if (extensions.includes(ext)) {
    return true;
  }
  return false;
}

export function checkImage(files, maxSize, setError, setStatus) {
  setError(true);
  if (files.length > 5) {
    setStatus({
      status: "failed",
      type: "failed",
      message: "Maximum of 5 Images",
    });
    return "length";
  }
  const maximum = 1024 * maxSize;
  for (let e = 0; e < files.length; e++) {
    const file = files[e];
    if (file.size <= maximum && checkExtension(file.name)) {
      setError(false);
      setStatus({ status: "", type: "", message: "" });
      return true;
    } else {
      if (file.size > maximum) {
        setStatus({
          status: "failed",
          type: "failed",
          message: "Maximum File Size Exceeded",
        });
        return "size";
      } else if (!checkExtension(file.name)) {
        setStatus({
          status: "failed",
          type: "failed",
          message: "Invalid File Format",
        });
        return "format";
      }
    }
  }
}

export function getTimeDifferenceInDays(
  timestamp1,
  timestamp2 = new Date().getTime()
) {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);
  const differenceInMs = date2 - date1;
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  return differenceInDays;
}

export async function wordSearcher(word = "") {
  try {
    let synonyms = [];
    if (!word) return synonyms;

    let inputs = word.split(" ").join("-").split("-");

    for (let p = 0; p < inputs.length; p++) {
      const input = inputs[p];
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const dat = data[0];
        let syns = dat.meanings;
        let syn = [];
        syns.map((syne) => {
          syn = [...syn, ...syne.synonyms];
          return syne;
        });
        synonyms = [...synonyms, ...syn];

        syn = syns.map((syn) => syn.definitions.synonyms);
        synonyms = [...synonyms, ...syn];
      }
    }
    synonyms = synonyms.filter((syn) => syn);
    synonyms = Array.from(new Set(synonyms));
    return synonyms;
  } catch (error) {
    return [];
  }
}

export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// ==========================================================================================

// Firebase

// ==========================================================================================
export const updateRecord = async (type, data) => {
  const { email, emailVerified } = await authRequired();
  if (!email || !emailVerified) {
    const error = {
      code: 401,
      message: "Access not Granted",
    };
    throw error;
  }
  try {
    const record = {};
    for (let p = 0; p < data.length; p++) {
      const book = data[p];
      record[book.id] = book;
    }
    const dataRef = doc(db, "apps", type);
    await setDoc(dataRef, record, { merge: true });
    return true;
  } catch (error) {
    return error;
  }
};

export const newRecordField = async (type, data) => {
  try {
    const dataRef = doc(db, "apps", type);
    await setDoc(dataRef, { [data.id]: data }, { merge: true });
    return true;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const updateRecordField = async (type, data) => {
  const { email, emailVerified } = await authRequired();
  if (!email || !emailVerified) {
    const error = {
      code: 401,
      message: "Access not Granted",
    };
    throw error;
  }
  try {
    const dataRef = doc(db, "apps", type);
    await setDoc(dataRef, { [data.id]: data }, { merge: true });
    return true;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const deleteRecordField = async (type, id) => {
  const { email, emailVerified } = await authRequired();
  if (!email || !emailVerified) {
    const error = {
      code: 401,
      message: "Access not Granted",
    };
    throw error;
  }
  try {
    const dataRef = doc(db, "apps", type);
    await updateDoc(dataRef, { [id]: deleteField() });
    return true;
  } catch (error) {
    return error;
  }
};

export const getRecord = async (type) => {
  const data = [];
  const docRef = doc(db, "apps", type);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const record = docSnap.data();
    for (const key in record) {
      if (Object.hasOwnProperty.call(record, key)) {
        const book = record[key];
        data.push(book);
      }
    }
  }
  return data;
};

export const uploadFiles = (
  location,
  files,
  ids,
  setFormData = false,
  resetFormData = false
) => {
  return new Promise(async (resolve, reject) => {
    const metadata = {
      contentType: "image/*",
    };

    const promises = [];

    for (let k = 0; k < files.length; k++) {
      // setUprogess(0);
      promises.push(
        new Promise((innerResolve, innerReject) => {
          const file = files[k];
          const id = ids[k];

          const imgname =
            stripSpecialChar(id) + file.name.slice(file.name.lastIndexOf("."));
          const storageRef = ref(storage, `${location}/${imgname}`);
          const uploadTask = uploadBytesResumable(storageRef, file, metadata);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // setUprogess(progress);
              // switch (snapshot.state) {
              //     case 'paused':
              //         setUstate('Upload Paused');
              //         break;
              //     case 'running':
              //         setUstate('Uploading...');
              //         break;
              //     default:
              //         setUstate('Upload Stopped');
              // }
            },
            (error) => {
              // Handle specific upload error
              innerReject(error);
            },
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  innerResolve({ downloadURL, imgname }); // Resolve the inner promise when done
                })
                .catch((error) => {
                  // Handle error when getting the download URL
                  innerReject(error);
                });
            }
          );
        })
      );
    }

    // Wait for all promises to resolve
    Promise.all(promises)
      .then(() => {
        // All uploads completed successfully
        setFormData && setFormData(resetFormData);
        resolve(promises);
      })
      .catch((error) => {
        // Handle any errors during the upload process
        reject(error);
      });
  });
};

export function extractFileName(url) {
  const parts = url.split("/");
  const filenameWithExtension = parts[parts.length - 1];
  const decodedFilename = decodeURIComponent(filenameWithExtension);
  const filenameParts = decodedFilename.split("?");
  const filenamePath = filenameParts[0];
  const filename = filenamePath.slice(filenamePath.lastIndexOf("/") + 1);
  return filename;
}

export const deleteFiles = async (urls, folder = "") => {
  try {
    if (!(await authRequired())) {
      const error = {
        code: 401,
        message: "Access not Granted",
      };
      throw error;
    }
    if (typeof urls === "object") {
      for (let k = 0; k < urls.length; k++) {
        const url = urls[k];
        const name = extractFileName(url);
        const desertRef = ref(
          storage,
          folder === "" ? name : `${folder}/${name}`
        );
        await deleteObject(desertRef);
      }
    } else {
      const name = extractFileName(urls);
      const desertRef = ref(
        storage,
        folder === "" ? name : `${folder}/${name}`
      );
      await deleteObject(desertRef);
    }
    return true;
  } catch (error) {
    return error;
  }
};

// ==========================================================================================

// E-Mails

// ==========================================================================================
export async function donationMail(name, booktitle, email) {
  try {
    const send = await emailjs.send(
      process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
      process.env.REACT_APP_EMAIL_JS_DONATION_TEMPLATE_ID,
      { name, booktitle, email },
      process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY
    );
    if (send.status === 200) {
      return "sent";
    }
  } catch (error) {
    return "failed";
  }
}

export async function requestMail(name, booktitle, email) {
  try {
    const send = await emailjs.send(
      process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
      process.env.REACT_APP_EMAIL_JS_REQUEST_TEMPLATE_ID,
      { name, booktitle, email },
      process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY
    );
    if (send.status === 200) {
      return "sent";
    }
  } catch (error) {
    return "failed";
  }
}

export async function contactMail(name, message, email, subject, feedback) {
  try {
    const send = await emailjs.send(
      process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
      process.env.REACT_APP_EMAIL_JS_DONATION_TEMPLATE_ID,
      {
        s: subject,
        name,
        message,
        contactmail: email,
        email: "joshuataiwo07@gmail.com",
        contact: true,
        feedback,
      },
      process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY
    );
    if (send.status === 200) {
      return "sent";
    }
  } catch (error) {
    return "failed";
  }
}
