let jsonData;
let nameFromJson;

fetch('./data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    jsonData = data.items; 
    nameFromJson = data.name; 

    function getSelectedOption() {
      const radios = document.getElementsByName('option');
      for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          return radios[i].id;
        }
      }
    }

    document.getElementById('replace-button').addEventListener('click', () => {
      const selectedOption = getSelectedOption();
      let textToInsert = '';

      switch (selectedOption) {
        case 'option-1':
          textToInsert = jsonData.find(item => item.id === 1)?.text || '';
          break;
        case 'option-2':
          textToInsert = jsonData.find(item => item.id === 2)?.text || '';
          break;
        case 'option-random':
          const randomIndex = Math.floor(Math.random() * jsonData.length);
          textToInsert = jsonData[randomIndex].text;
          break;
      }

      document.getElementById('content-area').innerHTML = `<p>${textToInsert}</p>`;
    });

    document.getElementById('append-button').addEventListener('click', () => {
      const selectedOption = getSelectedOption();
      let textToInsert = '';

      switch (selectedOption) {
        case 'option-1':
          textToInsert = jsonData.find(item => item.id === 1)?.text || '';
          break;
        case 'option-2':
          textToInsert = jsonData.find(item => item.id === 2)?.text || '';
          break;
        case 'option-random':
          const randomIndex = Math.floor(Math.random() * jsonData.length);
          textToInsert = jsonData[randomIndex].text;
          break;
      }

      const existingText = document.getElementById('content-area').innerHTML;
      if (!existingText.includes(textToInsert)) {
        document.getElementById('content-area').innerHTML += `<p>${textToInsert}</p>`;
      }
    });

  })
  .catch(error => {
    console.error('Wystąpił problem podczas pobierania danych JSON:', error);
  });

const showButton = document.getElementById('show-button');
const popupContainer = document.getElementById('popup-container');

showButton.addEventListener('click', () => {
  popupContainer.classList.toggle('visible');
});

document.addEventListener('click', (event) => {
  if (!popupContainer.contains(event.target) && !showButton.contains(event.target)) {
    popupContainer.classList.remove('visible');
  }
});

const resetButton = document.getElementById('reset-button');
const headerText = document.querySelector('.header-text');

resetButton.addEventListener('click', () => {
  document.getElementById('content-area').innerHTML = '';
  const nameElement = headerText.querySelector('span.name');
  if (nameElement) {
    nameElement.remove();
  }
  popupContainer.classList.remove('visible');
});

const addNameButton = document.getElementById('add-name-button');

addNameButton.addEventListener('click', () => {
  if (!headerText.querySelector('span.name')) {
    const nameElement = document.createElement('span');
    nameElement.classList.add('name');
    nameElement.textContent = ` - ${nameFromJson}`;
    headerText.appendChild(nameElement);
  }
  popupContainer.classList.remove('visible');
});
