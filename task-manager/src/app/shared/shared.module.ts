import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../utilities/header/header.component';
import { FooterComponent } from '../utilities/footer/footer.component';
import { SidebarComponent } from '../utilities/sidebar/sidebar.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent
    ]
})
export class SharedModule { }
