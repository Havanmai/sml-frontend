import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptypageComponent } from './emptypage/emptypage.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { BaseService } from './base.service';
import { RouterGuard } from './router.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from './my.interceptor';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzSpaceModule } from 'ng-zorro-antd/space';



@NgModule({
  declarations: [
    EmptypageComponent
  ],
  imports: [
    CommonModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzTypographyModule,
    HttpClientModule,
    NzBackTopModule,
    NzAffixModule,
    NzSpaceModule
  ],
  exports: [
    EmptypageComponent
  ],
  /* providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true,
    },
  ], */
})

export class CoreModule {
  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [BaseService, RouterGuard],
    };
  }
}
