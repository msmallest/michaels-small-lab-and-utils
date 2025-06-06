import { Component } from '@angular/core'
import { RouterModule, RouterOutlet } from '@angular/router'
import { HeaderComponent } from "./core/layout/header/header.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterModule, HeaderComponent],
    template: `
        <app-header />
        <section>
            <h1>Michael's Lab/Devtools</h1>
            <a
                href="https://github.com/msmallest/michaels-small-lab-and-utils"
                target="_blank"
                >Repo</a
            >
        </section>

        <router-outlet />
    `,
    styles: ``,
})
export class AppComponent {
    lett = '@let'

    constructor() {
        console.log('hey')
    }
}
