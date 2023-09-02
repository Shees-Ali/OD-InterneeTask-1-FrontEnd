import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  },
  {
    path: "authentication",
    loadChildren: () => import("./authentication/authentication.module").then((m) => m.AuthenticationModule)
  },
  {
    path: 'main',
    loadChildren: () => import("./main/main.module").then((m) => m.MainModule)
  },
  {
    path: 'chatbot',
    loadChildren: () => import("./chatbot/chatbot.module").then((m) => m.ChatbotModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
