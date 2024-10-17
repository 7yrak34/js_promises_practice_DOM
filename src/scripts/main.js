'use strict';

const body = document.body;

async function handlePromise(promise) {
  try {
    const message = await promise;

    body.insertAdjacentHTML(
      'beforeend',
      `
      <div data-qa="notification" class="success">
        ${message}
      </div>
    `,
    );
  } catch (errorMessage) {
    body.insertAdjacentHTML(
      'beforeend',
      `
      <div data-qa="notification" class="error">
        ${errorMessage}
      </div>
    `,
    );
  }
}

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.documentElement.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

handlePromise(firstPromise);

const secondPromise = new Promise((resolve) => {
  document.documentElement.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.documentElement.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

handlePromise(secondPromise);

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.documentElement.addEventListener('click', () => {
    leftClicked = true;

    if (rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.documentElement.addEventListener('contextmenu', () => {
    rightClicked = true;

    if (leftClicked) {
      resolve('Third promise was resolved');
    }
  });
});

handlePromise(thirdPromise);
