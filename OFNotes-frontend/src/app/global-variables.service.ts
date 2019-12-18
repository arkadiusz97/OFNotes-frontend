import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  public searchString: string = "";
  public apiAddress: string = "http://localhost:8080";
  constructor() { }
}
