import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    @for (link of links; track $index) {
    <button mat-flat-button (click)="openLink(link.url)">
      {{ link.title }}
    </button>
    }
  `,
  styles: ``,
})
export class LinksComponent {
  links: { title: string; url: string }[] = [
    {
      title: 'Material',
      url: 'https://material.angular.io/components/categories',
    },
    { title: 'Angular Docs (new)', url: 'https://angular.dev/overview' },
    { title: 'ngxtension', url: 'https://ngxtension.netlify.app/getting-started/introduction/' },
    { title: 'Stackblitz', url: 'https://stackblitz.com/' },
  ];
  openLink(link: string) {
    window.open(link);
  }
}
