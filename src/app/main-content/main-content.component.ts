import { Component, OnInit, OnDestroy } from '@angular/core';
import { JsonDataService } from '../json-data.service'; // ścieżka do serwisu

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, OnDestroy {

  jsonData: any;
  nameFromJson: string;

  constructor(private jsonDataService: JsonDataService) { }

  ngOnInit(): void {
    this.loadJsonData();
    this.loadExternalScript('./assets/scripts/main-content-script.js');
  }

  ngOnDestroy(): void {
    this.removeExternalScript('./assets/scripts/main-content-script.js');
  }

  private loadJsonData(): void {
    this.jsonDataService.getJsonData().subscribe(
      (data: any) => {
        this.jsonData = data.items;
        this.nameFromJson = data.name;
      },
      error => {
        console.error('Wystąpił błąd podczas pobierania danych JSON:', error);
      }
    );
  }

  private loadExternalScript(scriptUrl: string): void {
    const body = document.body;
    if (!body) {
      console.error('Nie można uzyskać dostępu do elementu body.');
      return;
    }
  
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
  
  private removeExternalScript(scriptUrl: string): void {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src === scriptUrl) {
        const parentNode = scripts[i].parentNode;
        if (parentNode) {
          parentNode.removeChild(scripts[i]);
        } else {
          console.error('Nie można uzyskać dostępu do rodzica skryptu.');
        }
        break;
      }
    }
  }

  replaceContent(): void {
    const selectedOption = this.getSelectedOption();
    let textToInsert = '';

    switch (selectedOption) {
      case 'option-1':
        textToInsert = this.jsonData?.find(item => item.id === 1)?.text || '';
        break;
      case 'option-2':
        textToInsert = this.jsonData?.find(item => item.id === 2)?.text || '';
        break;
      case 'option-random':
        const randomIndex = Math.floor(Math.random() * (this.jsonData?.length || 0));
        textToInsert = this.jsonData?.[randomIndex]?.text || '';
        break;
    }

    const contentArea = document.getElementById('content-area');
    if (contentArea) {
      contentArea.innerHTML = `<p>${textToInsert}</p>`;
    }
  }

  appendContent(): void {
    const selectedOption = this.getSelectedOption();
    let textToInsert = '';

    switch (selectedOption) {
      case 'option-1':
        textToInsert = this.jsonData?.find(item => item.id === 1)?.text || '';
        break;
      case 'option-2':
        textToInsert = this.jsonData?.find(item => item.id === 2)?.text || '';
        break;
      case 'option-random':
        const randomIndex = Math.floor(Math.random() * (this.jsonData?.length || 0));
        textToInsert = this.jsonData?.[randomIndex]?.text || '';
        break;
    }

    const contentArea = document.getElementById('content-area');
    if (contentArea && !contentArea.innerHTML.includes(textToInsert)) {
      contentArea.innerHTML += `<p>${textToInsert}</p>`;
    }
  }

  private getSelectedOption(): string {
    const radios = document.getElementsByName('option');
    for (let i = 0; i < radios.length; i++) {
      if ((radios[i] as HTMLInputElement).checked) {
        return radios[i].id;
      }
    }
    return '';
  }
}
