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

      const paragraph = document.createElement('p');
      paragraph.textContent = textToInsert;

      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = ''; 
      contentArea.appendChild(paragraph);

      sortParagraphsAlphabetically();
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
        const paragraph = document.createElement('p');
        paragraph.textContent = textToInsert;
        document.getElementById('content-area').appendChild(paragraph);

        sortParagraphsAlphabetically();
      }
      else {
        alert('Ten tekst juz istnieje w sekcji.');
      }
    });
    
    function sortParagraphsAlphabetically() {
      const contentArea = document.getElementById('content-area');
      const paragraphs = Array.from(contentArea.getElementsByTagName('p'));

      paragraphs.sort((a, b) => {
        return a.textContent.localeCompare(b.textContent);
      });

      contentArea.innerHTML = '';

      paragraphs.forEach(paragraph => {
        contentArea.appendChild(paragraph);
      });
    }
  })
  .catch(error => {
    console.error('Wystąpił problem podczas pobierania danych JSON:', error);
  });

const showButton = document.getElementById('show-button');
const popupContainer = document.getElementById('popup-container');
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
